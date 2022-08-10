import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import styles from "./TopItem.module.css";

function TopItem() {
  return (
    <Container className={styles.container}>
      <p>Item</p>
    </Container>
  );
}

export default TopItem;
