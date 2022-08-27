import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col, Container } from "react-bootstrap";
import styles from "./Result.module.css";
import image from "../../../img/NoImg.jpg";
import {
  deleteCollection,
  getCollectionDetails,
} from "../../../actions/collectionActions";

const Result = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(image);

  useEffect(() => {
    props.img && setImgSrc(`${props.img}`);
  }, [props]);

  const onClickCollection = () => {
    navigate(`/item/${props.id}`);
  };
  return (
    <Col xs={12} sm={6} lg={4}>
      <Card className={styles.cardContainer} onClick={onClickCollection}>
        <div className={styles.imgContainer}>
          <Card.Img variant="top" src={imgSrc} />
        </div>
        <Card.Body>
          <Card.Title className={styles.title}>{props.name}</Card.Title>
          <Card.Text>Collection: {props.collection}</Card.Text>
          <Card.Text>Author: {props.author}</Card.Text>
          <Card.Text>Tags: {props.tags.join(` | `)}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Result;
