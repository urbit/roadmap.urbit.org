import { getAllPosts } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function Current({ search, posts }) {
    return (
        <Directory
            search={search}
            posts={posts}
            title="Current Projects"
            columns={["Duration", "Manpower"]}
        />
    )
}

export async function getStaticProps() {
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Current"
    });

    return {
        props: { posts },
    };
}
