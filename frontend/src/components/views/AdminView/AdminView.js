import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./AdminView.module.css";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLockOpen,
  faTrashCan,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MessageSnackbar from "../../additional/MessageSnackbar";
import { deleteUser, getUsers, updateUser } from "../../../actions/userActions";
import { rootId } from "../../../constants/userConstants";

function AdminView() {
  const users = useSelector((state) => state.users);
  const userUpdate = useSelector((state) => state.userUpdate);
  const userDelete = useSelector((state) => state.userDelete);
  const userLogin = useSelector((state) => state.userLogin);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const locale = localStorage.getItem("app.locale");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await dispatch(getUsers());
      let userRows = [];
      usersList.forEach((user) => {
        userRows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          status:
            user.status === "Blocked"
              ? intl.formatMessage({ id: "admin-view.blocked" })
              : intl.formatMessage({ id: "admin-view.active" }),
          admin:
            user.admin === true
              ? intl.formatMessage({ id: "admin-view.true" })
              : intl.formatMessage({ id: "admin-view.false" }),
        });
      });
      setTableData(userRows);
    };

    userLogin.login &&
      userLogin.userInfo.admin &&
      userLogin.userInfo.status === "Active" &&
      fetchUsers();
    (!userLogin.login || userLogin.userInfo.status === "Blocked") &&
      navigate("/");
    userLogin.login &&
      userLogin.userInfo &&
      !userLogin.userInfo.admin &&
      navigate("/account");
  }, [
    dispatch,
    userUpdate.success,
    userDelete.success,
    navigate,
    userLogin,
    locale,
    intl,
  ]);

  const onBlockHandler = () => {
    selectedItems.forEach((i) => {
      i !== rootId
        ? dispatch(updateUser(i, `block`))
        : setError(intl.formatMessage({ id: "admin-view.root-error" }));
    });
  };

  const onUnblockHandler = () => {
    selectedItems.forEach((i) => {
      i !== rootId
        ? dispatch(updateUser(i, `unblock`))
        : setError(intl.formatMessage({ id: "admin-view.root-error" }));
    });
  };

  const onDeleteHandler = () => {
    selectedItems.forEach((i) => {
      i !== rootId
        ? dispatch(deleteUser(i))
        : setError(intl.formatMessage({ id: "admin-view.root-error" }));
    });
  };

  const onChangeAdmin = () => {
    selectedItems.forEach((i) => {
      const selectedUser = users.users.findIndex((u) => u._id === i);
      const action = users.users[selectedUser].admin
        ? "removeAdmin"
        : "addAdmin";
      i !== rootId
        ? dispatch(updateUser(i, action))
        : setError(intl.formatMessage({ id: "admin-view.root-error" }));
    });
  };

  const closeError = () => {
    setTimeout(() => setError(""), 3000);
  };
  error && closeError();

  const onRowClickHandler = (params) => {
    params.id !== rootId && navigate(`/user/${params.id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 210,
    },
    {
      field: "name",
      headerName: intl.formatMessage({ id: "admin-view.header-name" }),
      width: 140,
    },
    {
      field: "email",
      headerName: "Email",
      width: 190,
    },
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
      <MessageSnackbar open={error !== ""} severity="error" message={error} />
      {users ? (
        <>
          <div className={styles.header}>
            <p>
              {" "}
              <FormattedMessage id="admin-view.admin-panel-title" />
            </p>
            <div className={styles.actionButtons}>
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
