import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styles from "./CommentsSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Comment() {
  const params = useParams();
  const itemDetails = useSelector((state) => state.itemDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  //run twice? Without itemInfo() cl runs once, with - 4
  //   useEffect(() => {
  //     const itemInfo = async () => {
  //       await dispatch(getItemDetails(params.id));
  //     };
  //     itemInfo();
  //   }, [dispatch, params.id]);

  const onClickItemHandler = () => {
    console.log("click");
  };

  return (
    <Row className={styles.comment}>
      <Col xs={4} sm={3} lg={2} className={styles.user}>
        <div className={styles.userImg}></div>
      </Col>
      <Col className={styles.commentDetails} lg={10}>
        <h2>John</h2>
        <div className={styles.commentContent}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id
          lorem magna. Cras gravida convallis pulvinar. Phasellus quis pretium
          lacus, sit amet convallis massa. Phasellus lacus nisl, rhoncus et quam
          sed, mollis ultricies nisl. Quisque in neque rutrum, eleifend ipsum
          non, pulvinar nisl. Nullam ultricies elit ac est tincidunt bibendum.
        </div>
      </Col>
    </Row>
  );
}

export default Comment;
