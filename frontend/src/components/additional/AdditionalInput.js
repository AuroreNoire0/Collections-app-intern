import React, { useEffect, useState } from "react";
import styles from "./AdditionalInput.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControlLabel, Radio } from "@mui/material";
import CloseButton from "react-bootstrap/CloseButton";

function AdditionalInput(props) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const inputType = props.inputType;
  const id = props.id.toString();
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
  }, [props.value]);
  const onChangeCheckbox = (e) => {
    setChecked(!checked);
    props.onChange(e);
  };

  const contentTextDataInt = (
    <Grid xs={6} sm={4} item>
      {props.onDeleteInput && (
        <CloseButton id={props.id} onClick={props.onDeleteInput} />
      )}
      <TextField
        type={inputType}
        id={id}
        label={props.name}
        variant="outlined"
        name={props.name}
        value={value}
        className={styles.textField}
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
            className={styles.textField}
            onChange={props.onChange}
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
