import { getAllPosts } from "@urbit/foundation-design-system";
export function dateToDa(d, mil = false) {
    return (
        `~${d.getUTCFullYear()}.` +
        `${d.getUTCMonth() + 1}`
    );
}

export function getArcByTitle(title) {
    const arcs = getAllPosts(["title", "slug", "class"], "arcs");
    return arcs.find((e) => e.title === title);
}

export function getProjectsByArc(arc) {
    return getAllPosts(["title", "slug", "description", "status", "start_date", "end_date", "duration", "owner", "spec", "arcs"], "projects").filter((e) => e?.arcs?.includes(arc));
}