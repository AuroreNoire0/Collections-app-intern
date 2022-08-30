import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./RegisterView.module.css";
import useNewInput from "../../hooks/use-new-input";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import ErrorMessage from "../../additional/ErrorMessage";
import { Container } from "react-bootstrap";
import { register } from "../../../actions/userActions";
import { FormattedMessage } from "react-intl";

const RegisterView = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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

  const regHandler = async (event) => {
    event.preventDefault();
    // setError(null);

    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/account");
    } else return;
  }, [userInfo, navigate]);

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
          {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : ""}
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
