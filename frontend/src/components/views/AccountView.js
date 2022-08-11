import Container from "react-bootstrap/esm/Container";
import CollectionMiniature from "../CollectionMiniature";
import styles from "./AccountView.module.css";

function AccountView() {
  return (
    <Container>
      <div className={styles.welcome}>
        <p> Hello, user!</p>
      </div>
      <div className={styles.title}>
        <h1> List of your collections:</h1>
      </div>
      <ul className={styles.collectionList}>
        <CollectionMiniature />
      </ul>

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
