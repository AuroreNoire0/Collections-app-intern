import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useNewInput from "../hooks/use-new-input";
import styles from "./LoginView.module.css";
import ErrorMessage from "../ErrorMessage";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const LogView = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");

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
    props.onClickLogBtn(email, password);
  };

  const passwordStyles = passwordHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const emailStyles = emailHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  return (
    <Container className={styles.container}>
      <Form className={logContainer}>
        <span className={styles.title}>Log In</span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={email}
            className={emailStyles}
          />
          {emailHasError && (
            <p className={styles.errorText}>Please enter a valid email.</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={passwordStyles}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={password}
          />
          {passwordHasError && (
            <p className={styles.errorText}>This field can't be empty.</p>
          )}
          {props.errorMessage ? (
            <ErrorMessage variant="danger">{props.errorMessage}</ErrorMessage>
          ) : (
            ""
          )}
        </Form.Group>

        <div className={styles.btns}>
          <Button
            variant="primary"
            type="submit"
            onClick={logIn}
            className={styles.subBtn}
            disabled={!formIsValid}
          >
            Log in
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={props.onCloseLogModal}
            className={styles.subBtn}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LogView;
