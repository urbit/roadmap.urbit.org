import Head from 'next/head'
import Grid from "../components/Grid";
import { Markdown, getPostBySlug } from '@urbit/foundation-design-system';
import TableOfContents from "../components/TableOfContents";
import { dirs } from '../lib/constants';
import Link from 'next/link';
import cn from 'classnames'
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";

export default function Home({ search, markdown }) {
  const router = useRouter();
  return (
    <BasicPage
      post={{
        title: "Overview"
      }}
      search={search}
    >
      <Grid className="col-span-full md:mt-40 relative">
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
        <div className="col-span-full md:col-start-4 md:col-end-11 lg:col-end-9 markdown mt-16 md:mt-0">
          <Markdown.render content={JSON.parse(markdown)} />
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