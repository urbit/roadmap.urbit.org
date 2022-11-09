import Grid from "../components/Grid";
import TableOfContents from "../components/TableOfContents";
import { dirs } from '../lib/constants';
import Link from 'next/link';
import cn from 'classnames'
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";
import React from "react";

export default function Directory({ search, title, posts, columns }) {
    const router = useRouter();
    return (
        <BasicPage
            post={{
                title
            }}
            search={search}
        >
            <Grid className="col-span-full md:mt-40 relative mb-40">
                {/* Sidebar */}
                <div className="col-start-2 col-end-4">
                    <Sidebar search={search}>
                        {dirs.map((dir) => {
                            return <li key={dir.title}>
                                <Link href={dir.link}>
                                    <a className={cn("font-urbit-sans", {
                                        "text-green-400": dir.link !== router.pathname,
                                        "text-black caret": dir.link === router.pathname
                                    })}>{dir.title}</a>
                                </Link>
                            </li>
                        })}
                    </Sidebar>
                </div>
                {/* Content */}
                <div className="col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 mt-16 md:mt-0 markdown">
                    {posts.map((post) => {
                        return <React.Fragment key={post.title}>
                            <h2>{post.title}</h2>
                            <div className="flex space-x-16">
                                {columns.map((col) => {
                                    return <div key={col} className="flex flex-col space-y-2 font-urbit-sans">
                                        <p className="!my-0 font-semibold text-wall-400 uppercase !text-base">{col}</p>
                                        <p className="!my-0">{post?.[col.toLowerCase()] || "TBA"}</p>
                                    </div>
                                })}
                            </div>
                            <p>{post.description}</p>
                            <Link href={`/project/${post.slug}`} passHref><a className="text-green-400 font-urbit-sans">More Information -{">"}</a></Link>
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