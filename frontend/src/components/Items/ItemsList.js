import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../views/CollectionPage.module.css";
import CustomButton from "../CustomButton";

const ItemsList = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);
  const onDeleteHandler = () => {};
  const onEditHandler = () => {};
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "tags", headerName: "Tags", width: 180 },
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
  return (
    <>
      <h1> Collection "{props.collectionName}" </h1>
      {props.rows.length !== 0 ? (
        <>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={props.rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              checkboxSelection
              className={styles.dataGrid}
              onSelectionModelChange={(itm) => setSelectedItems(itm)}
            />
          </div>
          <CustomButton
            variant="danger"
            name="Delete"
            onClickBtn={onDeleteHandler}
          />
          <CustomButton
            variant="primary"
            name="Edit"
            onClickBtn={onEditHandler}
          />
        </>
      ) : (
        <div className={styles.noItems}>
          <p> You don't have any items in this collection. </p>
        </div>
      )}
    </>
  );
};

export default ItemsList;
