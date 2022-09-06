import { React, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styles from "./Navigation.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Switch, Tooltip } from "@mui/material";
import { logout } from "../../actions/userActions";
import { GB, PL } from "country-flag-icons/react/3x2";
import locales from "../../localization/locales";
import localStorageKeys from "../../constants/localStorageKeys";

export default function Navigation(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [checked, setChecked] = useState(
    localStorage.getItem(localStorageKeys.THEME) === "dark" ? true : false
  );

  const label = { inputProps: { "aria-label": "Switch theme" } };
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const onThemeChange = (e) => setChecked(!checked);

  if (checked) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem(localStorageKeys.THEME, "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem(localStorageKeys.THEME, "light");
  }
  const onLanguageChangeHandler = (value) => {
    props.setLocale(value);
  };

  function handleClickOutside(e) {
    if (ref.current && ref.current.classList.contains("show")) {
      ref.current.classList.remove("show");
      document.querySelector(".navbar-toggler").classList.add("collapsed");
    }
  }
  document.addEventListener("click", handleClickOutside);

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.navContainer}>
        <Link to="/" className={styles.navbrand}>
          Collection App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end align-items-center"
          ref={ref}
        >
          <Nav>
            {!userInfo ? (
              <>
                <Link to="/login" className={styles.link}>
                  {" "}
                  <FormattedMessage id="navigation.login-button" />
                </Link>
                <Link to="/register" className={styles.link}>
                  <FormattedMessage id="navigation.register-button" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/account" className={styles.link}>
                  <FormattedMessage id="navigation.account-button" />
                </Link>
                {userInfo.admin && (
                  <Link to="/admin" className={styles.link}>
                    <FormattedMessage id="navigation.admin-button" />
                  </Link>
                )}
                <Link to="/" className={styles.link} onClick={onLogout}>
                  <FormattedMessage id="navigation.logout-button" />
                </Link>
              </>
            )}
            <Tooltip
              className={styles.tooltip}
              checked={checked}
              onChange={onThemeChange}
              title={
                <p
                  style={{
                    fontSize: 11,
                    marginBottom: 0,
                  }}
                >
                  <FormattedMessage id="navigation.theme-button" />
                </p>
              }
            >
              <Switch {...label} />
            </Tooltip>
            <div className={styles.flags}>
              <GB
                title="English"
                className={styles.flag}
                value={locales.EN}
                onClick={() => onLanguageChangeHandler(locales.EN)}
              />

              <PL
                title="Polski"
                className={styles.flag}
                onClick={() => onLanguageChangeHandler(locales.PL)}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
