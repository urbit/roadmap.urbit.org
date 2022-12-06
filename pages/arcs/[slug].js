import BasicPage from "../../components/BasicPage";
import Grid from "../../components/Grid";
import { getAllPosts, getPostBySlug, Markdown, TableOfContents } from "@urbit/foundation-design-system";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { dirs } from '../../lib/constants';
import { getProjectsByArc } from "../../lib/util";
import ProjectCard from "../../components/ProjectCard";
import cn from 'classnames'
import { useRouter } from 'next/router';

export default function ProjectPage({ search, post, projects, markdown }) {

  const router = useRouter();

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
                    <Link href="/updates">
                        <a className={cn("text-base md:text-xl", {
                            "text-wall-400": 'updates' !== router.pathname,
                            "": 'updates' === router.pathname
                        })}>Updates</a>
                    </Link>

                </Sidebar>
            </div>
            <div className="flex flex-col space-y-4 col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0">
                <div className="markdown">
                    <h2 id="summary">Summary</h2>
                    <Markdown.render content={JSON.parse(markdown)} />
                    <h2 id="projects">Projects</h2>
                    {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
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
