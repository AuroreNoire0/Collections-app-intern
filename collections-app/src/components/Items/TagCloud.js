import { TagCloud } from "react-tagcloud";
import Container from "react-bootstrap/esm/Container";
import styles from "./TagCloudContainer.module.css";

function TagCloudContainer() {
  const data = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3f", count: 20 },
  ];
  return (
    <Container className={styles.container}>
      <TagCloud
        minSize={12}
        maxSize={50}
        tags={data}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </Container>
  );
}

export default TagCloudContainer;
