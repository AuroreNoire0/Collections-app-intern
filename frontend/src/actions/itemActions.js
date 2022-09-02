import {
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_UPDATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_TAGS_LIST_SUCCESS,
  ITEM_TAGS_LIST_REQUEST,
  ITEM_TAGS_LIST_FAIL,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from "../constants/itemConstants";
import store from "../store";
import axios from "axios";
import { getCollectionDetails } from "./collectionActions";
import { getUserDetails } from "./userActions";

export const createItem =
  (name, img, tags, additionalInputs) => async (dispatch) => {
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
        {
          name,
          tags,
          author,
          authorId,
          collectionName,
          collectionId,
          comments,
          img,
          additionalInputs,
        },
        config
      );

      dispatch({ type: ITEM_CREATE_SUCCESS, payload: data });
      dispatch(getCollectionDetails(collectionId));
      // dispatch(getUserDetails(authorId));
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

export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST });

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
    let collectionId = collectionInfo._id;

    const { data } = await axios.delete(`/api/delete-item/${id}`, config);

    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data });
    dispatch(getCollectionDetails(collectionId));
    dispatch(getUserDetails());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateItem = (name, tags, img, id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/update-item/${id}`,
      { name, tags, img },
      config
    );

    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
    dispatch(getItemDetails(id));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/item-details/${id}`, config);

    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("itemInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getItems = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/items`, config);

    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_LIST_FAIL,
      payload: message,
    });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_TAGS_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/get-tags`, config);

    const tags = [...new Set(data)];
    dispatch({ type: ITEM_TAGS_LIST_SUCCESS, payload: tags });
    return tags;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_TAGS_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateLike = (id, action) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = store.getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let fromUserId = userInfo._id;

    const { data } = await axios.post(
      `/api/update-like/${id}`,
      { action, fromUserId },
      config
    );

    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });

    dispatch(getItemDetails(id));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const searchQuery = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/search/${query}`, config);
    dispatch({ type: SEARCH_SUCCESS, payload: data });
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SEARCH_FAIL,
      payload: message,
    });
  }
};
// export const addLike = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ITEM_UPDATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = store.getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     let fromUserId = userInfo._id;

//     const { data } = await axios.post(
//       `/api/add-like/${id}`,
//       { fromUserId },
//       config
//     );

//     dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });

//     dispatch(getItemDetails(id));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: ITEM_UPDATE_FAIL,
//       payload: message,
//     });
//   }
// };

// export const removeLike = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ITEM_UPDATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = store.getState();

//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     let fromUserId = userInfo._id;

//     const { data } = await axios.post(
//       `/api/remove-like/${id}`,
//       { fromUserId },
//       config
//     );

//     dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });

//     dispatch(getItemDetails(id));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: ITEM_UPDATE_FAIL,
//       payload: message,
//     });
//   }
// };
