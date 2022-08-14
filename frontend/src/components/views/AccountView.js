import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import CollectionMiniature from "../CollectionMiniature";
import store from "../../store";
import styles from "./AccountView.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function AccountView() {
  const {
    userLogin: { userInfo },
  } = store.getState();
  const [isLoading, setIsLoading] = useState(false);
  const [userCollections, setUserCollections] = useState([]);
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    setUserCollections(userLogin.userInfo.collections);
  }, [userLogin.userInfo.collections]);

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
              <h1> List of your collections:</h1>
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
            <p> Click here to create new unique collection! </p>
          </div>
        )}
      </>
    );
  };

  return (
    <Container>
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
      {isLoading ? <CircularProgress color="secondary" /> : <Content />}
      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div> */}
    </Container>
  );
}

export default AccountView;
