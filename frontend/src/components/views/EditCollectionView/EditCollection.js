import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import styles from "../NewCollectionView/NewCollection.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { updateCollection } from "../../../actions/collectionActions";
import { topics } from "../../../constants/topicConstants";
import { useSelector } from "react-redux";
import store from "../../../store";
import { COLLECTION_UPDATE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { FormattedMessage } from "react-intl";

function EditCollection() {
  const {
    collectionDetails: { collectionInfo },
    collectionUpdate: { success },
  } = store.getState();
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const collectionUpdate = useSelector((state) => state.collectionUpdate);
  const [values, setValues] = useState({
    name: ``,
    description: ``,
    topic: ``,
  });
  const navigate = useNavigate();

  useEffect(() => {
    collectionDetails.collectionInfo &&
      setValues({
        name: `${collectionDetails.collectionInfo.name}`,
        description: `${collectionDetails.collectionInfo.description}`,
        topic: `${collectionDetails.collectionInfo.topic}`,
        img: `${collectionDetails.collectionInfo.img}`,
      });
  }, [collectionDetails.collectionInfo]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_UPDATE_CLEAN });
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
    console.log(img);
    const id = collectionDetails.collectionInfo._id;
    const updateColl = () => {
      dispatch(updateCollection(name, topic, description, img, id));
    };
    updateColl();
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

  return (
    <Container>
      <MessageSnackbar
        open={success}
        message={<FormattedMessage id="edit-collection.succes-message" />}
      />
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="edit-collection.header" />
        </h1>
      </div>
      <Grid className={styles.form}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <FormattedMessage id="edit-collection.name-label">
                {(label) => (
                  <TextField
                    placeholder={label}
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
            <Grid xs={12} sm={6} item>
              <FormattedMessage id="edit-collection.topic-label">
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
              <FormattedMessage id="edit-collection.description-label">
                {(label) => (
                  <TextField
                    id="outlined-multiline-static"
                    label={label}
                    multiline
                    rows={4}
                    name="description"
                    value={values.description}
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
                <FormattedMessage id="edit-collection.cancel-button" />
              </Button>
              <Button type="submit" variant="primary" className={styles.subBtn}>
                <FormattedMessage id="edit-collection.edit-button" />
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default EditCollection;
