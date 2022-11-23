import BasicPage from "../../components/BasicPage";
import Grid from "../../components/Grid";
import { getAllPosts, getPostBySlug, Markdown, TableOfContents } from "@urbit/foundation-design-system";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { dirs } from '../../lib/constants';
import cn from 'classnames'
import { getArcByTitle, getProjectsByArc } from "../../lib/util";
import External from "../../components/icons/External";
import { useRouter } from "next/router";
import ob from 'urbit-ob';

export default function ProjectPage({ search, post, projects, markdown }) {
    const router = useRouter();
    const stopAndNavigate = (e, href, blank) => {
        e.stopPropagation();
        if (blank) {
            return window.open(href, "_blank");
        } else {
            return router.push(href);
        }
    }
    return <BasicPage
        search={search}
        sectionTitle={post.title}
        post={{
            title: post.title
        }}
    >
        <Grid className="col-span-full md:mt-40 mb-40">
            <div className="col-start-2 col-end-4">
                <Sidebar search={search}>
                    {dirs.map((dir) => {
                        return <li key={dir.title}>
                            <Link href={dir.link}>
                                <a className="font-light text-base md:text-xl text-wall-400">{dir.title}</a>
                            </Link>
                        </li>
                    })}
                </Sidebar>
            </div>

            <div className="flex flex-col space-y-4 col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0">
                <div className="markdown">
                    <h2 id="summary">Summary</h2>
                    <Markdown.render content={JSON.parse(markdown)} />
                    <h2 id="projects">Projects</h2>
                    {projects.map((project) => {
                        const bg = cn({
                            "bg-wall-100": project.status === "Completed",
                            "bg-green-100": project.status === "Current",
                            "bg-yellow-100": project.status === "Next Up",
                            "bg-purple-200 dark:bg-purple": project.status === "Future"
                        })
                        const accent = cn({
                            "text-wall-400": project.status === "Completed",
                            "text-green-400": project.status === "Current",
                            "text-yellow-400 dark:text-yellow-200": project.status === "Next Up",
                            "text-purple-400 dark:text-purple-100": project.status === "Future"
                        })
                        return (
                            <Link key={project.title} href={`/project/${project.slug}`}>
                                <div className={`rounded-xl cursor-pointer !p-7 !mb-8 ${bg} z-0`}>
                                    <p className={"uppercase font-semibold !text-xs !mb-2 " + accent}>{project.status}</p>
                                    <h3 className="!m-0 !font-semibold !text-lg" id={project.slug}>{project.title}</h3>
                                    <div className="flex my-5 z-10">
                                        {["duration", "start_date", "end_date", "owner"].map((col) => {
                                            if (project?.[col]) {
                                                return <div key={col} className="flex flex-col shrink-0 basis-1/5">
                                                    <p className="uppercase !font-semibold !text-xs !text-wall-500 !m-0">{col.replace("_", " ")}</p>
                                                    {col === "owner" && ob.isValidPatp(project[col])
                                                        ? <a className="block !m-0 !text-base font-semibold text-green-400"
                                                            onClick={(e) => stopAndNavigate(e, `https://urbit.org/ids/${project[col]}`, true)}>
                                                            {project[col]}
                                                        </a>
                                                        : <p className="!m-0 !text-base">{project[col]}</p>}
                                                </div>
                                            }
                                        })}
                                        {project?.spec && <div className="grow ml-4">
                                            <a className="!font-semibold !text-xs text-green-400 block w-fit !leading-none"
                                                onClick={(e) => stopAndNavigate(e, project.spec, true)}>
                                                SPEC
                                                <span className="ml-1">
                                                    <External className="fill-green-400" />
                                                </span>
                                            </a>
                                        </div>}
                                    </div>
                                    <p className="!text-base !mt-2">{project.description}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="col-start-10">
                <TableOfContents />
            </div>
        </Grid>
    </BasicPage>
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(
        params.slug,
        ["title", "slug", "description", "content"],
        "arcs"
    );

    const projects = getProjectsByArc(post.title).sort((a, b) => {
        const order = {
            "Completed": 1,
            "Current": 2,
            "Next Up": 3,
            "Future": 4
        };
        return order[a.status] - order[b.status]
    });

    const markdown = JSON.stringify(Markdown.parse({ post }));

    return {
        props: { post, projects, markdown },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(["slug", "date"], "arcs", "date")

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
