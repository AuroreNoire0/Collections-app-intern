import React from "react";
import { Button } from "react-bootstrap";
import styles from "./CustomButton.module.css";

const CustomButton = (props) => {
  return (
    <Button
      type="button"
      variant={props.variant}
      className={styles.btn}
      onClick={props.onClickBtn}
    >
      {props.name}
    </Button>
  );
};

export default CustomButton;
