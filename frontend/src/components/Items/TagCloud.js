import React, { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import Container from "react-bootstrap/esm/Container";
import styles from "./TagCloudContainer.module.css";
import { useDispatch } from "react-redux";
import { getTags } from "../../actions/itemActions";

function TagCloudContainer() {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const tags = async () => {
      const tags = await dispatch(getTags());
      setTags(tags);
    };
    tags();
  }, [dispatch]);

  const data = tags.map((tag) => ({ value: tag, count: 35 }));

  return (
    <Container className={styles.container}>
      <TagCloud
        minSize={15}
        maxSize={50}
        tags={data}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </Container>
  );
}

export default TagCloudContainer;
