import Link from "next/link"

export default function Pagination({ dir }) {
    return <Link href={dir.link} passHref>
        <div className="rounded-xl cursor-pointer !p-4 !space-y-2 flex flex-col !my-24 !pb-4 justify-center border border-wall-200">
            <p className="!mb-0">Next</p>
            <a className="text-green-400 block">{dir.title} {"->"}</a>
        </div>
    </Link>
}