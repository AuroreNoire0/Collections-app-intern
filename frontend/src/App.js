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
import ItemPage from "./components/views/ItemPage";
import EditItem from "./components/views/EditItem";
import { Container } from "react-bootstrap";
import styles from "./index.css";

function App() {
  return (
    <Fragment>
      {/* <Container fluid className={styles.content}> */}
      <Header />
      <Routes>
        <Route exact path="/" element={<MainView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/account" element={<AccountView />}></Route>
        <Route path="/admin" element={<AdminView />}></Route>
        {/* <Route path="/user-page" element={<UserPage />}></Route> */}
        <Route path="/collection/:id" element={<CollectionPage />}></Route>

        <Route
          path="/create-collection"
          element={<CreateNewCollection />}
        ></Route>
        <Route
          path="/update-collection/:id"
          element={<UpdateCollection />}
        ></Route>
        <Route path="/item/:id" element={<ItemPage />}></Route>
        <Route path="/edit-item/:id" element={<EditItem />}></Route>
      </Routes>
      {/* </Container> */}
      <Footer />
    </Fragment>
  );
}

export default App;
