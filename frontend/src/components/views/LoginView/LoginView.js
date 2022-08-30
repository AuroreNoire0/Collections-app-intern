import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginView.module.css";
import ErrorMessage from "../../additional/ErrorMessage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import useNewInput from "../../hooks/use-new-input";
import { login } from "../../../actions/userActions";
import { FormattedMessage } from "react-intl";

const LogView = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

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

  const formIsValid = emailIsValid && passwordIsValid;

  const logContainer = `${styles.logContainer} col-11 col-sm-10 col-md-7 col-lg-5`;
  const logIn = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/account");
    } else return;
  }, [userInfo, navigate]);

  const passwordStyles = passwordHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const emailStyles = emailHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  return (
    <Container fluid className={styles.container}>
      <Form className={logContainer}>
        <span className={styles.title}>
          <FormattedMessage id="login-view.title" />
        </span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <FormattedMessage id="login-view.email-label" />
          </Form.Label>
          <FormattedMessage id="login-view.email-placeholder">
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
              <FormattedMessage id="login-view.email-error" />
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <FormattedMessage id="login-view.password-label" />
          </Form.Label>
          <FormattedMessage id="login-view.password-placeholder">
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
              <FormattedMessage id="login-view.empty-password" />
            </p>
          )}
          {props.errorMessage && (
            <ErrorMessage variant="danger">{props.errorMessage}</ErrorMessage>
          )}
        </Form.Group>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        <div className={styles.btns}>
          <Button
            variant="primary"
            type="submit"
            onClick={logIn}
            className={styles.subBtn}
            disabled={!formIsValid}
          >
            <FormattedMessage id="login-view.login-button" />
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LogView;
