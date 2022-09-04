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
import { FormattedMessage } from "react-intl";

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
    <Col xs={12} sm={6} lg={4} className={styles.wrapper}>
      <Card className={styles.cardContainer} onClick={onClickCollection}>
        <div className={styles.imgContainer}>
          <Card.Img variant="top" src={imgSrc} />
        </div>
        <Card.Body>
          <Card.Title className={styles.title}>{props.name}</Card.Title>
          <Card.Text>
            <FormattedMessage id="result.collection" />: {props.collection}
          </Card.Text>
          <Card.Text>
            <FormattedMessage id="result.author" />: {props.author}
          </Card.Text>
          <Card.Text>
            <FormattedMessage id="result.tags" />: {props.tags.join(` | `)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Result;
