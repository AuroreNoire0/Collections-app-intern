import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import AddItem from "../NewItemView/NewItem";
import styles from "./CollectionView.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import ItemsList from "./ItemsList";
import { getTags } from "../../../actions/itemActions";
import { Button } from "react-bootstrap";
import { getCollectionDetails } from "../../../actions/collectionActions";
import { useParams, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

function CollectionView() {
  const params = useParams();
  const navigate = useNavigate();
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const [tableData, setTableData] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
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

  useEffect(() => {
    collectionDetails.collectionInfo &&
      setImgSrc(`${collectionDetails.collectionInfo.img}`);
  }, [collectionDetails.collectionInfo]);

  const onClickAddItemHandler = () => {
    navigate("/create-item");
  };

  const isAuthor =
    userLogin.login &&
    collectionDetails.collectionInfo &&
    userLogin.userInfo._id === collectionDetails.collectionInfo.authorId;
  const isAdmin = userLogin.login && userLogin.userInfo.admin;
  const allowedToAction = (userLogin.login && isAuthor) || isAdmin;

  return (
    <Container className={styles.container}>
      {collectionDetails.collectionInfo && !collectionDetails.loading ? (
        <>
          {" "}
          <ItemsList
            rows={tableData}
            name={collectionDetails.collectionInfo.name}
            description={collectionDetails.collectionInfo.description}
            allowedToAction={allowedToAction}
          />
        </>
      ) : (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )}

      <Button
        type="button"
        variant="warning"
        className={styles.btn}
        onClick={onClickAddItemHandler}
        disabled={!allowedToAction}
      >
        <FormattedMessage id="collection-view.add-item-button" />
      </Button>
    </Container>
  );
}

export default CollectionView;
