import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import AddItem from "../Items/AddItem";
import styles from "./CollectionPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, TextareaAutosize } from "@mui/material";
import ItemsList from "../Items/ItemsList";
import { getItemDetails, getTags } from "../../actions/itemActions";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

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

  const onClickItemHandler = () => {
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
          <h1>{itemDetails.itemInfo.name}</h1>
          <p> Collection: {itemDetails.itemInfo.collectionName}</p>
          <p> Tags: {itemDetails.itemInfo.tags}</p>
          <p> Author: {itemDetails.itemInfo.collectionName}</p>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Leave a comment..."
            style={{ width: 200 }}
          />
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
