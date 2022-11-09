import { getAllPosts } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";

export default function Completed({ search, posts }) {
    return (
        <Directory
            search={search}
            posts={posts}
            title="Completed Projects"
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
        return post.status === "Completed"
    });

    return {
        props: { posts },
    };
}
