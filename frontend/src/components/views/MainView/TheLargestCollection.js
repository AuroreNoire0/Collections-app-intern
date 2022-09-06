import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import styles from "./TheLatestItems.module.css";
import Container from "react-bootstrap/esm/Container";
import { CircularProgress } from "@mui/material";
import { getCollections } from "../../../actions/collectionActions";
import TopCollection from "./TopCollection";

function TheLargestCollection() {
  const dispatch = useDispatch();
  const collectionList = useSelector((state) => state.collectionList);
  const [theLargestCollections, setTheLargestCollections] = useState([]);
  useEffect(() => {
    const topCollections = async () => {
      const collections = await dispatch(getCollections());
      setTheLargestCollections(collections.slice(0, 5));
    };
    topCollections();
  }, [dispatch]);

  return (
    <Container fluid xs={11} lg={6}>
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="largest-collection.title" />
        </h1>
      </div>
      <div>
        {collectionList.loading && !collectionList.collections ? (
          <div className="d-flex justify-content-center align-items-center">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          theLargestCollections.map((col) => (
            <TopCollection
              name={col.name}
              author={col.author}
              key={col._id}
              id={col._id}
            />
          ))
        )}
      </div>
    </Container>
  );
}

export default TheLargestCollection;
