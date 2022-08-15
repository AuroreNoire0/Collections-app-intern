import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/common/Header";
import MainView from "./components/views/MainView";
import LoginView from "./components/views/LoginView";
import RegisterView from "./components/views/RegisterView";
import AdminView from "./components/views/AdminView";

import Footer from "./components/common/Footer";
import AccountView from "./components/views/AccountView";
import CreateNewCollection from "./components/views/CreateNewCollection";
import UpdateCollection from "./components/views/UpdateCollection";
import UserPage from "./components/views/UserPage";
import CollectionPage from "./components/views/CollectionPage";

function App() {
  return (
    <Fragment>
      <Header />
      {/* <MainView /> */}
      {/* <LoginView /> */}

      <Routes>
        <Route exact path="/" element={<MainView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/account" element={<AccountView />}></Route>
        <Route path="/admin" element={<AdminView />}></Route>
        {/* <Route path="/user-page" element={<UserPage />}></Route> */}
        <Route path="/collection" element={<CollectionPage />}></Route>

        <Route
          path="/create-collection"
          element={<CreateNewCollection />}
        ></Route>
        <Route
          path="/update-collection/:id"
          element={<UpdateCollection />}
        ></Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
