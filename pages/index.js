import Head from 'next/head'
import IntraNav from '../components/IntraNav'
import Container from "../components/Container"
import Grid from "../components/Grid";
import { Markdown, getPostBySlug } from '@urbit/foundation-design-system';
import TableOfContents from "../components/TableOfContents";

export default function Home({ search, post, markdown }) {
  return (
    <Container>
      <IntraNav search={{}} />
      <Grid>
        <div className="w-full col-span-full grid grid-cols-12 p-4 md:p-0 md:mt-44">
          {/* Header row */}
          <h2 className="text-3xl font-semibold sig col-start-2 col-end-4">Roadmap</h2>
          <h2 className="text-3xl col-start-2 md:col-start-4">Overview</h2>
          {/* Content row */}
          <div className="w-full col-span-full grid grid-cols-12 md:mt-40">
            {/* Sidebar */}
            <div className="col-start-2 col-end-4">

            </div>
            {/* Content */}
            <div className="col-start-2 col-end-11 md:col-start-4 md:col-end-9 markdown">
              <Markdown.render content={JSON.parse(markdown)} />
            </div>
            {/* Table of contents */}
            <div className="col-start-9">
              <TableOfContents />
            </div>
          </div>
        </div>
      </Grid>
    </Container>
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