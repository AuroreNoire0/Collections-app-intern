import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import CollectionMiniature from "../CollectionMiniature";
import store from "../../store";
import styles from "./AccountView.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { COLLECTION_DELETE_CLEAN } from "../../constants/collectionConstants";
import MessageSnackbar from "../MessageSnackbar";

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
