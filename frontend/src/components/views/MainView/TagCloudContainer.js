import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TagCloud } from "react-tagcloud";
import Container from "react-bootstrap/esm/Container";
import styles from "./TagCloudContainer.module.css";
import { getTags } from "../../../actions/itemActions";

function TagCloudContainer() {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tags = async () => {
      const tags = await dispatch(getTags());
      setTags(tags);
    };
    tags();
  }, [dispatch]);

  const data = tags.map((tag) => ({ value: tag, count: 20 }));

  return (
    <Container className={styles.container}>
      <TagCloud
        minSize={10}
        maxSize={35}
        tags={data}
        className={styles.tagCloud}
        disableRandomColor
        onClick={(tag) => navigate(`/search/${tag.value}`)}
      />
    </Container>
  );
}

export default TagCloudContainer;
