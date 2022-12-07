import Grid from "../components/Grid";
import { Markdown, TableOfContents, getPostBySlug } from '@urbit/foundation-design-system';
import { dirs } from '../lib/constants';
import Link from 'next/link';
import cn from 'classnames'
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import Head from "next/head";
import Meta from "../components/Meta";

export default function Home({ search, markdown, posts }) {

  const post = {
    title: "The Urbit Roadmap",
    description: "The high-level goals that need to be achieved to make Urbit a consumer product.",
  };

  const router = useRouter();
  const nextDir = dirs[dirs.findIndex((e) => e.link === router.pathname) + 1];
  return (



    <BasicPage post={{title: "Overview"}} search={search}>

      <Head>
        <title>The Urbit Roadmap</title>
        {Meta(post, false, true)}
      </Head>

      <Grid className="col-span-full md:mt-40 relative">
        {/* Sidebar */}
        <div className="col-start-2 col-end-4">
          <Sidebar search={search}>
            {dirs.map((dir) => {
              return <li key={dir.title}>
                <Link href={dir.link}>
                  <a className={cn("font-light text-base md:text-xl", {
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
        <div className="col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 markdown mt-16 md:mt-0">
          <Markdown.render content={JSON.parse(markdown)} />
          <Pagination dir={nextDir} />
        </div>
        {/* Table of contents */}
        <div className="col-start-10">
          <TableOfContents />
        </div>
      </Grid>
    </BasicPage>
  )
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "overview",
    ["title", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { markdown },
  };
}