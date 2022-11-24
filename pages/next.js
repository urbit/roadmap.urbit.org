import { getAllPosts, getPostBySlug, Markdown } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";
import { getArcByTitle } from '../lib/util';

export default function NextUp({ search, markdown, posts }) {
    return (
        <Directory
            markdown={markdown}
            search={search}
            posts={posts}
            title="Next Up"
            columns={["Duration", "Manpower"]}
        />
    )
}

export async function getStaticProps() {
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status", "duration", "manpower", "arcs", "spec"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Next Up"
    }).map((post) => {
        if (post.arcs) {
            return { ...post, ...{ arcs: post.arcs.map((e) => getArcByTitle(e)) } }
        } else {
            return post
        }
    });

    const intro = getPostBySlug(
        "next",
        ["title", "slug", "content"],
        "/"
    );

    const markdown = JSON.stringify(Markdown.parse({ post: intro }));


    return {
        props: { markdown, posts },
    };
}
