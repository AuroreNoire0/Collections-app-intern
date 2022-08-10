import Container from "react-bootstrap/esm/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/esm/Col";
import styles from "./CollectionPage.module.css";
import { useState } from "react";

function CollectionPage() {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: "Id", field: "id" },
    { title: "Name", field: "name" },
    { title: "Tags", field: "tags" },
    { title: "Other", field: "other" },
  ];

  return <Container className={styles.collectionCon}></Container>;
}

export default CollectionPage;
