import {
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
} from "../constants/commentConstants";
import store from "../store";
import axios from "axios";
import { getCollectionDetails } from "./collectionActions";
import { updateUserState } from "./userActions";

export const createComment = (name, tags) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });

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

    let authorComment = userInfo.name;
    let authorCommentId = userInfo._id;
    let collectionId = collectionInfo._id;

    const { data } = await axios.post(
      `/api/create-comment`,
      { content, authorComment, authorCommentId, collectionId, authorItemId },
      config
    );

    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    dispatch(getCollectionDetails(collectionId));
    dispatch(updateUserState());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload: message,
    });
  }
};
