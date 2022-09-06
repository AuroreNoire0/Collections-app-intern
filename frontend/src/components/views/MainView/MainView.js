import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./MainView.module.css";
import TheLargestCollection from "./TheLargestCollection";
import TheLatestItems from "./TheLatestItems";
import TagCloudContainer from "./TagCloudContainer";
import Container from "react-bootstrap/esm/Container";

function MainView() {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.mainHeader}>
        {" "}
        <p>
          <FormattedMessage id="main-view.header" />
        </p>
      </div>

      <Container fluid className={styles.topContainers}>
        <TheLatestItems></TheLatestItems>
        <TheLargestCollection></TheLargestCollection>
      </Container>
      <TagCloudContainer />
    </Container>
  );
}

export default MainView;
