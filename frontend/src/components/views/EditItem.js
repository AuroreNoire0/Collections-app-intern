import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import styles from "./EditItem.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { COLLECTION_UPDATE_CLEAN } from "../../constants/collectionConstants";
import MessageSnackbar from "../MessageSnackbar";
import { Autocomplete } from "@mui/material";
import { useParams } from "react-router-dom";
import { getItemDetails, getTags, updateItem } from "../../actions/itemActions";
import { ITEM_UPDATE_CLEAN } from "../../constants/itemConstants";

function EditItem() {
  const itemDetails = useSelector((state) => state.itemDetails);
  const itemUpdate = useSelector((state) => state.itemUpdate);
  const [values, setValues] = useState({
    name: ``,
  });
  const [tagsOptions, setTagsOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

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
  const onTagsChangeHandler = (event, value) => {
    setSelectedTags(value);
  };

  const onEditItemHandler = async (e) => {
    e.preventDefault();
    const { name } = values;
    let tags = selectedTags;
    const editItem = () => {
      dispatch(updateItem(name, tags, params.id));
    };
    editItem();
  };

  return (
    <Container>
      {itemDetails.itemInfo && (
        <MessageSnackbar open={itemUpdate.success} message={"Item updated."} />
      )}
      <div className={styles.divTitle}>
        <h1 className={styles.title}>Edit item</h1>
      </div>
      <Grid>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                placeholder="Id (generated automatically)"
                value={params.id}
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                placeholder="Enter name"
                label="Name"
                value={values.name}
                name="name"
                onChange={onChangeHandler}
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid xs={12} sm={12} item>
              <Autocomplete
                isOptionEqualToValue={(option, value) => option === value}
                multiple
                freeSolo
                id="tags-filled"
                label="Tags"
                className={styles.input}
                options={tagsOptions}
                getOptionLabel={(option) => option || ""}
                onChange={onTagsChangeHandler}
                filterSelectedOptions
                value={selectedTags}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Tags" />
                )}
              />
            </Grid>
            <div className={styles.divButton}>
              <Button
                type="submit"
                variant="primary"
                className={styles.subBtn}
                onClick={onEditItemHandler}
              >
                Edit Item
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default EditItem;
