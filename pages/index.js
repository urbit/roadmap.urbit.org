import Head from 'next/head'
import IntraNav from '../components/IntraNav'
import Container from "../components/Container"
import Grid from "../components/Grid";

export default function Home() {
  return (
    <Container>
      <IntraNav search={{}} />
      <Grid>
        <div></div>
      </Grid>
    </Container>
  )
}
