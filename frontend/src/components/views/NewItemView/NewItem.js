import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NewItem.module.css";
import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Autocomplete } from "@mui/material";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { getTags, createItem } from "../../../actions/itemActions";
import { ITEM_CREATE_CLEAN } from "../../../constants/itemConstants";
import { FormattedMessage } from "react-intl";
import AdditionalInput from "../../additional/AdditionalInput";

function NewItem() {
  const [name, setName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [values, setValues] = useState([{}]);
  const [additionalInputs, setAdditionalInputs] = useState([]);
  const itemCreate = useSelector((state) => state.itemCreate);
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onChangeNameHandler = (e) => setName(e.target.value);
  const onTagsChangeHandler = (event, value) => {
    setSelectedTags(value);
  };
  const onAddItemHandler = (e) => {
    e.preventDefault();
    let tags = selectedTags;
    dispatch(createItem(name, imgSrc, tags, additionalInputs));
  };

  useEffect(() => {
    const tags = async () => {
      const tags = await dispatch(getTags());
      setTagsOptions(tags);
    };
    tags();
  }, [dispatch]);

  useEffect(() => {
    if (itemCreate.success) {
      setTimeout(() => {
        dispatch({ type: ITEM_CREATE_CLEAN });
      }, 5000);
    }
  }, [dispatch, itemCreate.success]);

  const cancelHandler = async () => {
    navigate("/account");
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
          setImgSrc(data.url.toString());
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

  return (
    <Container>
      {itemCreate && (
        <MessageSnackbar
          open={itemCreate.success}
          message={<FormattedMessage id="new-item.succes-message" />}
        />
      )}

      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          {<FormattedMessage id="new-item.title" />}
        </h1>
      </div>
      <Grid className={styles.form}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormattedMessage id="new-item.id-label">
                {(label) => (
                  <TextField
                    type="text"
                    label={label}
                    variant="outlined"
                    className={styles.textFieldId}
                    disabled
                  />
                )}
              </FormattedMessage>
            </Grid>
            <Grid xs={12} sm={6} item>
              <FormattedMessage id="new-item.name-label">
                {(label) => (
                  <TextField
                    label={label}
                    value={name}
                    onChange={onChangeNameHandler}
                    variant="outlined"
                    className={styles.textField}
                  />
                )}
              </FormattedMessage>
            </Grid>
            <Grid xs={12} sm={12} item>
              <FormattedMessage id="new-item.tags-label">
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
                      <FormattedMessage id="new-item.tags-placeholder">
                        {(placeholder) => (
                          <TextField {...params} label={placeholder} />
                        )}
                      </FormattedMessage>
                    )}
                  />
                )}
              </FormattedMessage>
            </Grid>
            {collectionDetails.collectionInfo &&
              collectionDetails.collectionInfo.additionalInputs &&
              collectionDetails.collectionInfo.additionalInputs.map(
                (inp, index) => (
                  <AdditionalInput
                    key={index}
                    id={index}
                    name={inp.name}
                    inputType={inp.type}
                    // value={additionalInputs[index].value}
                    onChange={onChangeAdditInputHandler}
                  />
                )
              )}
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
                <FormattedMessage id="new-item.cancel-button" />
              </Button>
              <Button
                type="submit"
                variant="warning"
                className={styles.subBtn}
                onClick={onAddItemHandler}
                // disabled={userLogin}
              >
                <FormattedMessage id="new-item.add-button" />
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default NewItem;
