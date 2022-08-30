import React, { useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import styles from "./CollectionView.module.css";
import { Button } from "react-bootstrap";
import { deleteItem } from "../../../actions/itemActions";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { FormattedMessage } from "react-intl";

const ItemsList = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onDeleteHandler = () => {
    selectedItems.map((i) => dispatch(deleteItem(i)));
  };
  const onEditHandler = () => {
    if (selectedItems.length > 1) {
      setMessage();
      setTimeout(() => {
        setMessage(<FormattedMessage id="item-list.edit-warning" />);
      }, 3000);
    } else if (selectedItems.length === 0) {
      return;
    } else {
      navigate(`/edit-item/${selectedItems[0]}`);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: <FormattedMessage id="item-list.header-id" />,
      width: 180,
    },
    {
      field: "name",
      headerName: <FormattedMessage id="item-list.header-name" />,
      width: 130,
    },
    {
      field: "tags",
      headerName: <FormattedMessage id="item-list.header-tags" />,
      width: 180,
    },
    {
      field: "author",
      headerName: <FormattedMessage id="item-list.header-author" />,
      width: 130,
    },
    {
      field: "collection",
      headerName: <FormattedMessage id="item-list.header-collection" />,
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
    navigate(`/item/${params.id}`);
  };

  return (
    <>
      <h1>
        {" "}
        <FormattedMessage id="item-list.collection-title" /> "{props.name}"{" "}
      </h1>
      <p>{props.description}</p>
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
          <MessageSnackbar
            open={message !== "" ? true : false}
            severity="warning"
            message={message}
          />
          <Button
            type="button"
            variant="danger"
            className={styles.btn}
            onClick={onDeleteHandler}
            disabled={!props.allowedToAction}
          >
            <FormattedMessage id="item-list.delete-button" />
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.btn}
            onClick={onEditHandler}
            disabled={!props.allowedToAction}
          >
            <FormattedMessage id="item-list.edit-button" />
          </Button>
        </>
      ) : (
        <div className={styles.noItems}>
          <p>
            {" "}
            <FormattedMessage id="item-list.no-item" />{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default ItemsList;
