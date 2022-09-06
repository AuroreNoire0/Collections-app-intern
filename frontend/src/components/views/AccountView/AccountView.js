import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import styles from "./AccountView.module.css";
import Container from "react-bootstrap/esm/Container";
import { Row, Button } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { COLLECTION_DELETE_CLEAN } from "../../../constants/collectionConstants";
import MessageSnackbar from "../../additional/MessageSnackbar";
import CollectionCard from "../../additional/CollectionCard";

function AccountView() {
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const collectionDelete = useSelector((state) => state.collectionDelete);

  useEffect(() => {
    userLogin &&
      userLogin.userInfo &&
      setUserCollections(userLogin.userInfo.collections);
  }, [userLogin, userLogin.userInfo]);

  useEffect(() => {
    if (collectionDelete.success) {
      setTimeout(() => {
        dispatch({ type: COLLECTION_DELETE_CLEAN });
      }, 4000);
    }
  }, [dispatch, collectionDelete.success]);

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
      {!userLogin.userInfo ? (
        <MessageSnackbar
          open={true}
          severity="error"
          message={<FormattedMessage id="all.not-allowed" />}
        />
      ) : (
        <>
          <MessageSnackbar
            open={collectionDelete.success}
            message={
              <FormattedMessage id="account-view.collection-deleted-message" />
            }
          />
          <div className={styles.welcome}>
            {userLogin.userInfo && (
              <p>
                {" "}
                <FormattedMessage id="account-view.hello-message" />,{" "}
                {userLogin.userInfo.name}!
              </p>
            )}
            <Button
              variant="warning"
              type="button"
              onClick={onCreateCollHandler}
              className={styles.btn}
            >
              <FormattedMessage id="account-view.add-collection-button" />
            </Button>
          </div>

          {collectionDelete.loading ? (
            <div className={styles.progressCircle}>
              <CircularProgress color="inherit" />{" "}
            </div>
          ) : (
            <Content />
          )}
        </>
      )}
    </Container>
  );
}

export default AccountView;
