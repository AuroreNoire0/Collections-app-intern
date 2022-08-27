import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import styles from "./CommentsSection.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import Comment from "./Comment";
import { createComment } from "../../../actions/commentActions";
import MessageSnackbar from "../../additional/MessageSnackbar";

function CommentsSection(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const itemDetails = useSelector((state) => state.itemDetails);
  const [content, setContent] = useState("");
  const [contentIsEmpty, setContentIsEmpty] = useState(false);
  const dispatch = useDispatch();

  const onChangeCommentHandler = (e) => {
    setContent(e.target.value);
  };
  const onNewCommentHandler = () => {
    if (content.trim() === "") {
      setContentIsEmpty(true);
      setTimeout(() => {
        setContentIsEmpty(false);
      }, 3000);
    } else {
      dispatch(createComment(content));
    }
  };

  return (
    <>
      {itemDetails.loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <h2 className="my-3"> Comments:</h2>
          <MessageSnackbar
            open={contentIsEmpty}
            message={"Comment field can't be empty."}
            severity="warning"
          />
          <Container className={styles.comments}>
            <Row className={styles.newComment}>
              <Col lg={2} className={styles.user}>
                <div className={styles.userImg}></div>
              </Col>
              <Col className={styles.commentDetails} lg={10}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={5}
                  placeholder="Leave a comment..."
                  onChange={onChangeCommentHandler}
                  className={styles.textArea}
                />

                <Button
                  type="button"
                  variant="warning"
                  className={styles.btn}
                  onClick={onNewCommentHandler}
                  disabled={!userLogin.userInfo}
                >
                  Add comment
                </Button>
              </Col>
            </Row>
            {props.comments.map((comment) => (
              <Comment
                key={comment._id}
                author={comment.authorComment}
                content={comment.content}
                date={comment.createdAt}
              />
            ))}
          </Container>
        </>
      )}
    </>
  );
}
export default CommentsSection;