import React, { useEffect, useState } from "react";
import styles from "./AdminView.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../actions/userActions";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MessageSnackbar from "../MessageSnackbar";
import { useNavigate } from "react-router-dom";

function AdminView() {
  const users = useSelector((state) => state.users);
  const userUpdate = useSelector((state) => state.userUpdate);
  const userDelete = useSelector((state) => state.userDelete);
  const userLogin = useSelector((state) => state.userLogin);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnsStyles = `${styles.actionButtons}`;

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await dispatch(getUsers());
      let userRows = [];
      usersList.map((user) =>
        userRows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status,
          admin: user.admin,
        })
      );
      setTableData(userRows);
    };
    fetchUsers();
    (!userLogin.login || userLogin.userInfo.status === "Blocked") &&
      navigate("/");
    userLogin.login && !userLogin.userInfo.admin && navigate("/account");
  }, [
    dispatch,
    userUpdate.success,
    userDelete.success,
    navigate,
    userLogin.login,
    userLogin.userInfo.admin,
    userLogin.userInfo.status,
  ]);

  const onBlockHandler = () => {
    selectedItems.forEach((i) => {
      dispatch(updateUser(i, `block`));
    });
  };

  const onUnblockHandler = () => {
    selectedItems.forEach((i) => {
      dispatch(updateUser(i, `unblock`));
    });
  };

  const onDeleteHandler = () => {
    selectedItems.forEach((i) => {
      dispatch(deleteUser(i));
    });
  };

  const onChangeAdmin = () => {
    selectedItems.forEach((i) => {
      const selectedUser = users.users.findIndex((u) => u._id === i);
      const action = users.users[selectedUser].admin
        ? "removeAdmin"
        : "addAdmin";
      dispatch(updateUser(i, action));
    });
  };

  const onRowClickHandler = (params) => {
    navigate(`/user/${params.id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 160,
    },
  ];

  return (
    <Container className={styles.container}>
      {users ? (
        <>
          <div className={styles.header}>
            <h1> Admin panel </h1>
            <div className={btnsStyles}>
              <Button variant="danger" onClick={onBlockHandler}>
                Block
              </Button>{" "}
              <FontAwesomeIcon
                className={styles.iconLock}
                icon={faLockOpen}
                onClick={onUnblockHandler}
              />
              <FontAwesomeIcon
                className={styles.iconDelete}
                icon={faTrashCan}
                onClick={onDeleteHandler}
              />
              <FontAwesomeIcon
                className={styles.iconAdmin}
                icon={faCircleUser}
                onClick={onChangeAdmin}
              />
            </div>
          </div>
          <div
            style={{
              height: 495,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {users.loading || userUpdate.loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
                onRowClick={onRowClickHandler}
                className={styles.dataGrid}
                onSelectionModelChange={(i) => setSelectedItems(i)}
                disableColumnSelector
              />
            )}
          </div>
          <MessageSnackbar
            open={false}
            severity="warning"
            message={"message"}
          />
        </>
      ) : (
        <div className={styles.progressCircle}>
          <CircularProgress color="inherit" />{" "}
        </div>
      )}
    </Container>
  );
}

export default AdminView;
