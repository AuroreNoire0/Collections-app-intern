import React from "react";
import styles from "./AdditionalInput.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControlLabel } from "@mui/material";

function AdditionalInput(props) {
  const type = props.type;
  const contentTextDataInt = (
    <Grid xs={6} sm={4} item>
      <TextField
        type={type}
        label={props.label}
        variant="outlined"
        name="name"
        className={styles.textField}
      />
    </Grid>
  );
  return (
    <>
      {(type === "String" || type === "Date" || type === "Integer") &&
        contentTextDataInt}
      {type === "Mutliline" && (
        <Grid xs={12} sm={4} item>
          <TextField
            id="outlined-multiline-static"
            label={props.label}
            multiline
            rows={4}
            name="description"
            className={styles.textField}
          />
        </Grid>
      )}
      {type === "Boolean" && (
        <FormControlLabel
          className={styles.checkbox}
          control={<Checkbox className={styles.checkboxx} />}
          label={props.label}
          sx={{ fontSize: 30 }}
        />
      )}
    </>
  );
}

export default AdditionalInput;
