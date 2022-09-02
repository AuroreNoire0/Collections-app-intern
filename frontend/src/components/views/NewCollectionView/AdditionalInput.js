import React from "react";
import styles from "./AdditionalInput.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControlLabel, Radio } from "@mui/material";
import CloseButton from "react-bootstrap/CloseButton";

function AdditionalInput(props) {
  const type = props.type;
  const id = props.id;
  const contentTextDataInt = (
    <Grid xs={6} sm={4} item>
      {props.onDeleteInput && (
        <CloseButton id={props.id} onClick={props.onDeleteInput} />
      )}
      <TextField
        type={type}
        label={props.label}
        variant="outlined"
        name="name"
        className={styles.textField}
        onChange={props.onChange}
        inputProps={{
          "aria-label": props.id,
        }}
      />
    </Grid>
  );

  return (
    <>
      {(type === "String" || type === "Date" || type === "Integer") &&
        contentTextDataInt}
      {type === "Mutliline" && (
        <Grid xs={12} sm={4} item>
          {props.onDeleteInput && (
            <CloseButton index={props.index} onClick={props.onDeleteInput} />
          )}
          <TextField
            id="outlined-multiline-static"
            label={props.label}
            multiline
            rows={4}
            name="description"
            className={styles.textField}
            onChange={props.onChange}
            inputProps={{
              "aria-label": props.id,
            }}
          />
        </Grid>
      )}
      {type === "Boolean" && (
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
                  onChange={props.onChange}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  inputProps={{
                    "aria-label": props.id,
                  }}
                />
              }
              label={props.label}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default AdditionalInput;
