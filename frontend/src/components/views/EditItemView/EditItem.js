import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import styles from "./EditItem.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { Autocomplete } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getItemDetails,
  getTags,
  updateItem,
} from "../../../actions/itemActions";
import { ITEM_UPDATE_CLEAN } from "../../../constants/itemConstants";
import { FormattedMessage } from "react-intl";
import AdditionalInput from "../../additional/AdditionalInput";

function EditItem() {
  const itemDetails = useSelector((state) => state.itemDetails);
  const itemUpdate = useSelector((state) => state.itemUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  const [values, setValues] = useState({
    name: ``,
    img: ``,
  });
  const [tagsOptions, setTagsOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const itemInfo = async () => {
      await dispatch(getItemDetails(params.id));
    };
    itemInfo();
  }, [dispatch, params.id]);

  useEffect(() => {
    itemDetails.itemInfo &&
      setValues({
        name: `${itemDetails.itemInfo.name}`,
      });
    itemDetails.itemInfo && setSelectedTags(itemDetails.itemInfo.tags);
  }, [itemDetails.itemInfo]);

  useEffect(() => {
    const tags = async () => {
      const tags = await dispatch(getTags());
      setTagsOptions(tags);
    };
    tags();
  }, [dispatch]);

  useEffect(() => {
    const additInp = () => {
      const inputs = itemDetails.itemInfo.additionalInputs
        .slice()
        .map((el) => ({ ...el }));
      setAdditionalInputs(inputs);
    };
    itemDetails.itemInfo && itemDetails.itemInfo.additionalInputs && additInp();
  }, [itemDetails.itemInfo]);

  useEffect(() => {
    if (itemUpdate.success) {
      setTimeout(() => {
        dispatch({ type: ITEM_UPDATE_CLEAN });
      }, 5000);
    }
  }, [dispatch, itemUpdate.success]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const cancelHandler = async (e) => {
    navigate("/account");
  };
  const onTagsChangeHandler = (event, value) => {
    setSelectedTags(value);
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
  const onChangeAdditInputHandler = (e) => {
    e.target.type === "checkbox"
      ? (additionalInputs[e.target.id].value = e.target.checked)
      : (additionalInputs[e.target.id].value = e.target.value);
    setAdditionalInputs((prevState) => [...prevState]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, img } = values;
    let tags = selectedTags;
    const editItem = () => {
      dispatch(updateItem(name, tags, img, additionalInputs, params.id));
    };
    editItem();
  };
  const isAuthor =
    userLogin &&
    userLogin.login &&
    itemDetails.itemInfo &&
    userLogin.userInfo._id === itemDetails.itemInfo.authorId;
  const isAdmin = userLogin && userLogin.login && userLogin.userInfo.admin;
  const allowedToAction = (userLogin.login && isAuthor) || isAdmin;

  return (
    <Container>
      {itemDetails.itemInfo && (
        <MessageSnackbar
          open={itemUpdate.success}
          message={<FormattedMessage id="edit-item.succes-message" />}
        />
      )}
      <div className={styles.divTitle}>
        <h1 className={styles.title}>Edit item</h1>
      </div>
      {!allowedToAction ? (
        <MessageSnackbar
          open={true}
          severity="error"
          message={<FormattedMessage id="all.not-allowed" />}
        />
      ) : (
        <Grid className={styles.form}>
          <form onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormattedMessage id="edit-item.id-placeholder">
                  {(placeholder) => (
                    <TextField
                      type="text"
                      label={placeholder}
                      value={params.id}
                      variant="outlined"
                      className={styles.textFieldId}
                      disabled
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormattedMessage id="edit-item.name-placeholder">
                  {(placeholder) => (
                    <TextField
                      label={placeholder}
                      value={values.name}
                      name="name"
                      onChange={onChangeHandler}
                      variant="outlined"
                      className={styles.textField}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid xs={12} sm={12} item>
                <FormattedMessage id="edit-item.tags-label">
                  {(label) => (
                    <Autocomplete
                      isOptionEqualToValue={(option, value) => option === value}
                      multiple
                      freeSolo
                      id="tags-filled"
                      label={label}
                      className={styles.input}
                      options={tagsOptions}
                      getOptionLabel={(option) => option || ""}
                      onChange={onTagsChangeHandler}
                      filterSelectedOptions
                      value={selectedTags}
                      renderInput={(params) => (
                        <FormattedMessage id="edit-item.tags-placeholder">
                          {(placeholder) => (
                            <TextField {...params} label={placeholder} />
                          )}
                        </FormattedMessage>
                      )}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              {itemDetails.itemInfo &&
                itemDetails.itemInfo.additionalInputs &&
                additionalInputs.map((inp, index) => (
                  <AdditionalInput
                    key={index}
                    id={index}
                    name={inp.name}
                    inputType={inp.type}
                    value={inp.value}
                    onChange={onChangeAdditInputHandler}
                  />
                ))}
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
                  <FormattedMessage id="edit-item.cancel-button" />
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className={styles.subBtn}
                >
                  <FormattedMessage id="edit-item.edit-button" />
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      )}
    </Container>
  );
}

export default EditItem;
