import { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/common/Header";
import MainView from "./components/views/MainView/MainView";
import Footer from "./components/common/Footer";
import LoginView from "./components/views/LoginView/LoginView";
import RegisterView from "./components/views/RegisterView/RegisterView";
import AdminView from "./components/views/AdminView/AdminView";

import AccountView from "./components/views/AccountView/AccountView";
import CreateNewCollection from "./components/views/NewCollectionView/NewCollection";
import UpdateCollection from "./components/views/EditCollectionView/EditCollection";
import UserPage from "./components/views/UserView/UserPage";
import CollectionPage from "./components/views/CollectionView/CollectionView";
import ItemPage from "./components/views/ItemView/ItemView";
import EditItem from "./components/views/EditItemView/EditItem";
import AddItem from "./components/views/NewItemView/NewItem";
import SearchResultsView from "./components/views/SearchResultsView/SearchResultsView";

import enMessages from ".//localization/en.json";
import plMessages from ".//localization/pl.json";
import localStorageKeys from ".//constants/localStorageKeys";
import locales from ".//localization/locales";

const messages = {
  [locales.EN]: enMessages,
  [locales.PL]: plMessages,
};

function App() {
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem(localStorageKeys.LOCALE) || locales.PL
  );

  const setLocale = (locale) => {
    localStorage.setItem(localStorageKeys.LOCALE, locale);
    setCurrentLocale(locale);
  };

  return (
    <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/register" element={<RegisterView />}></Route>
        <Route path="/account" element={<AccountView />}></Route>
        <Route path="/admin" element={<AdminView />}></Route>
        <Route path="/user/:id" element={<UserPage />}></Route>

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
        <Route path="/create-item" element={<AddItem />}></Route>
        <Route path="/edit-item/:id" element={<EditItem />}></Route>

        <Route path="/search/:query" element={<SearchResultsView />}></Route>
      </Routes>
      <Footer />
    </IntlProvider>
  );
}

export default App;
