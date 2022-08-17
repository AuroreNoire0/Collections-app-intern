import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import styles from "./CollectionMiniature.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteCollection,
  getCollectionDetails,
} from "../actions/collectionActions";
import { updateUserState } from "../actions/userActions";

function CollectionMiniature(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickCollection = (e) => {
    dispatch(getCollectionDetails(e.target.id));
    navigate(`/collection/${props.id}`);
  };

  const onDeleteCollection = (e) => {
    const deleteColl = () => {
      dispatch(deleteCollection(e.target.id));
    };
    deleteColl();
  };

  const onEditCollection = (e) => {
    const detailsColl = () => {
      dispatch(getCollectionDetails(e.target.id));
    };
    detailsColl();
    navigate(`/update-collection/${props.id}`);
  };

  return (
    <Container className={styles.collectionCon}>
      <Col
        className={styles.collectionInfo}
        id={props.id}
        onClick={onClickCollection}
      >
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
        <div
          className={styles.iconEdit}
          id={props.id}
          onClick={onEditCollection}
        >
          <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} />
        </div>
      </Col>
    </Container>
  );
}

export default CollectionMiniature;
