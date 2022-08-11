import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import styles from "./CollectionMiniature.module.css";
import { useNavigate } from "react-router-dom";

function CollectionMiniature() {
  const navigate = useNavigate();
  const onClickCollection = () => {
    navigate("/collection/");
  };
  return (
    <Container className={styles.collectionCon} onClick={onClickCollection}>
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
