import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const userLogin = useSelector((state) => state.userLogin);
  const collectionDetails = useSelector((state) => state.collectionDetails);

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
  const isAuthor =
    userLogin.login &&
    collectionDetails.collectionInfo &&
    userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  const isAdmin = userLogin.login && userLogin.userInfo.admin;
  const allowedToAction = (userLogin.login && isAuthor) || isAdmin;

  return (
    <Col md={6} xl={4} className={styles.wrapper}>
      <Card className={styles.cardContainer} onClick={onClickCollection}>
        <div className={styles.imgContainer}>
          <Card.Img variant="top" src={imgSrc} />
          {allowedToAction && (
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
          )}
        </div>
        <Card.Body>
          <Card.Title className={styles.title}>{props.name}</Card.Title>
          <div
            dangerouslySetInnerHTML={{ __html: props.description }}
            className={styles.description}
          ></div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CollectionCard;
