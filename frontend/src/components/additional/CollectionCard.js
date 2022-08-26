import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col } from "react-bootstrap";
import styles from "./CollectionCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import image from "../../img/NoImg.jpg";
import {
  deleteCollection,
  getCollectionDetails,
} from "../../actions/collectionActions";

const CollectionCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    props.img && setImgSrc(`${props.img}`);
  }, [props]);

  const onClickCollection = () => {
    navigate(`/collection/${props.id}`);
  };

  const onDeleteCollection = (e) => {
    e.stopPropagation();
    const deleteColl = () => {
      dispatch(deleteCollection(e.target.id));
    };
    deleteColl();
  };

  const onEditCollection = (e) => {
    e.stopPropagation();
    const detailsColl = () => {
      dispatch(getCollectionDetails(e.target.id));
    };
    detailsColl();
    navigate(`/update-collection/${props.id}`);
  };

  return (
    <Col md={6} xl={4}>
      <Card className={styles.cardContainer} onClick={onClickCollection}>
        <div className={styles.imgContainer}>
          <Card.Img variant="top" src={imgSrc} />
          <div className={styles.actions}>
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
          </div>
        </div>
        <Card.Body>
          <Card.Title className={styles.title}>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CollectionCard;
