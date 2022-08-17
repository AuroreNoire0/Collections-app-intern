import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import AddItem from "./AddItem";
import styles from "./CollectionPage.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { CircularProgress } from "@mui/material";

function CollectionPage() {
  const {
    collectionDetails: { collectionInfo },
  } = store.getState();
  const collectionDetails = useSelector((state) => state.collectionDetails);
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // {
  //   showForm && <AddItem />;
  // }

  console.log(collectionDetails.collectionInfo);
  console.log(collectionDetails.loading);
  // console.log(collectionDetails.collectionInfo.items);

  useEffect(() => {
    {
      !collectionDetails.loading &&
        setTableData(collectionDetails.collectionInfo.items);
    }
  }, [collectionDetails]);

  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "tags", headerName: "Tags", width: 130 },
    {
      field: "author",
      headerName: "Author",
      width: 130,
    },
    {
      field: "collection",
      headerName: "Collection",
      width: 160,
    },
  ];

  const rows = [];

  const Content = () => {
    return (
      <>
        {" "}
        {tableData.length !== 0 ? (
          <>
            {" "}
            {tableData.map((item) =>
              rows.push({
                id: item._id,
                name: item.name,
                tags: item.tags,
                author: item.author,
                collection: item.collectionName,
              })
            )}
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
                className={styles.dataGrid}
              />
            </div>
          </>
        ) : (
          <div className={styles.noItems}>
            <p> You don't have any items in this collection. </p>
          </div>
        )}
      </>
    );
  };

  return (
    <Container className={styles.collectionCon}>
      <h1> Your collection:</h1>
      {collectionDetails.loading ? (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      ) : (
        <Content />
      )}
      <p className={styles.addItem} onClick={(e) => setShowForm(true)}>
        <FontAwesomeIcon className={styles.plus} icon={faPlus} /> New Item
      </p>
      {showForm && <AddItem onHideForm={(e) => setShowForm(false)} />}
    </Container>
  );
}

export default CollectionPage;
