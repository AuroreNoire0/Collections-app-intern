import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Result from "./Result";
import styles from "./SearchResultsView.module.css";
import { Container, Row } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { searchQuery } from "../../../actions/itemActions";

const SearchResultsView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result);

  useEffect(() => {
    dispatch(searchQuery(params.query));
  }, []);
  return (
    <Container className={styles.container}>
      {result.loading && <CircularProgress color="inherit" />}
      {!result.loading && result.searchResults && (
        <>
          <h1>Results for: '{params.query}'</h1>
          {result.searchResults.length !== 0 ? (
            <Row className={styles.results}>
              {result.searchResults.map((i) => (
                <Result
                  id={i._id}
                  key={i._id}
                  name={i.name}
                  collection={i.collectionName}
                  author={i.author}
                  tags={i.tags}
                  img={i.img}
                />
              ))}
            </Row>
          ) : (
            <Row className={styles.noResult}>
              Sorry, there is no matching result. Please try with another word.
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResultsView;
