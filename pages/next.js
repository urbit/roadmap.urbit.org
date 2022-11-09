import { getAllPosts } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function NextUp({ search, posts }) {
    return (
        <Directory
            search={search}
            posts={posts}
            title="Next Up"
            columns={["Duration", "Manpower"]}
        />
    )
}

export async function getStaticProps() {
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status"],
        "/",
        "date"
    ).filter((post) => {
        return post.status === "Next Up"
    });

    return {
        props: { posts },
    };
}
