import React, { useEffect, useState } from "react";
import styles from "./LikeRow.module.css";
import { Badge, CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { addLike, getItemDetails, removeLike } from "../actions/itemActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

const LikeRow = () => {
  const params = useParams();
  const itemDetails = useSelector((state) => state.itemDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const onLikeHandler = () => {
    itemDetails.itemInfo.likedBy.includes(userLogin.userInfo._id)
      ? dispatch(removeLike(params.id))
      : dispatch(addLike(params.id));
  };
  return (
    <Row className={styles.likeRow}>
      <Col xs={10} lg={10}>
        {itemDetails.itemInfo.likedBy.includes(userLogin.userInfo._id) ? (
          <span> You like it!</span>
        ) : (
          <span> Do you like this item? Leave a like!</span>
        )}
      </Col>
      <Col xs={2} lg={2}>
        <Badge
          className={styles.badge}
          color="primary"
          sx={{ fontSize: 3 }}
          showZero
          badgeContent={itemDetails.itemInfo.likedBy.length}
          onClick={onLikeHandler}
        >
          <FontAwesomeIcon icon={faHeart} className={styles.likeIcon} />
        </Badge>
      </Col>
    </Row>
  );
};

export default LikeRow;
