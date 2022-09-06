import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import TopItem from "./TopItem";
import styles from "./TheLatestItems.module.css";
import { useEffect, useState } from "react";
import { getItems } from "../../../actions/itemActions";
import { CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";

function TheLatestItems() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [theLatestItems, setTheLatestItems] = useState([]);
  useEffect(() => {
    const topItems = async () => {
      const theLatestItems = await dispatch(getItems());
      setTheLatestItems(theLatestItems.slice(0, 5));
    };
    topItems();
  }, [dispatch]);
  return (
    <Container fluid xs={11} lg={6}>
      <div className={styles.divTitle}>
        <h1 className={styles.title}>
          <FormattedMessage id="latest-item.title" />
        </h1>
      </div>
      {items.loading && !items.items ? (
        <div className="d-flex justify-content-center align-items-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        theLatestItems.map((i) => (
          <TopItem
            name={i.name}
            author={i.author}
            collection={i.collectionName}
            key={i._id}
            id={i._id}
          />
        ))
      )}
    </Container>
  );
}

export default TheLatestItems;
