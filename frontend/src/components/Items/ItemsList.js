import React, { useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import styles from "../views/CollectionPage.module.css";
import { Button } from "react-bootstrap";
import { deleteItem } from "../../actions/itemActions";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemsList = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDeleteHandler = () => {
    selectedItems.map((i) => dispatch(deleteItem(i)));
  };
  const onEditHandler = () => {};
  const columns = [
    { field: "id", headerName: "ID", width: 180 },
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

  // function QuickSearchToolbar() {
  //   return (
  //     <Box
  //       sx={{
  //         p: 0.5,
  //         pb: 0,
  //       }}
  //     >
  //       <GridToolbarQuickFilter />
  //     </Box>
  //   );
  // }
  const handleEvent = (params) => {
    console.log(params.id);
    navigate(`/item/${params.id}`);
  };

  console.log("s");
  return (
    <>
      <h1> Collection "{props.collectionName}" </h1>
      {props.rows.length !== 0 ? (
        <>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              // components={{ Toolbar: QuickSearchToolbar }}
              rows={props.rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              checkboxSelection
              disableSelectionOnClick
              onRowClick={handleEvent}
              className={styles.dataGrid}
              onSelectionModelChange={(itm) => setSelectedItems(itm)}
              disableColumnSelector
            />
          </div>
          <Button
            type="button"
            variant="danger"
            className={styles.btn}
            onClick={onDeleteHandler}
            disabled={!props.allowedToAction}
          >
            Delete
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.btn}
            onClick={onEditHandler}
            disabled={!props.allowedToAction}
          >
            Edit
          </Button>
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
