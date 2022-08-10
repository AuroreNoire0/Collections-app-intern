import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";
import styles from "./AddItem.module.css";
// import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddItem() {
  return (
    <Container>
      <h1 className={styles.title}>Add Item</h1>
      <Row className="g-2">
        <Col md>
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              placeholder="Id-generated automatically"
            />
            {/* {emailHasError && (
              <p className={styles.errorText}>Please enter a valid email.</p>
            )} */}
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={styles.input}
              type="text"
              placeholder="Name"
            />
            {/* {emailHasError && (
              <p className={styles.errorText}>Please enter a valid email.</p>
            )} */}
          </Form.Group>
        </Col>
        <Col md>
          <Form.Label>Tags</Form.Label>
          {/* <Autocomplete
            multiple
            id="tags-filled"
            className={styles.input}
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} placeholder="Tags" />
            )}
          />
          {/* {emailHasError && (
              <p className={styles.errorText}>Please enter a valid email.</p>
            )} */}{" "}
        </Col>
      </Row>
      <FontAwesomeIcon className={styles.plus} icon={faPlus} />

      <div className={styles.divButton}>
        <Button
          variant="primary"
          type="submit"
          className={styles.subBtn}
          // disabled={!formIsValid}
        >
          Add Item
        </Button>
      </div>
    </Container>
  );
}

export default AddItem;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
];
