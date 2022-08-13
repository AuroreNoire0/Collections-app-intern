import Container from "react-bootstrap/esm/Container";
import CollectionMiniature from "../CollectionMiniature";
import store from "../../store";
import styles from "./AccountView.module.css";
import { deleteCollection } from "../../actions/collectionActions";

function AccountView() {
  const {
    userLogin: { userInfo },
  } = store.getState();
  const userCollections = userInfo.collections;

  return (
    <Container>
      <div className={styles.welcome}>
        <p> Hello, {userInfo.name}!</p>
      </div>
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
