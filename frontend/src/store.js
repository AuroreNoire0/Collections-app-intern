import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDeleteReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  usersReducer,
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
  itemCreateReducer,
  itemDeleteReducer,
  itemDetailsReducer,
  itemListReducer,
  itemTagsListReducer,
  itemUpdateReducer,
  searchReducer,
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
      userDetails: userDetailsReducer,
      users: usersReducer,
      collectionList: collectionListReducer,
      collectionCreate: collectionCreateReducer,
      collectionDelete: collectionDeleteReducer,
      collectionUpdate: collectionUpdateReducer,
      collectionDetails: collectionDetailsReducer,
      itemDelete: itemDeleteReducer,
      itemUpdate: itemUpdateReducer,
      itemDetails: itemDetailsReducer,
      itemCreate: itemCreateReducer,
      items: itemListReducer,
      tagsList: itemTagsListReducer,
      comment: commentCreateReducer,
      result: searchReducer,
    },
  },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
