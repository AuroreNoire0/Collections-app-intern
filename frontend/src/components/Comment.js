import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styles from "./CommentsSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Comment = (props) => {
  return (
    <Row className={styles.comment}>
      <Col xs={4} sm={3} lg={2} className={styles.user}>
        <div className={styles.userImg}></div>
      </Col>
      <Col className={styles.commentDetails} lg={10}>
        <h2>{props.author}</h2>
        <div className={styles.commentContent}> {props.content}</div>
      </Col>
    </Row>
  );
};

export default Comment;
