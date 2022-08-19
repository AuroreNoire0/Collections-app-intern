import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styles from "./CommentsSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

function CommentsSection() {
  const params = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const onNewCommentHandler = () => {
    console.log("click");
  };

  return (
    <>
      <h1 className="my-3"> Comments:</h1>
      <Container className={styles.comments}>
        <Row className={styles.newComment}>
          <Col xs={4} sm={3} lg={2} className={styles.user}>
            <div className={styles.userImg}></div>
          </Col>
          <Col className={styles.commentDetails} lg={10}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Leave a comment..."
              className={styles.textArea}
            />
            <Button
              type="button"
              variant="warning"
              className={styles.btn}
              onClick={onNewCommentHandler}
            >
              Add comment
            </Button>
          </Col>
        </Row>
        <Comment />
        <Comment />
        <Comment />
      </Container>
    </>
  );
}
export default CommentsSection;
