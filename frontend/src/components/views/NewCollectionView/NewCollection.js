import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./NewCollection.module.css";
import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { createCollection } from "../../../actions/collectionActions";
import { topics } from "../../../constants/topicConstants";
import { inputTypes } from "../../../constants/inputTypes";
import { COLLECTION_CREATE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import AdditionalInput from "../../additional/AdditionalInput";

function NewCollection() {
  const collectionCreate = useSelector((state) => state.collectionCreate);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (collectionCreate.success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_CREATE_CLEAN });
      }, 5000);
    }
  }, [dispatch, collectionCreate.success]);

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
    const createColl = () => {
      dispatch(
        createCollection(name, topic, description, img, additionalInputs)
      );
    };
    createColl();
  };

  const onChangeQuill = (content, delta, source, editor) => {
    setValues({ ...values, description: editor.getHTML() });
  };

  const uploadImage = (e, img) => {
    const url = "https://api.cloudinary.com/v1_1/collapp/image/upload";

    if (img.type === "image/jpeg" || img.type === "image/png") {
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
          console.log(err);
        });
    } else {
      return console.log("Please select an image");
    }
  };
  const onChangeNewInputHandler = (e) => {
    e.target.name === "type"
      ? setInputToCreate({ ...inputToCreate, type: e.target.value })
      : setInputToCreate({ ...inputToCreate, name: e.target.value });
  };
  const renderNewInputHandler = () => {
    setAdditionalInputs((prevState) => [
      ...prevState,
      {
        type: inputToCreate.type,
        name: inputToCreate.name,
        value: "",
      },
    ]);
  };

  const onDeleteInputHandler = (e) => {
    additionalInputs.splice(e.target.id, 1);
    setAdditionalInputs((prevState) => [...prevState]);
  };

  return (
    <Container>
      <MessageSnackbar
        open={collectionCreate.success}
        message={<FormattedMessage id="new-collection.succes-message" />}
      />
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="new-collection.title" />
        </h1>
      </div>
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
                    className={styles.textField}
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
                onClick={renderNewInputHandler}
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
              <Button type="submit" variant="warning" className={styles.subBtn}>
                <FormattedMessage id="new-collection.add-button" />
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default NewCollection;
