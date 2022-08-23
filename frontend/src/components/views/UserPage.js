import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import CollectionMiniature from "../CollectionMiniature";
import store from "../../store";
import styles from "./UserPage.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";

function UserPage() {
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const usersDetails = await dispatch(getUserDetails(params.id));
    };
    fetchUserDetails();
  }, [dispatch, params.id]);

  useEffect(() => {
    !userDetails && setUserCollections(userDetails.user.collections);
  }, [userDetails]);

  const Content = () => {
    return (
      <>
        {" "}
        {userDetails.user.collections.length !== 0 ? (
          <>
            {" "}
            <div className={styles.title}>
              <h1> List of collections:</h1>
            </div>
            <ul className={styles.collectionList}>
              {userDetails.user.collections.map((col) => (
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
            <p> This user doesn't have any collection. </p>
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
            <h1> User: {userDetails.user.name}</h1>
            <p> Id: {userDetails.user._id}</p>
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
