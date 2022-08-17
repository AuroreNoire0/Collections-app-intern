import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import AddItem from "../Items/AddItem";
import styles from "./CollectionPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { CircularProgress } from "@mui/material";
import ItemsList from "../Items/ItemsList";
import { getTags } from "../../actions/itemActions";
import { Button } from "react-bootstrap";
import CustomButton from "../CustomButton";

function CollectionPage() {
  const {
    collectionDetails: { collectionInfo },
  } = store.getState();
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const [tableData, setTableData] = useState([]);
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  let rows = [];
  useEffect(() => {
    const tableRows = () => {
      rows = [];
      collectionDetails.collectionInfo.items.map((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          tags: item.tags,
          author: item.author,
          collection: item.collectionName,
        });
        return rows;
      });
    };

    !collectionDetails.loading && tableRows();
    setTableData(rows);
  }, [collectionDetails.collectionInfo]);

  const onClickNewItemHandler = async () => {
    setShowForm(true);
    const tags = await dispatch(getTags());
    setTags(tags);
  };
  return (
    <Container className={styles.collectionCon}>
      {collectionDetails.loading ? (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      ) : (
        <ItemsList rows={tableData} collectionName={collectionInfo.name} />
      )}

      <CustomButton
        variant="warning"
        name="New item"
        onClickBtn={onClickNewItemHandler}
      />

      {showForm && (
        <AddItem tags={tags} onHideForm={(e) => setShowForm(false)} />
      )}
    </Container>
  );
}

export default CollectionPage;
