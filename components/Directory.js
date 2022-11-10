import Grid from "../components/Grid";
import { TableOfContents } from "@urbit/foundation-design-system";
import { dirs } from '../lib/constants';
import Link from 'next/link';
import cn from 'classnames'
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";
import React from "react";
import TimelineDot from "../components/icons/TimelineDot";

export default function Directory({ search, title, posts, columns, timeline = false }) {
    const router = useRouter();

    const dateGroup = timeline ? posts.reduce((groups, post) => {
        const month = "~" + new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric' }).replace('-', '.');
        if (!groups[month]) {
            groups[month] = [];
        }
        groups[month].push(post);
        return groups
    }, {}) : null;

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
                                    <a className={cn("text-xl", {
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
                    "border-l border-dashed pl-8": timeline
                })}>
                    {timeline ? Object.entries(dateGroup).map(([date, content]) => {
                        return <div key={date} className="relative mb-8">
                            <h2 className="!mt-0" id={date}>{date}</h2>
                            <TimelineDot className="absolute top-2 -left-[2.58rem]" />
                            {content.map((post) => {
                                return <React.Fragment key={post.title}>
                                    <h3 id={post.title.toLowerCase()}>{post.title}</h3>
                                    <div className="flex space-x-16">
                                        {columns.map((col) => {
                                            return <div key={col} className="flex flex-col space-y-2 ">
                                                <p className="!my-0 font-semibold text-wall-400 uppercase !text-base">{col}</p>
                                                <p className="!my-0">{post?.[col.toLowerCase()] || "TBD"}</p>
                                            </div>
                                        })}
                                    </div>
                                    <p>{post.description}</p>
                                    <Link href={`/project/${post.slug}`} passHref><a className="text-green-400  block">More Information -{">"}</a></Link>
                                </React.Fragment>
                            })}
                        </div>
                    })
                        : posts.map((post) => {
                            return <React.Fragment key={post.title}>
                                <h2 id={post.title.toLowerCase()}>{post.title}</h2>
                                <div className="flex space-x-16">
                                    {columns.map((col) => {
                                        return <div key={col} className="flex flex-col space-y-2 ">
                                            <p className="!my-0 font-semibold text-wall-400 uppercase !text-base">{col}</p>
                                            <p className="!my-0">{post?.[col.toLowerCase()] || "TBD"}</p>
                                        </div>
                                    })}
                                </div>
                                <p>{post.description}</p>
                                <Link href={`/project/${post.slug}`} passHref><a className="text-green-400 ">More Information -{">"}</a></Link>
                            </React.Fragment>
                        })}
                </div>
                {/* Table of contents */}
                <div className="col-start-10">
                    <TableOfContents />
                </div>
            </Grid>
        </BasicPage>
    )
}
