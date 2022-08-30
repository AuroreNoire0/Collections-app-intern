import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import styles from "./ItemView.module.css";
import { Badge, CircularProgress } from "@mui/material";
import { Card, Col, Row } from "react-bootstrap";
import { getItemDetails, updateLike } from "../../../actions/itemActions";
import Container from "react-bootstrap/esm/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import image from "../../../img/NoImg.jpg";
import { FormattedMessage } from "react-intl";

function ItemView() {
  const params = useParams();
  const itemDetails = useSelector((state) => state.itemDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(image);

  //run twice? Without itemInfo() cl runs once, with - 4
  useEffect(() => {
    const itemInfo = async () => {
      await dispatch(getItemDetails(params.id));
    };
    itemInfo();
  }, [dispatch, params.id]);

  const onLikeHandler = () => {
    itemDetails.itemInfo.likedBy.includes(userLogin.userInfo._id)
      ? dispatch(updateLike(params.id, "remove"))
      : dispatch(updateLike(params.id, "add"));
  };

  useEffect(() => {
    itemDetails.itemInfo &&
      itemDetails.itemInfo.img &&
      itemDetails.itemInfo.img !== `` &&
      setImgSrc(`${itemDetails.itemInfo.img}`);
  }, [itemDetails]);

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
                <Card.Title className={styles.title}>
                  {itemDetails.itemInfo.name}
                </Card.Title>
                <Card.Text className={styles.details}>
                  <span>
                    {<FormattedMessage id="item-view.collection" />}:{" "}
                    {itemDetails.itemInfo.collectionName}{" "}
                  </span>
                  <span>
                    <FormattedMessage id="item-view.tags" />:{" "}
                    {itemDetails.itemInfo.tags.join(" | ")}{" "}
                  </span>
                  <span>
                    <FormattedMessage id="item-view.author" />:{" "}
                    <Link
                      to={`/user/${itemDetails.itemInfo.authorId}`}
                      className={styles.link}
                    >
                      {itemDetails.itemInfo.author}{" "}
                    </Link>
                  </span>
                </Card.Text>
                <Link
                  to={`/collection/${itemDetails.itemInfo.collectionId}`}
                  className={styles.link}
                >
                  {" "}
                  <FormattedMessage id="item-view.check-collection" />
                </Link>

                <Row className={styles.likeRow}>
                  {userLogin.userInfo && (
                    <Col xs={10} lg={10}>
                      {itemDetails.itemInfo.likedBy.includes(
                        userLogin.userInfo._id
                      ) ? (
                        <span>
                          {" "}
                          <FormattedMessage id="item-view.like-already" />
                        </span>
                      ) : (
                        <span>
                          {" "}
                          <FormattedMessage id="item-view.no-like" />
                        </span>
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
              </Card>
            </Col>
            <Col sm={12} lg={6} className={styles.imgContainer}>
              <Card.Img
                variant="top"
                src={imgSrc}
                className={styles.img}
                alt="Item"
              />
              {/* <img src={imgSrc} className={styles.img} alt="Item"></img> */}
            </Col>
          </Row>
          <CommentsSection comments={itemDetails.itemInfo.comments} />
        </>
      )}
    </Container>
  );
}

export default ItemView;
