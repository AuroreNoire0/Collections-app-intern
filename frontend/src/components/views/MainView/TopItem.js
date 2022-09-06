import React from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
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
            <FormattedMessage id="top-item.tooltip" />
          </p>
        }
      >
        <Container fluid className={styles.container}>
          <Col xs={6} className={styles.itemName}>
            {props.name}
          </Col>
          <Col xs={6} className={styles.details}>
            <Row>
              <FormattedMessage id="top-item.collection" />:
              <span className={styles.collectionName}>{props.collection}</span>
            </Row>
            <Row>
              <FormattedMessage id="top-item.author" />:{" "}
              <span className={styles.author}>{props.author}</span>
            </Row>
          </Col>
        </Container>
      </Tooltip>
    </Link>
  );
}

export default TopItem;
