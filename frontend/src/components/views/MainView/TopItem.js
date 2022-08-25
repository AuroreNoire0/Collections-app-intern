import { Tooltip } from "@mui/material";
import { style } from "@mui/system";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import styles from "./TopItem.module.css";

function TopItem(props) {
  return (
    <Link to={`/item/${props.id}`} className={styles.link}>
      <Tooltip
        placement="top"
        title={
          <p
            style={{
              fontSize: 11,
              marginBottom: 0,
            }}
          >
            Click to check this item
          </p>
        }
      >
        <Container className={styles.container}>
          <Col xs={6} className={styles.itemName}>
            {props.name}
          </Col>
          <Col xs={6} className={styles.details}>
            <Row>
              Collection:
              <span className={styles.collectionName}>{props.collection}</span>
            </Row>
            <Row>
              Author: <span className={styles.author}>{props.author}</span>
            </Row>
          </Col>
        </Container>
      </Tooltip>
    </Link>
  );
}

export default TopItem;
