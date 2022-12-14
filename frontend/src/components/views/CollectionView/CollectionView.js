import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styles from "./CollectionView.module.css";
import Container from "react-bootstrap/esm/Container";
import { CircularProgress } from "@mui/material";
import { Button } from "react-bootstrap";
import ItemsList from "./ItemsList";
import { getCollectionDetails } from "../../../actions/collectionActions";

function CollectionView() {
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const [tableData, setTableData] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
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
        const row = {
          id: item._id,
          name: item.name,
          tags: item.tags,
          author: item.author,
          collection: item.collectionName,
        };
        item.additionalInputs.map((i) => (row[i.name] = i.value));
        rows.push(row);
        return rows;
      });
      setTableData(rows);
    };

    !collectionDetails.loading &&
      collectionDetails.collectionInfo &&
      tableRows();
  }, [collectionDetails.collectionInfo, collectionDetails.loading]);

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

      {allowedToAction && (
        <Button
          type="button"
          variant="warning"
          className={styles.btn}
          onClick={onClickAddItemHandler}
        >
          <FormattedMessage id="collection-view.add-item-button" />
        </Button>
      )}
    </Container>
  );
}

export default CollectionView;
