import React, { useEffect, useState } from "react";
import {
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  COLLECTION_DETAILS_FAIL,
  COLLECTION_DETAILS_REQUEST,
  COLLECTION_DETAILS_SUCCESS,
} from "../constants/itemConstants";
import store from "../store";
import axios from "axios";
import { getCollectionDetails } from "./collectionActions";
import { updateUserState } from "./userActions";

export const createItem = (name, tags) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
      collectionDetails: { collectionInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let author = userInfo.name;
    let authorId = userInfo._id;
    let collectionName = collectionInfo.name;
    let collectionId = collectionInfo._id;
    let comments = [];

    const { data } = await axios.post(
      `/api/create-item`,
      { name, tags, author, authorId, collectionName, collectionId, comments },
      config
    );

    dispatch({ type: ITEM_CREATE_SUCCESS, payload: data });
    dispatch(getCollectionDetails(collectionId));
    dispatch(updateUserState());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload: message,
    });
  }
};
