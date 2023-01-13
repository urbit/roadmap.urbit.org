import { getAllPosts, getPostBySlug, Markdown } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";
import { getArcByTitle } from '../lib/util';

export default function Current({ markdown, search, posts }) {
    return (
        <Directory
            markdown={markdown}
            search={search}
            posts={posts}
            title="Current Projects"
            columns={["owner", "end_date"]}
            timeline
            sort="forward"
        />
    )
}

export async function getStaticProps() {
    // const intro = getPostBySlug(
    //     "current",
    //     ["title", "slug", "content"],
    //     "/"
    // );

    // const markdown = JSON.stringify(Markdown.parse({ post: intro }));

    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status", "owner", "end_date", "arcs", "spec"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Current"
    }).map((post) => {
        if (post.arcs) {
            return { ...post, ...{ arcs: post.arcs.map((e) => getArcByTitle(e)) } }
        } else {
            return post
        }
    });

    return {
        props: { posts },
    };
}
