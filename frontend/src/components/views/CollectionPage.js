import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import AddItem from "../Items/AddItem";
import styles from "./CollectionPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import ItemsList from "../Items/ItemsList";
import { getTags } from "../../actions/itemActions";
import { Button } from "react-bootstrap";
import { getCollectionDetails } from "../../actions/collectionActions";
import { useParams } from "react-router-dom";

function CollectionPage() {
  const params = useParams();
  // const {
  //   collectionDetails: { collectionInfo },
  // } = store.getState();
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const [tableData, setTableData] = useState([]);
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const items = async () => {
      await dispatch(getCollectionDetails(params.id));
    };
    items();
  }, [dispatch, params.id]);

  useEffect(() => {
    const tableRows = () => {
      let rows = [];
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
      setTableData(rows);
    };

    !collectionDetails.loading &&
      collectionDetails.collectionInfo &&
      tableRows();
  }, [collectionDetails.collectionInfo]);

  const onNewItemHandler = async () => {
    setShowForm(true);
    const tags = await dispatch(getTags());
    setTags(tags);
  };

  const onClickItemHandler = () => {
    console.log("click");
  };

  const isAuthor =
    userLogin.userInfo &&
    collectionDetails.collectionInfo &&
    userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  const isAdmin = userLogin.userInfo && userLogin.userInfo.admin;
  const allowedToAction = (userLogin.userInfo && isAuthor) || isAdmin;

  return (
    <Container className={styles.collectionCon}>
      {collectionDetails.collectionInfo && !collectionDetails.loading ? (
        <ItemsList
          rows={tableData}
          collectionName={collectionDetails.collectionInfo.name}
          allowedToAction={allowedToAction}
        />
      ) : (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )}

      <Button
        type="button"
        variant="warning"
        className={styles.btn}
        onClick={onNewItemHandler}
        disabled={!allowedToAction}
      >
        New item
      </Button>

      {showForm && (
        <AddItem tags={tags} onHideForm={(e) => setShowForm(false)} />
      )}
    </Container>
  );
}

export default CollectionPage;
