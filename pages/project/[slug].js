import BasicPage from "../../components/BasicPage";
import Grid from "../../components/Grid";
import { getAllPosts, getPostBySlug, Markdown } from "@urbit/foundation-design-system";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { getArcByTitle } from "../../lib/util";
import ob from 'urbit-ob';
import ArcLink from "../../components/ArcLink";

export default function ProjectPage({ search, post, arcs, markdown }) {
    let title, href, cols = [];

    if (post.status === "Next Up") {
        title = "Next Up"
        href = "next"
        cols = ["Duration", "Manpower", "Owner"]
    } else if (post.status === "Current") {
        title = `${post.status} Projects`
        href = `${post.status.toLowerCase()}`
        cols = ["end_date", "Owner"]
    } else if (post.status === "Completed") {
        title = `${post.status} Projects`
        href = `${post.status.toLowerCase()}`
        cols = ["Date", "Contributors"]
    }
    else if (post.status === "Future") {
        title = `${post.status} Projects`
        href = `${post.status.toLowerCase()}`
        cols = ["Duration", "Manpower", "Owner"]
    }

    return <BasicPage
        search={search}
        sectionTitle={title}
        post={{
            title: post.title
        }}
    >
        <Grid className="col-span-full md:mt-40 mb-40">
            <div className="col-start-2 col-end-4">
                <Sidebar search={search}>
                    <li><Link href={`/${href}`}><a className="text-lg text-green-400 back">{"<-"} Back</a></Link></li>
                </Sidebar>
            </div>

            <div className="flex flex-col space-y-4 col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0">
                <h2 className="!my-0">{post.title}</h2>
                <div className="flex space-x-12 py-4">
                    {/* Map all patps into ID links -- first one-offs, then maps -- then the other columns */}
                    {cols.map((col) => {
                        return <div key={col} className="flex flex-col space-y-2 ">
                            <p className="!mb-1 font-semibold text-wall-400 uppercase !text-sm">{col.replace("_", " ")}</p>
                            {col === "Owner" && ob.isValidPatp(post[col.toLowerCase()])
                                ? <a className="!my-0 !text-base font-semibold text-green-400"
                                    href={`https://urbit.org/ids/${post[col.toLowerCase()]}`}
                                    target="_blank" rel="noreferrer">
                                    {post[col.toLowerCase()]}
                                </a>
                                : col === "Contributors"
                                    ? post[col.toLowerCase()].map((ea) =>
                                        <a key={ea}
                                            className="!my-0 !text-base font-semibold text-green-400"
                                            href={`https://urbit.org/ids/${ea}`}
                                            target="_blank"
                                            rel="noreferrer">
                                            {ea}
                                        </a>)
                                    : <p className="!my-0 !text-base">{post?.[col.toLowerCase()] || "TBD"}</p>
                            }
                        </div>
                    })}
                </div>
                <div className="flex space-x-2 flex-wrap items-center pb-2">
                    {arcs && arcs.map((arc) => {
                        return <ArcLink key={arc.title} arc={arc} />
                    })}
                </div>
                <div className="markdown">
                    <Markdown.render content={JSON.parse(markdown)} />
                </div>
            </div>
        </Grid>
    </BasicPage>
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(
        params.slug,
        ["title", "slug", "date", "description", "content", "status", "contributors", "duration", "manpower", "owner", "end_date", "arcs"],
        "projects"
    );

    const arcs = post?.arcs ? post.arcs.map((e) => getArcByTitle(e)) : null;

    const markdown = JSON.stringify(Markdown.parse({ post }));

    return {
        props: { post, arcs, markdown },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug", "date"], "projects", "date")

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
}
