import CollectionMiniature from "../CollectionMiniature";
import Container from "react-bootstrap/esm/Container";
import styles from "./UserPage.module.css";

function UserPage() {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.title}>
        <p>Hello, user</p>
      </div>
      <Container className={styles.collection}>
        <CollectionMiniature></CollectionMiniature>
      </Container>
    </Container>
  );
}

export default UserPage;
