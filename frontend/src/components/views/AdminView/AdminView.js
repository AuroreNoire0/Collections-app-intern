import React, { useEffect, useState } from "react";
import styles from "./AdminView.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../../../actions/userActions";
import { CircularProgress, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

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
    (!userLogin.login ||
      userLogin.userInfo.status === "Blocked" ||
      userLogin.userInfo.status === "Zablokowany") &&
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
    {
      field: "id",
      headerName: <FormattedMessage id="admin-view.header-id" />,
      width: 210,
    },
    {
      field: "name",
      headerName: <FormattedMessage id="admin-view.header-name" />,
      width: 140,
    },
    {
      field: "email",
      headerName: <FormattedMessage id="admin-view.header-email" />,
      width: 190,
    },
    {
      field: "status",
      headerName: <FormattedMessage id="admin-view.header-status" />,
      width: 160,
    },
    {
      field: "admin",
      headerName: <FormattedMessage id="admin-view.header-admin" />,
      width: 160,
    },
  ];

  return (
    <Container className={styles.container}>
      {users ? (
        <>
          <div className={styles.header}>
            <p>
              {" "}
              <FormattedMessage id="admin-view.admin-panel-title" />
            </p>
            <div className={btnsStyles}>
              <Button variant="danger" onClick={onBlockHandler}>
                <FormattedMessage id="admin-view.block-button" />
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
              <Tooltip
                className={styles.tooltip}
                title={
                  <p
                    style={{
                      fontSize: 11,
                      marginBottom: 0,
                    }}
                  >
                    <FormattedMessage id="admin-view.tooltip-admin" />
                  </p>
                }
              >
                <FontAwesomeIcon
                  className={styles.iconAdmin}
                  icon={faCircleUser}
                  onClick={onChangeAdmin}
                />
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              height: 440,
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
                pageSize={6}
                rowsPerPageOptions={[6]}
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
