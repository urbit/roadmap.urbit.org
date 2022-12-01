import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import {
  Container,
  Section,
  Markdown,
  getPostBySlug,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";
import Directory from "../../components/Directory";
import BasicPage from '../../components/BasicPage';
import Sidebar from "../../components/Sidebar";
import Grid from "../../components/Grid";
import { dirs } from '../../lib/constants';
import cn from 'classnames'

export default function UpdatePost({
  post, markdown, search
}) {

  const router = useRouter();
  const date = generateDisplayDate(post.date);

  return (
    <BasicPage
      post={{
        title: post.title
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
        <div className="col-span-full md:col-start-4 md:col-end-12 lg:col-end-10 markdown mt-16 md:mt-0">
          <Markdown.render content={JSON.parse(markdown)} />
        </div>
      </Grid>
    </BasicPage>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content"],
    "updates"
  );

  const markdown = JSON.stringify(Markdown.parse({ post: { content: String.raw`${post.content}` } }));

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "updates", "date");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
