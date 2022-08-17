import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";
import styles from "./AddItem.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { propTypes } from "react-bootstrap/esm/Image";
import { createItem } from "../../actions/itemActions";
import { useSelector, useDispatch } from "react-redux";

function AddItem(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };
  const onAddItemHandler = (e) => {
    e.preventDefault();
    props.onHideForm();
    dispatch(createItem(name));
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
                multiple
                id="tags-filled"
                label="Tags"
                className={styles.input}
                options={top100Films}
                getOptionLabel={(option) => option.title}
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
];
