import Container from "react-bootstrap/esm/Container";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import AddItem from "./AddItem";
import styles from "./CollectionPage.module.css";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CollectionPage() {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Tags", headerName: "Tags", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.Name || ""} ${params.row.lastName || ""}`,
    },
  ];

  // rows = items

  const rows = [
    { id: 1, lastName: "Snow", Name: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", Name: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", Name: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", Name: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", Name: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", Name: null, age: 150 },
    { id: 7, lastName: "Clifford", Name: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", Name: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", Name: "Harvey", age: 65 },
  ];
  //collection name
  return (
    <Container className={styles.collectionCon}>
      <h1> Your collection:</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div>
      <h1 className={styles.title}>
        Add Item <FontAwesomeIcon className={styles.plus} icon={faPlus} />
      </h1>
    </Container>
  );
}

export default CollectionPage;
