import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styles from "./Search.module.css";
import { Button, Stack } from "@mui/material";
import { Form } from "react-bootstrap";
import { searchQuery } from "../../actions/itemActions";

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
    </Stack>
  );
};

export default Search;
