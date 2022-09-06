import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styles from "./RegisterView.module.css";
import { Container, Button, Form } from "react-bootstrap";
import useNewInput from "../../hooks/use-new-input";
import ErrorMessage from "../../additional/ErrorMessage";
import { register } from "../../../actions/userActions";
import { USER_REGISTER_CLEAN } from "../../../constants/userConstants";

const RegisterView = () => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const [errorMsg, setErrorMsg] = useState();

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useNewInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangedHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useNewInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useNewInput(isNotEmpty && isEmail);

  const regHandler = async (event) => {
    event.preventDefault();

    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userLogin.userInfo) {
      navigate("/account");
    } else return;
  }, [userLogin, navigate]);

  useEffect(() => {
    if (userRegister.error === "User already exists") {
      setErrorMsg(<FormattedMessage id="register-view.user-already-exists" />);
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_CLEAN });
        setErrorMsg("");
      }, 4000);
    } else if (!userRegister.error) {
      return;
    } else {
      setErrorMsg(userRegister.error);
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_CLEAN });
        setErrorMsg("");
      }, 4000);
    }
  }, [dispatch, userRegister.error]);

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const passwordStyles = passwordHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const emailStyles = emailHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const nameStyles = nameHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const regContainer = `${styles.regContainer} col-11 col-sm-10 col-md-7 col-lg-5`;

  return (
    <Container className={styles.container}>
      <Form className={regContainer}>
        <span className={styles.title}>Register</span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <FormattedMessage id="register-view.email-label" />
          </Form.Label>
          <FormattedMessage id="register-view.email-placeholder">
            {(placeholder) => (
              <Form.Control
                type="email"
                placeholder={placeholder}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={email}
                className={emailStyles}
              />
            )}
          </FormattedMessage>
          {emailHasError && (
            <p className={styles.errorText}>
              <FormattedMessage id="register-view.email-error" />
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>
            {<FormattedMessage id="register-view.name-label" />}
          </Form.Label>
          <FormattedMessage id="register-view.name-placeholder">
            {(placeholder) => (
              <Form.Control
                type="text"
                placeholder={placeholder}
                className={nameStyles}
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
                value={name}
              />
            )}
          </FormattedMessage>
          {nameHasError && (
            <p className={styles.errorText}>
              <FormattedMessage id="register-view.empty-name" />
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <FormattedMessage id="register-view.password-label" />
          </Form.Label>
          <FormattedMessage id="register-view.password-placeholder">
            {(placeholder) => (
              <Form.Control
                type="password"
                placeholder={placeholder}
                className={passwordStyles}
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
                value={password}
              />
            )}
          </FormattedMessage>
          {passwordHasError && (
            <p className={styles.errorText}>
              <FormattedMessage id="register-view.empty-password" />
            </p>
          )}
          {errorMsg ? (
            <ErrorMessage variant="danger">{errorMsg}</ErrorMessage>
          ) : (
            ""
          )}
        </Form.Group>

        <div className={styles.btns}>
          <Button
            variant="primary"
            type="submit"
            className={styles.subBtn}
            disabled={!formIsValid}
            onClick={regHandler}
          >
            <FormattedMessage id="register-view.register-button" />
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterView;
