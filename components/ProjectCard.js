import Link from "next/link";
import { useRouter } from "next/router";
import cn from 'classnames';
import ob from 'urbit-ob';
import External from "./icons/External";
import ArcLink from "../components/ArcLink";

export default function ProjectCard({ project, cols = ["duration", "start_date", "end_date", "owner"] }) {
    const router = useRouter();
    const stopAndNavigate = (e, href, blank) => {
        e.stopPropagation();
        if (blank) {
            return window.open(href, "_blank");
        } else {
            return router.push(href);
        }
    }

    const bg = cn({
        "bg-wall-100": project.status === "Completed",
        "bg-green-100": project.status === "Current",
        "bg-yellow-100": project.status === "Next Up",
        "bg-purple-200 dark:bg-purple": project.status === "Future"
    })
    const accent = cn({
        "text-wall-400": project.status === "Completed",
        "text-green-400": project.status === "Current",
        "text-yellow-400 dark:text-yellow-200": project.status === "Next Up",
        "text-purple-400 dark:text-purple-100": project.status === "Future"
    })
    return (
        <Link key={project.title} href={`/project/${project.slug}`}>
            <div className={`rounded-xl cursor-pointer !p-7 !mb-8 ${bg} z-0`}>
                <p className={"uppercase font-semibold !text-xs !mb-2 " + accent}>{project.status}</p>
                <h3 className="!m-0 !font-semibold !text-lg" id={project.slug}>{project.title}</h3>
                <div className="flex flex-col lg:flex-row my-5 z-10 flex-wrap">
                    {cols.map((col) => {
                        if (project?.[col]) {
                            return <div key={col} className="flex flex-col shrink-0 basis-full my-2 lg:my-0 lg:basis-1/4">
                                <p className="uppercase !font-semibold !text-xs !text-wall-500 !m-0">{col.replace("_", " ")}</p>
                                {col === "owner" && ob.isValidPatp(project[col])
                                    ? <a className="!my-0 !text-base font-semibold text-green-400"
                                        href={`https://urbit.org/ids/${project[col]}`}
                                        target="_blank" rel="noreferrer">
                                        {project[col]}
                                    </a>
                                    : col === "contributors"
                                        ? project[col].map((ea) =>
                                            <a key={ea}
                                                className="!my-0 !text-base font-semibold text-green-400"
                                                href={`https://urbit.org/ids/${ea}`}
                                                target="_blank"
                                                rel="noreferrer">
                                                {ea}
                                            </a>)
                                        : <p className="!my-0 !text-base">{project?.[col] || "TBD"}</p>
                                }
                            </div>
                        }
                    })}
                    {project?.spec && <div className="grow ml-4">
                        <a className="!font-semibold !text-xs text-green-400 block w-fit !leading-none"
                            onClick={(e) => stopAndNavigate(e, project.spec, true)}>
                            SPEC
                            <span className="ml-1">
                                <External className="fill-green-400" />
                            </span>
                        </a>
                    </div>}
                </div>
                <p className="!text-base !mt-2">{project.description}</p>
                {project.arcs && <div className="flex flex-wrap items-center">
                    {project.arcs.map((arc) => <ArcLink key={arc.title} arc={arc} />)}
                </div>}
            </div>
        </Link>
    )
}