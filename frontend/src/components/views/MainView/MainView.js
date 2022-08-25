import Container from "react-bootstrap/esm/Container";
import TheLargestCollection from "./TheLargestCollection";
import TheLatestItems from "./TheLatestItems";
import styles from "./MainView.module.css";
import TagCloudContainer from "./TagCloudContainer";

function MainView() {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.mainHeader}>
        {" "}
        <p>Create your own collection!</p>
      </div>

      <Container className={styles.topContainers}>
        <TheLatestItems xs={10} lg={5}></TheLatestItems>
        <TheLargestCollection xs={10} lg={5}></TheLargestCollection>
      </Container>
      <TagCloudContainer />
    </Container>
  );
}

export default MainView;
