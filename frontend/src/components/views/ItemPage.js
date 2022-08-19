import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import AddItem from "../Items/AddItem";
import styles from "./ItemPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Badge, CircularProgress, TextareaAutosize } from "@mui/material";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Comment from "../Comment";
import { getItemDetails } from "../../actions/itemActions";
import CommentsSection from "../CommentsSection";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import img from "../../img/NoImg.jpg";

function ItemPage() {
  const params = useParams();
  const itemDetails = useSelector((state) => state.itemDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  //run twice? Without itemInfo() cl runs once, with - 4
  useEffect(() => {
    const itemInfo = async () => {
      await dispatch(getItemDetails(params.id));
    };
    itemInfo();
  }, [dispatch, params.id]);

  const onNewCommentHandler = () => {
    console.log("click");
  };

  //   const isAuthor =
  //     userLogin.userInfo &&
  //     collectionDetails.collectionInfo &&
  //     userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  //   const isAdmin = userLogin.userInfo && userLogin.userInfo.admin;
  //   const allowedToAction = (userLogin.userInfo && isAuthor) || isAdmin;

  return (
    <Container className={styles.collectionCon}>
      {itemDetails.itemInfo && !itemDetails.loading && (
        <>
          <Row styles={styles.itemContainer}>
            <Col sm={12} lg={6} className="p-0">
              <Card className={styles.itemCard}>
                <Card.Body className="mx-1">
                  <Card.Title className={styles.title}>
                    {itemDetails.itemInfo.name}
                  </Card.Title>
                  <Card.Text className={styles.details}>
                    <span>
                      Collection: {itemDetails.itemInfo.collectionName}{" "}
                    </span>
                    <span>Tags: {itemDetails.itemInfo.tags.join(" | ")} </span>
                    <span>Author: {itemDetails.itemInfo.author} </span>
                  </Card.Text>
                  <Link
                    to={`/collection/${itemDetails.itemInfo.collectionId}`}
                    className={styles.link}
                  >
                    {" "}
                    Check this collection
                  </Link>
                  <Row className={styles.likeRow}>
                    <Col xs={10} lg={10}>
                      <span> Do you like this item? Leave a like!</span>
                    </Col>
                    <Col xs={2} lg={2}>
                      <Badge
                        className={styles.badge}
                        color="primary"
                        sx={{ fontSize: 3 }}
                        showZero
                        badgeContent={5}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={styles.likeIcon}
                        />
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} lg={6} className={styles.imgContainer}>
              <img src={img} className={styles.img} alt="Item"></img>
              <p> Here could be your photo!</p>
            </Col>
          </Row>
          <CommentsSection />
        </>
      )}
      {/* {collectionDetails.collectionInfo && !collectionDetails.loading ? (
        <Form />
      ) : (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )} */}
      <>
        {/* <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div> */}
        {/* {" "}
        {itemDetails.itemInfo && itemDetails.loading ? (
          <div className={styles.progressCircle}>
            <CircularProgress color="inherit" />{" "}
          </div>
        ) : (
          <>
            {" "}
            <div className={styles.title}>
              <h1> {itemDetails.itemInfo.name}</h1>
            </div>
            <div>Item</div>
          </>
        )} */}
      </>
    </Container>
  );
}

export default ItemPage;
