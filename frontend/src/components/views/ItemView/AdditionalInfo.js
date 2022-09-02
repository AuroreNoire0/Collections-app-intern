import React from "react";
import styles from "./CommentsSection.module.css";

const AdditionalInfo = (props) => {
  const type = props.type;
  return (
    <span className={styles.additionalInfo}>
      {props.label} :{" "}
      {type !== "Boolean"
        ? `${props.value}`
        : props.value === true
        ? "Yes"
        : "No"}
    </span>
  );
};

export default AdditionalInfo;
