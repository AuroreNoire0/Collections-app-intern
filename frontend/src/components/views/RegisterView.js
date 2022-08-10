import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./RegisterView.module.css";
import useNewInput from "../hooks/use-new-input";
import { useState } from "react";
import { Row } from "react-bootstrap";
import ErrorMessage from "../ErrorMessage";
import { Container } from "react-bootstrap";

const RegisterView = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const [regOK, setRegOK] = useState();
  const [error, setError] = useState(null);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useNewInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangedHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useNewInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useNewInput(isNotEmpty && isEmail);

  // const regHandler = async (event) => {
  //   event.preventDefault();
  //   setError(null);
  //   setRegOK(false);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //     const { data } = await axios.post(
  //       "/api/users",
  //       { email, name, password },
  //       config
  //     );
  //     localStorage.setItem("userInfo", JSON.stringify(data));

  //     setRegOK(true);
  //     resetPassword();
  //     resetEmail();
  //     resetName();
  //   } catch (error) {
  //     setError(error.response.data.message);
  //   }
  // };

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const rogFormStyles = `${styles.logForm} regModal col-10 col-sm-7 col-lg-4`;

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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            className={nameStyles}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={name}
          />
          {nameHasError && (
            <p className={styles.errorText}>This field can't be empty.</p>
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
          {regOK ? (
            <ErrorMessage variant="success">
              {"Registration successful! You can log in."}
            </ErrorMessage>
          ) : null}
          {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : ""}
        </Form.Group>

        <div className={styles.btns}>
          <Button
            variant="primary"
            type="submit"
            className={styles.subBtn}
            disabled={!formIsValid}
          >
            Register
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={props.onCloseRegModal}
            className={styles.subBtn}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterView;
