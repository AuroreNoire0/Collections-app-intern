import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDeleteReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  collectionListReducer,
  collectionCreateReducer,
  collectionDeleteReducer,
  collectionUpdateReducer,
  collectionDetailsReducer,
} from "./reducers/collectionReducers";
import {
  itemDeleteReducer,
  itemDetailsReducer,
  itemTagsListReducer,
  itemUpdateReducer,
} from "./reducers/itemReducers";
import { commentCreateReducer } from "./reducers/commentReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      userLogin: userLoginReducer,
      userRegister: userRegisterReducer,
      userUpdate: userUpdateReducer,
      userDelete: userDeleteReducer,
      collectionList: collectionListReducer,
      collectionCreate: collectionCreateReducer,
      collectionDelete: collectionDeleteReducer,
      collectionUpdate: collectionUpdateReducer,
      collectionDetails: collectionDetailsReducer,
      itemDelete: itemDeleteReducer,
      itemUpdate: itemUpdateReducer,
      itemDetails: itemDetailsReducer,
      tagsList: itemTagsListReducer,
      comment: commentCreateReducer,
    },
  },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
