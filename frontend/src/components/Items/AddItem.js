import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Button } from "react-bootstrap";
import styles from "./AddItem.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createItem } from "../../actions/itemActions";
import { useSelector, useDispatch } from "react-redux";

function AddItem(props) {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tagsOptions = props.tags;
  const dispatch = useDispatch();

  const onTagsChangeHandler = (event, value) => {
    setSelectedTags(value);
  };
  const onChangeNameHandler = (e) => setName(e.target.value);
  const onAddItemHandler = (e) => {
    e.preventDefault();
    props.onHideForm();
    let tags = selectedTags;
    dispatch(createItem(name, tags));
  };

  return (
    <Container className={styles.addItemCon}>
      <Grid>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                type="text"
                placeholder="Id (generated automatically)"
                label="Id (generated automatically)"
                variant="outlined"
                className={styles.textField}
                disabled
              />
            </Grid>
            <Grid xs={12} sm={4} item>
              <TextField
                placeholder="Enter name"
                label="Name"
                value={name}
                onChange={onChangeNameHandler}
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid xs={12} sm={4} item>
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
                renderInput={(params) => (
                  <TextField {...params} placeholder="Tags" />
                )}
              />
            </Grid>
            <div className={styles.divButton}>
              <Button
                type="submit"
                variant="warning"
                className={styles.subBtn}
                onClick={onAddItemHandler}
              >
                Add Item
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default AddItem;
