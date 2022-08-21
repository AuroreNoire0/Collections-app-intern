import {
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAIL,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_DELETE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DETAILS_FAIL,
  COLLECTION_DETAILS_REQUEST,
  COLLECTION_DETAILS_SUCCESS,
} from "../constants/collectionConstants";
import axios from "axios";
import store from "../store";
import {
  USER_LOGIN_SUCCESS,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import { updateUserState } from "./userActions";

export const fetchUsersCollections = () => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let authorId = userInfo._id;

    const { data } = await axios.get(`/api/account/${authorId}`, config);

    dispatch({ type: COLLECTION_LIST_SUCCESS, payload: data });
    return { data };
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteCollection = (id) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/collection/${id}`, config);

    dispatch({ type: COLLECTION_DELETE_SUCCESS, payload: data });
    dispatch(updateUserState());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COLLECTION_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createCollection =
  (name, topic, description) => async (dispatch) => {
    try {
      dispatch({ type: COLLECTION_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = store.getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      let author = userInfo.name;
      let authorId = userInfo._id;
      let items = [];

      const { data } = await axios.post(
        `/api/create-collection`,
        { name, description, topic, author, authorId, items },
        config
      );

      dispatch({ type: COLLECTION_CREATE_SUCCESS, payload: data });
      dispatch(updateUserState());
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COLLECTION_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateCollection =
  (name, topic, description, id) => async (dispatch) => {
    try {
      dispatch({ type: COLLECTION_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = store.getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      let author = userInfo.name;
      let authorId = userInfo._id;

      const { data } = await axios.post(
        `/api/update-collection/${id}`,
        { name, description, topic },
        config
      );

      dispatch({ type: COLLECTION_UPDATE_SUCCESS, payload: data });
      dispatch(getCollectionDetails(id));
      dispatch(updateUserState());
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COLLECTION_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const getCollectionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/details/${id}`, config);

    dispatch({ type: COLLECTION_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("collectionInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: COLLECTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
