import BasicPage from "../../components/BasicPage";
import Grid from "../../components/Grid";
import { getAllPosts, getPostBySlug, Markdown } from "@urbit/foundation-design-system";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { getArcByTitle } from "../../lib/util";
import ob from 'urbit-ob';
import ArcLink from "../../components/ArcLink";
import cn from 'classnames';
import External from "../../components/icons/External"

export default function ProjectPage({ search, post, arcs, markdown }) {
    let href, cols = [];

    if (post.status === "Next Up") {
        href = "next"
        cols = ["Duration", "Manpower", "Owner"]
    } else if (post.status === "Current") {
        href = `${post.status.toLowerCase()}`
        cols = ["end_date", "Owner"]
    } else if (post.status === "Completed") {
        href = `${post.status.toLowerCase()}`
        cols = ["Date", "Contributors"]
    }
    else if (post.status === "Future") {
        href = `${post.status.toLowerCase()}`
        cols = ["Duration", "Manpower", "Owner"]
    }
    const accent = cn({
        "text-wall-400": post.status === "Completed",
        "text-green-400": post.status === "Current",
        "text-yellow-400 dark:text-yellow-200": post.status === "Next Up",
        "text-purple-500 dark:text-purple-100": post.status === "Future"
    })

    return <BasicPage
        search={search}
        sectionTitle="Project"
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
                <p className={"uppercase font-semibold text-sm mb-4 " + accent}>{post.status}</p>
                <h2 className="!my-0">{post.title}</h2>
                <div className="flex space-x-12 py-2">
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
                                : col === "Contributors" && post[col.toLowerCase()]
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
                    {post?.spec && <div className="grow ml-4">
                        <Link href={post.spec} passHref>
                            <a target="_blank" className="!font-semibold !text-xs text-green-400 block w-fit !leading-none">
                                SPECIFICATION
                                <span className="ml-1">
                                    <External className="fill-green-400" />
                                </span>
                            </a>
                        </Link>
                    </div>}
                </div>
                <div className="flex space-x-2 flex-wrap items-center pb-2">
                    {arcs && arcs.map((arc) => {
                        return <ArcLink key={arc.title} arc={arc} />
                    })}
                </div>
                <div className="markdown py-4">
                    <Markdown.render content={JSON.parse(markdown)} />
                </div>
                <hr />
                {post.owner && ob.isValidPatp(post.owner) && post.status !== "Completed" && <div className="pt-4">
                    <p>Interested in contributing to this project? <br />
                        Send a DM on Urbit to
                        <Link href={`https://urbit.org/ids/${post.owner}`}>
                            <a className="ml-2">{post.owner}</a>
                        </Link></p>
                </div>}
            </div>
        </Grid>
    </BasicPage>
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(
        params.slug,
        ["title", "slug", "date", "description", "content", "status", "contributors", "duration", "manpower", "owner", "end_date", "arcs", "spec"],
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
