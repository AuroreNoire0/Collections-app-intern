import React, { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Comment = (props) => {
  const date = new Date(`${props.date}`);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const createdAt = `${day}/${month}/${year}`;
  return (
    <Row className={styles.comment}>
      <Col xs={4} sm={3} lg={2} className={styles.user}>
        <div className={styles.userImg}></div>
      </Col>
      <Col className={styles.commentDetails} lg={10}>
        <h2>{props.author}</h2>
        <div className={styles.commentContent}> {props.content}</div>
        <Row className={styles.date}>
          {" "}
          <FontAwesomeIcon className={styles.calendar} icon={faCalendarDays} />
          {createdAt}
        </Row>
      </Col>
    </Row>
  );
};

export default Comment;
