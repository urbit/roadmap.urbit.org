import Head from "next/head";
import Container from "./Container";
import IntraNav from "./IntraNav";
import Grid from "./Grid";
import Header from "./Header";
import Meta from "./Meta";

export default function BasicPage({ search, post, children }) {
    return <Container>
        <IntraNav search={search} />
        <Grid className="p-4 md:p-0 md:mt-44 mb-16">
            {/* Header row */}
            <Header title={post.title} />
            <Head>
                <title>{post.title} • roadmap.urbit.org</title>
                {Meta(post)}
            </Head>
            {/* Content row */}
            {children}
        </Grid>
    </Container>
}