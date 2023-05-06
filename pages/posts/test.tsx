import { useTheme } from "next-themes";
import Card from "../../components/card";
import Container from "../../components/container";
import Layout from "../../components/layout";

const TestHomepage = () => (
  <Layout>
    <Container>
      <Card>
        <p>hi</p>
      </Card>
      <Card>
        <p>hi</p>
      </Card>
      <Card>
        <p>hi</p>
      </Card>
      <Card>
        <p>hi</p>
      </Card>
    </Container>
  </Layout>
);

export default TestHomepage;
