import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import styles from "./CollectionMiniature.module.css";

function CollectionMiniature() {
  return (
    <Container className={styles.collectionCon}>
      <Col>
        <div className={styles.collectionName}>Books</div>
        <div className={styles.collectionDescription}> Lorem ipsum</div>
      </Col>
      <Col lg={1} className={styles.actions}>
        <FontAwesomeIcon className={styles.iconDelete} icon={faTrashCan} />
        <FontAwesomeIcon className={styles.iconEdit} icon={faPenToSquare} />
      </Col>
    </Container>
  );
}

export default CollectionMiniature;
