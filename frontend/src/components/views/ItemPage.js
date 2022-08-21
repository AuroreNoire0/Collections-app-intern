import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import styles from "./ItemPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Badge, CircularProgress } from "@mui/material";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addLike, getItemDetails, removeLike } from "../../actions/itemActions";
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

  const onLikeHandler = () => {
    itemDetails.itemInfo.likedBy.includes(userLogin.userInfo._id)
      ? dispatch(removeLike(params.id))
      : dispatch(addLike(params.id));
  };

  //   const isAuthor =
  //     userLogin.userInfo &&
  //     collectionDetails.collectionInfo &&
  //     userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  //   const isAdmin = userLogin.userInfo && userLogin.userInfo.admin;
  //   const allowedToAction = (userLogin.userInfo && isAuthor) || isAdmin;
  const likeStyles = userLogin.userInfo
    ? `${styles.likeIcon}`
    : `${styles.likeIconInactive}`;
  return (
    <Container className={styles.collectionCon}>
      {itemDetails.loading && (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )}
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
                    {userLogin.userInfo && (
                      <Col xs={10} lg={10}>
                        {itemDetails.itemInfo.likedBy.includes(
                          userLogin.userInfo._id
                        ) ? (
                          <span> You like it!</span>
                        ) : (
                          <span> Do you like this item? Leave a like!</span>
                        )}
                      </Col>
                    )}
                    <Col xs={2} lg={2}>
                      <Badge
                        className={styles.badge}
                        color="primary"
                        sx={{ fontSize: 3 }}
                        showZero
                        badgeContent={itemDetails.itemInfo.likedBy.length}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={likeStyles}
                          onClick={onLikeHandler}
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
          <CommentsSection comments={itemDetails.itemInfo.comments} />
        </>
      )}
    </Container>
  );
}

export default ItemPage;
