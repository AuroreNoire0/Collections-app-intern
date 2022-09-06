import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Card, Col } from "react-bootstrap";
import styles from "./Result.module.css";
import image from "../../../img/NoImg.jpg";

const Result = (props) => {
  const navigate = useNavigate();
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
