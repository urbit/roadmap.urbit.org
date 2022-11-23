import { getAllPosts } from '@urbit/foundation-design-system';
import Directory from "../components/Directory";
import { getArcByTitle } from '../lib/util';

export default function Completed({ search, posts }) {
    return (
        <Directory
            search={search}
            posts={posts}
            title="Completed Projects"
            columns={["Date", "Contributors"]}
            timeline
        />
    )
}

export async function getStaticProps() {
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "contributors", "status", "arcs", "spec"],
        "projects",
        "date"
    ).filter((post) => {
        return post.status === "Completed"
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
