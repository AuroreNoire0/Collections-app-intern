import Container from "react-bootstrap/esm/Container";
import TopItem from "./TopItem";

function Top5() {
  return (
    <Container fluid xs={10} lg={6}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-5">Top 5 the largest collection</h1>
      </div>
      <div>
        <TopItem></TopItem>
        <TopItem></TopItem>
        <TopItem></TopItem>
        <TopItem></TopItem>
        <TopItem></TopItem>
      </div>
    </Container>
  );
}

export default Top5;
