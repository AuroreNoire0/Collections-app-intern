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

export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true };
    case ITEM_LIST_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const itemDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { loading: true };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, itemInfo: action.payload };
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true };
    case ITEM_CREATE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_CREATE_CLEAN:
      return { success: null };
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ITEM_DELETE_CLEAN:
      return { success: null };
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    case ITEM_UPDATE_CLEAN:
      return { success: null };
    default:
      return state;
  }
};
