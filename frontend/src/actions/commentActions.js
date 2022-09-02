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
import { getUserDetails, updateUserState } from "./userActions";
import { getItemDetails } from "./itemActions";

export const createComment = (content) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
      itemDetails: { itemInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let authorComment = userInfo.name;
    let itemId = itemInfo._id;
    let collectionId = itemInfo.collectionId;
    let authorItemId = itemInfo.authorId;

    const { data } = await axios.post(
      `/api/create-comment`,
      { content, authorComment, itemId, collectionId, authorItemId },
      config
    );

    dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data });
    dispatch(getItemDetails(itemId));
    dispatch(getCollectionDetails(collectionId));
    dispatch(getUserDetails(authorItemId)); /* necessary??  */
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
