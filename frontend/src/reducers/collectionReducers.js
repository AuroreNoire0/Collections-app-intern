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

export const collectionListReducer = (state = { collections: [] }, action) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { loading: true };
    case COLLECTION_LIST_SUCCESS:
      return { loading: false, collections: action.payload };
    case COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const collectionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DETAILS_REQUEST:
      return { loading: true };
    case COLLECTION_DETAILS_SUCCESS:
      return { loading: false, collectionInfo: action.payload };
    case COLLECTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const collectionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_CREATE_REQUEST:
      return { loading: true };
    case COLLECTION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case COLLECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const collectionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return { loading: true };
    case COLLECTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const collectionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_UPDATE_REQUEST:
      return { loading: true };
    case COLLECTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COLLECTION_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
