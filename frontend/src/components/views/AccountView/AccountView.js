import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store";
import styles from "./AccountView.module.css";
import MessageSnackbar from "../../additional/MessageSnackbar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { CircularProgress } from "@mui/material";
import { COLLECTION_DELETE_CLEAN } from "../../../constants/collectionConstants";
import CollectionCard from "../../additional/CollectionCard";
import { Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

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
              <p>
                {" "}
                <FormattedMessage id="account-view.title" />:
              </p>
            </div>
            <ul className={styles.collectionList}>
              <Row className={styles.collectionWrapper}>
                {userCollections.map((col) => (
                  <CollectionCard
                    name={col.name}
                    description={col.description}
                    id={col._id}
                    key={col._id}
                    img={col.img}
                  />
                ))}
              </Row>
            </ul>
          </>
        ) : (
          <div className={styles.noCollection}>
            <p>
              {" "}
              <FormattedMessage id="account-view.no-collection" />{" "}
            </p>
            <p>
              {" "}
              <FormattedMessage id="account-view.no-collection-create" />{" "}
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
      <MessageSnackbar
        open={success}
        message={
          <FormattedMessage id="account-view.collection-created-message" />
        }
      />
      <div className={styles.welcome}>
        <p>
          {" "}
          <FormattedMessage id="account-view.hello-message" />, {userInfo.name}!
        </p>
        <Button
          variant="warning"
          type="button"
          onClick={onCreateCollHandler}
          className={styles.btn}
        >
          <FormattedMessage id="account-view.add-collection-button" />
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
