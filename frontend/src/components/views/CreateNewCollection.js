import * as React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";

import styles from "./CreateNewCollection.module.css";
import MenuItem from "@mui/material/MenuItem";

function CreateNewCollection() {
  const [topic, setTopic] = useState("");
  const topics = [
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Signs",
      label: "Signs",
    },
    {
      value: "Whiskys",
      label: "Whiskys",
    },
    {
      value: "Cars",
      label: "Cars",
    },
    {
      value: "Toys",
      label: "Toys",
    },
    {
      value: "Games",
      label: "Games",
    },
    {
      value: "Postcards",
      label: "Postcards",
    },
    {
      value: "Shoes",
      label: "Shoes",
    },
    {
      value: "Films",
      label: "Films",
    },

    {
      value: "Jewellery",
      label: "Jewellery",
    },

    {
      value: "Other",
      label: "Other",
    },
  ];

  const handleChange = (event) => {
    setTopic(event.target.value);
  };
  return (
    <Container>
      <div className={styles.divTitle}>
        <h1 className={styles.title}>Create a new collection</h1>
      </div>
      <Grid className={styles.form}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                placeholder="Enter name"
                label="Name"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                id="outlined-select-currency"
                select
                label="Topic"
                value={topic}
                className={styles.textField}
                onChange={handleChange}
              >
                {topics.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                placeholder="Description"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                placeholder="Enter name of property"
                label="Name of property"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="text"
                placeholder="Enter other value"
                label="Other value"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                placeholder="Enter name of property"
                label="Name of property"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="data"
                placeholder="Enter other value"
                label="Other value"
                variant="outlined"
                className={styles.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                className={styles.input}
                id="raised-button-file"
                multiple
                type="file"
              />

              <label htmlFor="raised-button-file">
                <Button
                  variant="primary"
                  component="span"
                  className={styles.uploadBtn}
                >
                  Dodaj
                </Button>
              </label>
            </Grid>
            <div className={styles.divButton}>
              <Button type="submit" variant="primary" className={styles.subBtn}>
                Add collection
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default CreateNewCollection;
