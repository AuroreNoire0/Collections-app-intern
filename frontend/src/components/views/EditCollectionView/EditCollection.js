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
import { inputTypes } from "../../../constants/inputTypes";
import { useSelector } from "react-redux";
import store from "../../../store";
import { COLLECTION_UPDATE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdditionalInput from "../../additional/AdditionalInput";

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
  const intl = useIntl();
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [inputToCreate, setInputToCreate] = useState({
    type: "String",
    name: "",
    value: "",
  });

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

  useEffect(() => {
    const additInp = () => {
      const inputs = collectionDetails.collectionInfo.additionalInputs
        .slice()
        .map((el) => ({ ...el }));
      setAdditionalInputs(inputs);
    };
    collectionDetails.collectionInfo &&
      collectionDetails.collectionInfo.additionalInputs &&
      additInp();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onChangeQuill = (content, delta, source, editor) => {
    setValues({ ...values, description: editor.getHTML() });
  };

  const cancelHandler = async (e) => {
    navigate("/account");
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, topic, description, img } = values;

    const id = collectionDetails.collectionInfo._id;
    const updateColl = () => {
      dispatch(
        updateCollection(name, topic, description, img, additionalInputs, id)
      );
    };
    updateColl();
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
  const onChangeAdditInputHandler = (e) => {
    e.target.type === "checkbox"
      ? (additionalInputs[e.target.id].value = e.target.checked)
      : (additionalInputs[e.target.id].value = e.target.value);
    setAdditionalInputs((prevState) => [...prevState]);
  };

  const onDeleteInputHandler = (e) => {
    additionalInputs.splice(e.target.id, 1);
    setAdditionalInputs((prevState) => [...prevState]);
  };

  console.log(additionalInputs);
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
              <TextField
                placeholder={intl.formatMessage({
                  id: "edit-collection.name-label",
                })}
                label={intl.formatMessage({
                  id: "edit-collection.name-label",
                })}
                variant="outlined"
                name="name"
                value={values.name}
                className={styles.textField}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="outlined-select-currency"
                select
                label={intl.formatMessage({
                  id: "edit-collection.topic-label",
                })}
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
            </Grid>
            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={values.description}
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
              <TextField
                id="outlined-select-currency"
                select
                label={intl.formatMessage({
                  id: "edit-collection.name-label",
                })}
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
            </Grid>
            <Grid xs={12} sm={5} item className={styles.gridInputLabel}>
              <TextField
                id="outlined-select-currency"
                label={intl.formatMessage({
                  id: "new-collection.input-label",
                })}
                value={inputToCreate.name}
                name="nameInp"
                className={styles.textField}
                onChange={onChangeNewInputHandler}
              />
            </Grid>
            <Grid
              xs={2}
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
                    value={inp.value}
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
