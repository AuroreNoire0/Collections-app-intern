import Container from "react-bootstrap/esm/Container";
import TopItem from "./TopItem";
import styles from "./TheLatestItems.module.css";

function TheLatestItems() {
  return (
    <Container xs={10} lg={6}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="my-5">The Latest Items</h1>
      </div>
      <TopItem></TopItem>
      <TopItem></TopItem>
      <TopItem></TopItem>
      <TopItem></TopItem>
      <TopItem></TopItem>
    </Container>
  );
}

export default TheLatestItems;
