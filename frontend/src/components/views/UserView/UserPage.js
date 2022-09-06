import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styles from "./UserPage.module.css";
import Container from "react-bootstrap/esm/Container";
import { Row } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { getUserDetails } from "../../../actions/userActions";
import CollectionCard from "../../additional/CollectionCard";

function UserPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const usersDetails = await dispatch(getUserDetails(params.id));
    };
    fetchUserDetails();
  }, [dispatch, params.id]);

  const Content = () => {
    return (
      <>
        {" "}
        {userDetails.user.collections.length !== 0 ? (
          <>
            {" "}
            <div className={styles.title}>
              <h1>
                {" "}
                <FormattedMessage id="user-page.title" />:
              </h1>
            </div>
            <ul className={styles.collectionList}>
              <Row className={styles.rowCollections}>
                {userDetails.user.collections.map((col) => (
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
              <FormattedMessage id="user-page.no-collection" />{" "}
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
      {userDetails.user && !userDetails.loading ? (
        <>
          <div className={styles.welcome}>
            <h1>
              {" "}
              <FormattedMessage id="user-page.user" />: {userDetails.user.name}
            </h1>
            <p>
              {" "}
              <FormattedMessage id="user-page.id" />: {userDetails.user._id}
            </p>
          </div>
          <Content />
        </>
      ) : (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )}
    </Container>
  );
}

export default UserPage;
