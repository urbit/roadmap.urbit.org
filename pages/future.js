import { getAllPosts } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function Future({ search, posts }) {
    return (
        <Directory
            search={search}
            posts={posts}
            title="Future Projects"
            columns={["Duration", "Manpower"]}
        />
    )
}

export async function getStaticProps() {
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status", "duration", "manpower"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Future"
    });

    return {
        props: { posts },
    };
}
