import React, { useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../views/CollectionPage.module.css";

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
const ItemsList = (props) => {
  return (
    <>
      <h1> Collection "{props.collectionName}" </h1>
      {props.rows.length !== 0 ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={props.rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
            className={styles.dataGrid}
          />
        </div>
      ) : (
        <div className={styles.noItems}>
          <p> You don't have any items in this collection. </p>
        </div>
      )}
    </>
  );
};

export default ItemsList;
