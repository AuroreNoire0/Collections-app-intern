import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import styles from "../NewCollectionView/NewCollection.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { updateCollection } from "../../../actions/collectionActions";
import { topics } from "../../../constants/topicConstants";
import { inputTypes } from "../../../constants/inputTypes";
import { COLLECTION_UPDATE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AdditionalInput from "../../additional/AdditionalInput";

function EditCollection() {
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const collectionUpdate = useSelector((state) => state.collectionUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  const [values, setValues] = useState({
    name: ``,
    topic: ``,
    img: ``,
  });
  const [description, setDescription] = useState("");
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const [error, setError] = useState("");
  const [inputToCreate, setInputToCreate] = useState({
    type: "String",
    name: "",
    value: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    collectionDetails.collectionInfo &&
      setValues({
        name: `${collectionDetails.collectionInfo.name}`,
        topic: `${collectionDetails.collectionInfo.topic}`,
        img: `${collectionDetails.collectionInfo.img}`,
      });

    collectionDetails.collectionInfo &&
      setDescription(`${collectionDetails.collectionInfo.description}`);

    const additInp = () => {
      const inputs = collectionDetails.collectionInfo.additionalInputs
        .slice()
        .map((el) => ({ ...el }));
      setAdditionalInputs(inputs);
    };
    collectionDetails.collectionInfo &&
      collectionDetails.collectionInfo.additionalInputs &&
      additInp();
  }, [collectionDetails.collectionInfo]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onChangeQuill = (content, delta, source, editor) => {
    editor.getText().trim() === ""
      ? setDescription(editor.getText().trim())
      : setDescription(editor.getHTML());
  };

  const cancelHandler = async (e) => {
    navigate("/account");
  };

  useEffect(() => {
    if (collectionUpdate.success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_UPDATE_CLEAN });
      }, 4000);
    }
  }, [dispatch, collectionUpdate.success]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, topic, img } = values;
    const id = collectionDetails.collectionInfo._id;
    const authorId = collectionDetails.collectionInfo.authorId;
    const formIsValid =
      name.trim() !== "" && topic !== "" && description.trim() !== "";

    !formIsValid
      ? setError(intl.formatMessage({ id: "new-item.empty-fields" }))
      : dispatch(
          updateCollection(
            name,
            topic,
            description,
            img,
            additionalInputs,
            id,
            authorId
          )
        );
    window.scrollTo(0, 0);
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
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);
  const onDeleteInputHandler = (e) => {
    additionalInputs.splice(e.target.id, 1);
    setAdditionalInputs((prevState) => [...prevState]);
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
          console.log(err);
        });
    } else {
      return setError(
        intl.formatMessage({ id: "new-collection.invalid-format" })
      );
    }
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
        open={collectionUpdate.success}
        message={<FormattedMessage id="edit-collection.succes-message" />}
      />
      {error && (
        <MessageSnackbar open={error !== ""} severity="error" message={error} />
      )}
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="edit-collection.header" />
        </h1>
      </div>
      {!allowedToAction ? (
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
                  value={description}
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
                      value={inp.value}
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
                  <FormattedMessage id="edit-collection.cancel-button" />
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className={styles.subBtn}
                >
                  <FormattedMessage id="edit-collection.edit-button" />
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      )}
    </Container>
  );
}

export default EditCollection;
