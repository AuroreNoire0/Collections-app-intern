import React, { useEffect, useState } from "react";
import styles from "./AdditionalInput.module.css";
import { Checkbox, Grid, FormControlLabel, TextField } from "@mui/material";
import CloseButton from "react-bootstrap/CloseButton";

function AdditionalInput(props) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const inputType = props.inputType;
  const id = props.id.toString();
  const readOnly = props.readOnly;
  const inputPropsCustom =
    inputType === "Integer"
      ? {
          "aria-label": inputType,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }
      : {
          "aria-label": inputType,
        };
  useEffect(() => {
    inputType === "Boolean" && props.value === true
      ? setChecked(true)
      : setChecked(false);
    inputType !== "Boolean" && setValue(props.value);
  }, [props.value, inputType]);
  const onChangeCheckbox = (e) => {
    setChecked(!checked);
    props.onChange(e);
  };

  const contentTextDataInt = (
    <Grid xs={6} sm={4} item>
      {props.onDeleteInput && (
        <CloseButton
          id={props.id}
          className={styles.closeButton}
          onClick={props.onDeleteInput}
        />
      )}
      <TextField
        type={inputType === "Integer" ? "number" : inputType}
        id={id}
        label={props.name}
        variant="outlined"
        value={value || ""}
        name={props.name}
        disabled={readOnly}
        className={styles.textFieldAI}
        onChange={props.onChange}
        inputProps={inputPropsCustom}
      />
    </Grid>
  );

  return (
    <>
      {(inputType === "String" ||
        inputType === "Date" ||
        inputType === "Integer") &&
        contentTextDataInt}
      {inputType === "Mutliline" && (
        <Grid xs={12} sm={4} item>
          {props.onDeleteInput && (
            <CloseButton index={props.index} onClick={props.onDeleteInput} />
          )}
          <TextField
            id={id}
            label={props.name}
            multiline
            rows={4}
            value={value}
            name={props.name}
            className={styles.textFieldAI}
            onChange={props.onChange}
            disabled={readOnly}
            inputProps={{
              "aria-label": inputType,
            }}
          />
        </Grid>
      )}
      {inputType === "Boolean" && (
        <Grid xs={3} sm={2} item>
          {props.onDeleteInput && (
            <CloseButton index={props.index} onClick={props.onDeleteInput} />
          )}
          <Grid className={styles.booleanGrid}>
            <FormControlLabel
              className={styles.checkbox}
              control={
                <Checkbox
                  className={styles.checkboxx}
                  id={id}
                  name={props.name}
                  onChange={onChangeCheckbox}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  inputProps={{
                    "aria-label": inputType,
                  }}
                  checked={checked}
                  disabled={readOnly}
                />
              }
              label={props.name}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default AdditionalInput;
