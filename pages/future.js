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
        ["title", "slug", "date", "description", "contributors", "status", "duration", "manpower", "arcs"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Future"
    }).sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
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
