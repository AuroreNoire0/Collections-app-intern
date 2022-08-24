import React, { useEffect, useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";

import styles from "../Items/ManageItemButtons.module.css";

const ManageItemButtons = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteHandler = () => {};
  const editHandler = () => {};
  return (
    <Container className={styles.container}>
      <Button
        type="button"
        variant="danger"
        className={styles.btn}
        onClick={deleteHandler}
      >
        Delete
      </Button>
      <Button
        type="button"
        variant="primary"
        className={styles.btn}
        onClick={editHandler}
      >
        Edit
      </Button>
    </Container>
  );
};

export default ManageItemButtons;
