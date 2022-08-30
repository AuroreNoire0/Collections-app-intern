import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NewCollection.module.css";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { createCollection } from "../../../actions/collectionActions";
import { topics } from "../../../constants/topicConstants";
import { COLLECTION_CREATE_CLEAN } from "../../../constants/collectionConstants";
import store from "../../../store";
import { FormattedMessage } from "react-intl";

function NewCollection() {
  const {
    collectionCreate: { success },
  } = store.getState();
  const collectionCreate = useSelector((state) => state.collectionCreate);
  const [values, setValues] = useState({
    name: "",
    description: "",
    topic: "",
    img: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_CREATE_CLEAN });
      }, 5000);
    }
  }, [dispatch, success]);

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
      dispatch(createCollection(name, topic, description, img));
    };
    createColl();
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
  console.log(values);
  return (
    <Container>
      <MessageSnackbar
        open={success}
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
              <FormattedMessage id="new-collection.name-placeholder">
                {(placeholder) => (
                  <TextField
                    placeholder={placeholder}
                    label={placeholder}
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
              <FormattedMessage id="new-collection.description-label">
                {(label) => (
                  <TextField
                    id="outlined-multiline-static"
                    label={label}
                    multiline
                    rows={4}
                    name="description"
                    placeholder={label}
                    className={styles.textField}
                    onChange={onChangeHandler}
                  />
                )}
              </FormattedMessage>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                placeholder="Enter name of property"
                label="Name of property"
                variant="outlined"
                className={styles.textField}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="text"
                placeholder="Enter other value"
                label="Other value"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                placeholder="Enter name of property"
                label="Name of property"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="data"
                placeholder="Enter other value"
                label="Other value"
                variant="outlined"
                className={styles.textField}
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
