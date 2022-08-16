import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button } from "react-bootstrap";
import styles from "./CreateNewCollection.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../actions/collectionActions";
import { topics } from "../../constants/topicConstants";
import store from "../../store";
import MessageSnackbar from "../MessageSnackbar";
import { COLLECTION_CREATE_CLEAN } from "../../constants/collectionConstants";

function CreateNewCollection() {
  const {
    collectionCreate: { success },
  } = store.getState();
  const collectionCreate = useSelector((state) => state.collectionCreate);
  const [values, setValues] = useState({
    name: "",
    description: "",
    topic: "",
  });
  const dispatch = useDispatch();

  console.log(success);
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

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { name, topic, description } = values;
    const createColl = () => {
      dispatch(createCollection(name, topic, description));
    };
    createColl();
  };
  return (
    <Container>
      <MessageSnackbar open={success} message={"Collection created."} />
      <div className={styles.divTitle}>
        <h1 className={styles.title}>Create a new collection</h1>
      </div>
      <Grid className={styles.form}>
        <form onSubmit={onFormSubmit}>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                placeholder="Enter name"
                label="Name"
                variant="outlined"
                name="name"
                className={styles.textField}
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="outlined-select-currency"
                select
                label="Topic"
                value={values.topic}
                name="topic"
                className={styles.textField}
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
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                placeholder="Description"
                className={styles.textField}
                onChange={onChangeHandler}
              />
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
                multiple
                type="file"
              />

              <label htmlFor="raised-button-file">
                <Button
                  variant="primary"
                  component="span"
                  className={styles.uploadBtn}
                >
                  Dodaj
                </Button>
              </label>
            </Grid>
            <div className={styles.divButton}>
              <Button
                type="submit"
                variant="primary"
                className={styles.subBtn}
                // onClick={addCollectionHandler}
              >
                Add collection
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default CreateNewCollection;
