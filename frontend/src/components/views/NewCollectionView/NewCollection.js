import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./NewCollection.module.css";
import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import { TextField, Grid, MenuItem } from "@mui/material";
import { createCollection } from "../../../actions/collectionActions";
import { topics } from "../../../constants/topicConstants";
import { inputTypes } from "../../../constants/inputTypes";
import { COLLECTION_CREATE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import AdditionalInput from "../../additional/AdditionalInput";

function NewCollection() {
  const collectionCreate = useSelector((state) => state.collectionCreate);
  const userLogin = useSelector((state) => state.userLogin);
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const [values, setValues] = useState({
    name: "",
    description: "",
    topic: "",
    img: "",
  });
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [inputToCreate, setInputToCreate] = useState({
    type: "String",
    name: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    if (collectionCreate.success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_CREATE_CLEAN });
        setValues({
          name: "",
          description: "",
          topic: "",
          img: "",
        });
        setAdditionalInputs([]);
      }, 5000);
    }
  }, [dispatch, collectionCreate.success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }, [error]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const cancelHandler = async (e) => {
    navigate("/account");
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, topic, description, img } = values;
    const formIsValid =
      name.trim() !== "" && topic !== "" && description.trim() !== "";

    !formIsValid
      ? setError(intl.formatMessage({ id: "new-item.empty-fields" }))
      : dispatch(
          createCollection(name, topic, description, img, additionalInputs)
        );
    window.scrollTo(0, 0);
  };

  const onChangeQuill = (content, delta, source, editor) => {
    editor.getText().trim() === ""
      ? setValues({ ...values, description: editor.getText().trim() })
      : setValues({ ...values, description: editor.getHTML() });
  };

  const uploadImage = (e, img) => {
    const url = "https://api.cloudinary.com/v1_1/collapp/image/upload";

    if (
      img.type === "image/jpeg" ||
      img.type === "image/png" ||
      img.type === "image/jpg"
    ) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "collectionApp");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setValues({ ...values, img: data.url.toString() });
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      return setError(
        intl.formatMessage({ id: "new-collection.invalid-format" })
      );
    }
  };
  const onChangeNewInputHandler = (e) => {
    e.target.name === "type"
      ? setInputToCreate({ ...inputToCreate, type: e.target.value })
      : setInputToCreate({ ...inputToCreate, name: e.target.value });
  };
  const onRenderNewInputHandler = () => {
    inputToCreate.name.trim() !== ""
      ? setAdditionalInputs((prevState) => [
          ...prevState,
          {
            type: inputToCreate.type,
            name: inputToCreate.name,
            value: "",
          },
        ])
      : setError(
          intl.formatMessage({ id: "new-collection.empty-additional-field" })
        );
  };
  error && window.scrollTo(0, 0);
  const onDeleteInputHandler = (e) => {
    additionalInputs.splice(e.target.id, 1);
    setAdditionalInputs((prevState) => [...prevState]);
  };

  const isAuthor =
    userLogin &&
    userLogin.login &&
    collectionDetails.collectionInfo &&
    userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  const isAdmin = userLogin && userLogin.login && userLogin.userInfo.admin;
  const allowedToAction = (userLogin.login && isAuthor) || isAdmin;

  return (
    <Container>
      <MessageSnackbar
        open={collectionCreate.success}
        message={<FormattedMessage id="new-collection.succes-message" />}
      />

      <MessageSnackbar open={error !== ""} severity="error" message={error} />

      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="new-collection.title" />
        </h1>
      </div>
      {!userLogin.userInfo ? (
        <MessageSnackbar
          open={true}
          severity="error"
          message={<FormattedMessage id="all.not-allowed" />}
        />
      ) : (
        <Grid className={styles.form}>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <FormattedMessage id="new-collection.name-label">
                  {(label) => (
                    <TextField
                      label={label}
                      variant="outlined"
                      name="name"
                      value={values.name}
                      className={styles.textField}
                      onChange={onChangeHandler}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid xs={12} sm={6} item className={styles.gridTopic}>
                <FormattedMessage id="new-collection.topic-label">
                  {(label) => (
                    <TextField
                      id="outlined-select-currency"
                      select
                      label={label}
                      value={values.topic}
                      name="topic"
                      className={styles.textFieldTopic}
                      onChange={onChangeHandler}
                    >
                      {topics.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </FormattedMessage>
              </Grid>
              <Grid item xs={12}>
                <ReactQuill
                  theme="snow"
                  name="description"
                  value={values.description}
                  className={styles.description}
                  onChange={onChangeQuill}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className={styles.input}
                  id="raised-button-file"
                  onChange={(e) => uploadImage(e, e.target.files[0])}
                  type="file"
                />
              </Grid>
              <p className={styles.moreFields}>
                <FormattedMessage id="new-collection.additional-fields" />
              </p>

              <Grid xs={12} sm={5} item className={styles.gridInputType}>
                <FormattedMessage id="new-collection.input-type">
                  {(label) => (
                    <TextField
                      id="outlined-select-currency"
                      select
                      label={label}
                      name="type"
                      value={inputToCreate.type}
                      className={styles.inputTypeSelect}
                      onChange={onChangeNewInputHandler}
                    >
                      {inputTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </FormattedMessage>
              </Grid>
              <Grid xs={12} sm={5} item className={styles.gridInputLabel}>
                <FormattedMessage id="new-collection.input-label">
                  {(label) => (
                    <TextField
                      id="outlined-select-currency"
                      label={label}
                      value={inputToCreate.name}
                      name="nameInp"
                      className={styles.textFieldLabel}
                      onChange={onChangeNewInputHandler}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid
                xs={12}
                sm={2}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  type="button"
                  variant="success"
                  className={styles.createBtn}
                  onClick={onRenderNewInputHandler}
                >
                  <FormattedMessage id="new-collection.create-inputs-button" />
                </Button>
              </Grid>
              <Grid item className={styles.gridAdditionalInput}>
                <Grid container spacing={1}>
                  {additionalInputs.map((inp, index) => (
                    <AdditionalInput
                      key={index}
                      id={index}
                      name={inp.name}
                      inputType={inp.type}
                      onDeleteInput={onDeleteInputHandler}
                      readOnly={true}
                    />
                  ))}
                </Grid>
              </Grid>
              <div className={styles.divButton}>
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.subBtn}
                  onClick={cancelHandler}
                >
                  <FormattedMessage id="new-collection.cancel-button" />
                </Button>
                <Button
                  type="submit"
                  variant="warning"
                  className={styles.subBtn}
                >
                  <FormattedMessage id="new-collection.add-button" />
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      )}
    </Container>
  );
}

export default NewCollection;
