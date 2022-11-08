import Container from "./Container";
import IntraNav from "./IntraNav";
import Grid from "./Grid";
import Header from "./Header";

export default function BasicPage({ search, title, children }) {
    return <Container>
        <IntraNav search={search} />
        <Grid className="p-4 md:p-0 md:mt-44">
            {/* Header row */}
            <Header title={title} />
            {/* Content row */}
            {children}
        </Grid>
    </Container>
}