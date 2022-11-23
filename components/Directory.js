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

export default function Directory({ search, title, markdown, posts, columns, timeline = false }) {
    const router = useRouter();

    const dateGroup = timeline ? posts.reduce((groups, post) => {
        const month = dayjs(post.date).startOf('month').toISOString()
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
                    </Sidebar>
                </div>
                {/* Content */}
                <div className={cn("col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0 markdown", {
                    "border-l border-dashed pl-8 border-wall-400": timeline
                })}>
                    {markdown && <Markdown.render content={JSON.parse(markdown)} />}
                    {timeline ? Object.entries(dateGroup).sort(([dayA,], [dayB,]) => {
                        return new Date(dayB) - new Date(dayA)
                    }).map(([date, content]) => {
                        return <div key={date} className="relative my-24">
                            <h2 className="!mt-0" id={date}>{dateToDa(new Date(date))}</h2>
                            <TimelineDot className="absolute top-2 -left-[2.58rem]" />
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
