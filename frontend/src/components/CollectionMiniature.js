import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import styles from "./CollectionMiniature.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCollection } from "../actions/collectionActions";

function CollectionMiniature(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCollection = () => {
    navigate("/collection/");
  };

  const onDeleteCollection = async (event) => {
    // const clicked = event.target.closest(".iconDelete");
    console.log(event.target);
    // dispatch(deleteCollection(event.target.id));
  };

  return (
    <Container className={styles.collectionCon}>
      <Col className={styles.collectionInfo} onClick={onClickCollection}>
        <div className={styles.collectionName}>{props.name}</div>
        <div className={styles.collectionDescription}> {props.description}</div>
      </Col>

      <Col lg={1} className={styles.actions}>
        <div
          className={styles.iconDelete}
          id={props.id}
          onClick={onDeleteCollection}
        >
          <FontAwesomeIcon className={styles.icon} icon={faTrashCan} />
        </div>
        <div className={styles.iconEdit} id={props.id}>
          <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} />
        </div>
      </Col>
    </Container>
  );
}

export default CollectionMiniature;
