import Container from "react-bootstrap/esm/Container";
import Top5 from "../Items/Top5";
import TheLatestItems from "../Items/TheLatestItems";
import TagCloud from "../Items/TagCloud";
import styles from "./MainView.module.css";
import TagCloudContainer from "../Items/TagCloud";

function MainView() {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.mainHeader}>
        {" "}
        <p>Create your own collection!</p>
      </div>

      <Container className={styles.topContainers}>
        <TheLatestItems xs={10} lg={5} xl={5}></TheLatestItems>
        <Top5 xs={10} lg={5} xl={5}></Top5>
      </Container>
      <TagCloudContainer />
    </Container>
  );
}

export default MainView;
