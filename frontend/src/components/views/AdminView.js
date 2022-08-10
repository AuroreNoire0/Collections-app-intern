import styles from "./AdminView.module.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "../ErrorMessage";
import { useState, useRef, useDispatch } from "react";
import NewUserRow from "./NewUserRow";

function AdminView() {
  const [users, setUsers] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(null);
  //   const dispatch = useDispatch();
  const selectAll = useRef(null);

  const btnsStyles = `${styles.actionButtons}`;

  return (
    <div>
      {/* {isLoading && <Spinner />} */}
      {/* {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : ""}
      {!isLoading && !error &&  */}
      <Container className={styles.container}>
        <div className={styles.tableToolbar}>
          <div>
            <p>Admin panel</p>
          </div>
          <div className={btnsStyles}>
            <Button variant="danger">Block</Button>{" "}
            <FontAwesomeIcon className={styles.iconLock} icon={faLockOpen} />
            <FontAwesomeIcon className={styles.iconDelete} icon={faTrashCan} />
            <FontAwesomeIcon className={styles.iconAdmin} icon={faCircleUser} />
          </div>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <Form.Check
                  className={styles.checkbox}
                  type="checkbox"
                  aria-label="sellectAll"
                  ref={selectAll}
                  // onChange={selectAllChangeHandler}
                />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Collections</th>
              <th>Registration</th>
              <th>Status</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            <NewUserRow />
          </tbody>
        </Table>
      </Container>
      {/* )} */}
    </div>
  );
}

export default AdminView;
