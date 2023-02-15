import Link from "next/link"

export default function Pagination({ dir }) {
    return <Link href={dir.link} passHref>
        <div className="bg-wall-100 mt-16 button-lg max-w-fit !pt-0">
            <a className="block">Next: {dir.title} {"->"}</a>
        </div>
    </Link>
}