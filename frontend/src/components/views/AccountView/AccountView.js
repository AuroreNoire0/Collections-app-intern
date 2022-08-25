import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store";
import styles from "./AccountView.module.css";
import CollectionMiniature from "../../additional/CollectionMiniature";
import MessageSnackbar from "../../additional/MessageSnackbar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { CircularProgress } from "@mui/material";
import { COLLECTION_DELETE_CLEAN } from "../../../constants/collectionConstants";

function AccountView() {
  const {
    userLogin: { userInfo },
    collectionDelete: { success, loading },
  } = store.getState();
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const collectionDelete = useSelector((state) => state.collectionDelete);

  useEffect(() => {
    setUserCollections(userLogin.userInfo.collections);
  }, [userLogin.userInfo.collections]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_DELETE_CLEAN });
      }, 5000);
    }
  }, [dispatch, success]);

  const onCreateCollHandler = () => {
    navigate("/create-collection");
  };
  const Content = () => {
    return (
      <>
        {" "}
        {userCollections.length !== 0 ? (
          <>
            {" "}
            <div className={styles.title}>
              <p> List of your collections:</p>
            </div>
            <ul className={styles.collectionList}>
              {userCollections.map((col) => (
                <CollectionMiniature
                  name={col.name}
                  description={col.description}
                  id={col._id}
                  key={col._id}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.noCollection}>
            <p> You don't have any collection. </p>
            <p> Click the button to create new unique collection! </p>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
      <MessageSnackbar open={success} message={"Collection deleted."} />
      <div className={styles.welcome}>
        <p> Hello, {userInfo.name}!</p>
        <Button
          variant="warning"
          type="button"
          onClick={onCreateCollHandler}
          className={styles.btn}
        >
          Add new collection
        </Button>
      </div>
      {loading ? (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      ) : (
        <Content />
      )}
    </Container>
  );
}

export default AccountView;
