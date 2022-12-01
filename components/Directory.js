import Grid from "../components/Grid";
import { Markdown, TableOfContents } from "@urbit/foundation-design-system";
import { dirs } from '../lib/constants';
import { dateToDa } from "../lib/util";
import Link from 'next/link';
import cn from 'classnames'
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import React from "react";
import TimelineDot from "../components/icons/TimelineDot";
import dayjs from "dayjs";
import ProjectCard from "../components/ProjectCard";

export default function Directory({ search, title, markdown, posts, columns, timeline = false, sort = "reverse" }) {
    const router = useRouter();

    const dateGroup = timeline ? posts.reduce((groups, post) => {
        const month = dayjs(post.date || post.end_date).startOf('month').toISOString()
        if (!groups[month]) {
            groups[month] = [];
        }
        groups[month].push(post);
        return groups
    }, {}) : null;

    const dirIndex = dirs.findIndex((e) => e.link === router.pathname);
    const nextDir = dirIndex ? dirs[dirIndex + 1] : false;

    return (
        <BasicPage
            post={{
                title
            }}
            search={search}
        >
            {/* Lining up the timeline road to the sig on mobile layouts */}
            <Grid className={cn("col-span-full md:mt-40 relative mb-40", {
                "pl-2 md:pl-0": timeline
            })}>
                {/* Sidebar */}
                <div className="col-start-2 col-end-4">
                    <Sidebar search={search}>
                        {dirs.map((dir) => {
                            return <li key={dir.title}>
                                <Link href={dir.link}>
                                    <a className={cn("text-base md:text-xl", {
                                        "text-wall-400": dir.link !== router.pathname,
                                        "": dir.link === router.pathname
                                    })}>{dir.title}</a>
                                </Link>
                            </li>
                        })}
                        <Link href="/updates">
                            <a className={cn("text-base md:text-xl", {
                                "text-wall-400": 'updates' !== router.pathname,
                                "": 'updates' === router.pathname
                            })}>Updates</a>
                        </Link>

                    </Sidebar>
                </div>
                {/* Content */}
                <div className={cn("col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0 markdown")}>
                    {markdown && <Markdown.render content={JSON.parse(markdown)} />}
                    <div className={cn("mt-16", { "border-l-hack pl-8 relative": timeline })}>
                        {timeline ? Object.entries(dateGroup).sort(([dayA,], [dayB,]) => {
                            if (sort === "reverse") {
                                return new Date(dayB) - new Date(dayA)
                            } else {
                                return new Date(dayA) - new Date(dayB)
                            }
                        }).map(([date, content]) => {
                            return <div key={date} className="relative my-24">
                                <h2 className="!mt-0" id={date}>{dateToDa(new Date(date))}</h2>
                                <TimelineDot className="absolute top-2 -left-[2.58rem] z-10" />
                                {content.map((post) => {
                                    return <ProjectCard key={post.title} cols={["date", "contributors"]} project={post} />
                                })}
                            </div>
                        })
                            : <>
                                <h2>Projects</h2>
                                {posts.map((post) => {
                                    return <ProjectCard key={post.title} project={post} />
                                })}
                            </>
                        }
                    </div>
                    {nextDir && <Pagination dir={nextDir} />}
                </div>
                {/* Table of contents */}
                <div className="col-start-10">
                    <TableOfContents />
                </div>
            </Grid>
        </BasicPage>
    )
}
