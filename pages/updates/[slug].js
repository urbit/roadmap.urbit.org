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
import { dateUrbit } from "../../lib/util";

export default function UpdatePost({
  post, markdown, search
}) {

  const router = useRouter();
  const date = generateDisplayDate(post.date);


  return (
    <BasicPage
      sectionTitle="Update"
      post={{
        title: dateUrbit(new Date(date)) + " Update"
      }}
      search={search}
    >
      <Grid className="col-span-full md:mt-40 relative">
        {/* Sidebar */}

          <div className="col-start-2 col-end-4">
              <Sidebar search={search}>
                  <li><Link href={`/updates`}><a className="text-lg text-green-400 back">{"<-"} Back</a></Link></li>
              </Sidebar>
          </div>


        {/* Content */}
        <div className="col-span-full md:col-start-4 md:col-end-12 lg:col-end-10 markdown mt-16 md:mt-0">

        <h1>{dateUrbit(new Date(date))}</h1>

          <div className="flex space-x-12 pb-12">

            <div class="flex flex-col space-y-2">
              <p class="!mb-1 font-semibold text-wall-400 uppercase !text-sm">Author</p>
              <p class="!my-0 !text-base">{post.extra.author}</p>
            </div>

            <div class="flex flex-col space-y-2">
              <p class="!mb-1 font-semibold text-wall-400 uppercase !text-sm">@P</p>
              <p class="!my-0 !text-base">{post.extra.ship}</p>
            </div>
          </div>

          <Markdown.render content={JSON.parse(markdown)} />
        </div>
      </Grid>
    </BasicPage>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
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
