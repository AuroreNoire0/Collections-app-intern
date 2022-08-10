import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Button } from "react-bootstrap";
import AddItem from "./AddItem";
import styles from "./CreateNewCollection.module.css";

function CreateNewCollection() {
  return (
    <Container>
      <h1 className={styles.title}>Create a new collection</h1>
      <Row className="g-2">
        <Col md>
          <FloatingLabel
            className={styles.name}
            controlId="floatingInputGrid"
            label="Collection name"
          >
            <Form.Control
              className={styles.input}
              size="lg"
              type="text"
              placeholder="Name"
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            className={styles.topic}
            controlId="floatingSelectGrid"
            size="lg"
          >
            <Form.Select
              aria-label="Floating label select example"
              className={styles.selects}
              size="lg"
            >
              <option>Choose corresponding topic</option>
              <option value="Books">Books</option>
              <option value="Signs">Signs</option>
              <option value="Whiskys">Whiskys</option>
              <option value="Cars">Cars</option>
              <option value="Toys">Toys</option>
              <option value="Games">Games</option>
              <option value="Postcards">Postcards</option>
              <option value="Shoes">Shoes</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Films">Films</option>
              <option value="Other">Other</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Description"
        className={styles.description}
      >
        <Form.Control
          className={styles.descriptionField}
          as="textarea"
          placeholder="Leave a comment here"
        />
      </FloatingLabel>

      <Form.Group controlId="pic">
        <Form.Label className={styles.labelImage}>Image</Form.Label>
        <Form.Control
          type="file"
          label="Upload Profile Picture"
          className={styles.image}
        />
      </Form.Group>
      <div className={styles.divButton}>
        <Button
          variant="primary"
          type="submit"
          className={styles.subBtn}
          // disabled={!formIsValid}
        >
          Add collection
        </Button>
      </div>
      <AddItem />
    </Container>
  );
}

export default CreateNewCollection;
