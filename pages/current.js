import { getAllPosts, getPostBySlug, Markdown } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function Current({ markdown, search, posts }) {
    return (
        <Directory
            markdown={markdown}
            search={search}
            posts={posts}
            title="Current Projects"
            columns={["Duration", "Manpower"]}
        />
    )
}

export async function getStaticProps() {
    const intro = getPostBySlug(
        "current",
        ["title", "slug", "content"],
        "/"
    );

    const markdown = JSON.stringify(Markdown.parse({ post: intro }));

    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Current"
    });

    return {
        props: { markdown, posts },
    };
}
