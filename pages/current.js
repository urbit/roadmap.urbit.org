import { getAllPosts, getPostBySlug, Markdown } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function Current({ markdown, search, posts }) {
    return (
        <Directory
            markdown={markdown}
            search={search}
            posts={posts}
            title="Current Projects"
            columns={["lead", "end_date"]}
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
        ["title", "slug", "date", "description", "contributors", "status", "lead", "end_date"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Current"
    });

    return {
        props: { markdown, posts },
    };
}
