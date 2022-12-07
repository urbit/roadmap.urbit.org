import Head from "next/head";
import Link from 'next/link';
import Header from "../components/Header";
import cn from 'classnames'
import {
  Container,
  SingleColumn,
  Section,
} from "@urbit/foundation-design-system";
import { dirs } from '../lib/constants';
import Grid from "../components/Grid";
import { getAllPosts } from '@urbit/foundation-design-system';
import UpdatePreview from "../components/UpdatePreview";
import Directory from "../components/Directory";
import { useRouter } from 'next/router';
import BasicPage from '../components/BasicPage';
import Sidebar from "../components/Sidebar";


export default function Updates({ posts, search }) {

  const router = useRouter();
  const nextDir = dirs[dirs.findIndex((e) => e.link === router.pathname) + 1];

  
  return (
    <BasicPage
      post={{
        title: "Weekly Updates"
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
                    "text-wall-400": '/updates' !== router.pathname,
                    "": '/updates' === router.pathname
                })}>Updates</a>
            </Link>
          </Sidebar>
        </div>
        {/* Content */}
        <div className="col-span-full md:col-start-4 md:col-end-12 lg:col-end-10 markdown mt-16 md:mt-0">
        {posts.map((post) => (
          <UpdatePreview key={post.slug} post={post} />
        ))}
        </div>
      </Grid>
    </BasicPage>
  )

}

export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "slug", "date", "description"],
    "updates",
    "date"
  );

  return {
    props: { posts },
  };


}