import { Tooltip } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import styles from "./TopItem.module.css";

function TopCollection(props) {
  return (
    <Link to={`/collection/${props.id}`} className={styles.link}>
      <Tooltip
        placement="top"
        title={
          <p
            style={{
              fontSize: 11,
              marginBottom: 0,
            }}
          >
            <FormattedMessage id="top-collection.tooltip" />
          </p>
        }
      >
        <Container fluid className={styles.container}>
          <Col xs={8} className={styles.itemName}>
            {props.name}
          </Col>
          <Col xs={4} className={styles.details}>
            <Row>
              <FormattedMessage id="top-collection.author" />:
              <span className={styles.author}>{props.author}</span>
            </Row>
          </Col>
        </Container>
      </Tooltip>
    </Link>
  );
}

export default TopCollection;
