import Container from "react-bootstrap/esm/Container";

function AccountView() {
  return (
    <Container>
      <h1> Your collections:</h1>
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
