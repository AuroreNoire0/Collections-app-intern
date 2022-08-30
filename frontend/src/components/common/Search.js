import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./Search.module.css";
import { Button } from "@mui/material";
import { Col, Form } from "react-bootstrap";
import { searchQuery } from "../../actions/itemActions";
import { FormattedMessage } from "react-intl";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (query.includes(".")) {
      alert(`Please don't use '.' (dot)`);
    } else if (query.trim().length > 0 && !query.includes(".")) {
      dispatch(searchQuery(query.trim()));
      navigate(`/search/${query.trim()}`);
      setQuery("");
    } else return;
  };
  return (
    <Stack spacing={2} className={styles.searchStack}>
      {" "}
      <Form className={styles.searchContainer} onSubmit={onSubmitHandler}>
        <FormattedMessage id="search.search-bar-placeholder">
          {(placeholder) => (
            <Form.Control
              type="search"
              placeholder={placeholder}
              className={styles.TextField}
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </FormattedMessage>
        <Button type="submit" variant="outline-success">
          <FormattedMessage id="search.search-button" />
        </Button>
      </Form>
      {/* <Col lg={11}>
          <TextField className={styles.TextField} label="Search..." />
        </Col>
        <Col lg={1}>
          <Button variant="contained">Contained</Button>
        </Col> */}
      {/* <Autocomplete
        id="free-solo-demo"
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={styles.TextField}
            label="Search..."
          />
        )}
      /> */}
    </Stack>
  );
};

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
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
];

export default Search;
