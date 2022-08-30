import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { logout } from "../../actions/userActions";
import { FormattedMessage } from "react-intl";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [checked, setChecked] = useState(false);

  const label = { inputProps: { "aria-label": "Switch theme" } };
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const onThemeChange = (e) => setChecked(!checked);
  checked
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.setAttribute("data-theme", "light");

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className={styles.navContainer}>
        <Link to="/" className={styles.navbrand}>
          Collection App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
