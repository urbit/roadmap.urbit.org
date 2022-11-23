import Link from "next/link";
import { useRouter } from "next/router";

export default function ArcLink({ arc }) {
    const router = useRouter();
    const stopAndNavigate = (e, href, blank) => {
        e.stopPropagation();
        if (blank) {
            return window.open(href, "_blank");
        } else {
            return router.push(href);
        }
    }
    return <Link key={arc.title} href={`/arcs/${arc.slug}`} passHref>
        <a
            className={"rounded-full w-fit !p-1 !px-4 !m-1 !mr-2 text-sm font-semibold text-white " + arc.class}
            onClick={(e) => stopAndNavigate(e, `/arcs/${arc.slug}`)}>
            {arc.title}
        </a>
    </Link>
}