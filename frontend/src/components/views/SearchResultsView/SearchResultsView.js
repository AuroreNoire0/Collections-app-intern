import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import styles from "./SearchResultsView.module.css";
import { Container, Row } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { searchQuery } from "../../../actions/itemActions";
import Result from "./Result";

const SearchResultsView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result);

  useEffect(() => {
    dispatch(searchQuery(params.query));
  }, [dispatch, params]);
  return (
    <Container className={styles.container}>
      {result.loading && <CircularProgress color="inherit" />}
      {!result.loading && result.searchResults && (
        <>
          <h1>
            <FormattedMessage id="search-results-view.results-for" />: '
            {params.query}'
          </h1>
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
              <FormattedMessage id="search-results-view.no-results" />
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResultsView;
