import Form from "react-bootstrap/Form";
import styles from "./AdminView.module.css";

const NewUserRow = (props) => {
  const formStyles = `${styles.checkbox} checkbox`;
  // const ariaLabel = `user_${props.newUser.id}`;
  // const dateR = new Date(`${props.newUser.createdAt}`);
  // const day = `${dateR.getDate()}`.padStart(2, 0);
  // const month = `${dateR.getMonth() + 1}`.padStart(2, 0);
  // const year = dateR.getFullYear();
  // const regDate = `${day}/${month}/${year}`;
  // const dateL = new Date(props.newUser.lastLogin);
  // const dayL = `${dateL.getDate()}`.padStart(2, 0);
  // const monthL = `${dateL.getMonth() + 1}`.padStart(2, 0);
  // const yearL = dateL.getFullYear();
  // const lastLogDate = `${dayL}/${monthL}/${yearL}`;

  return (
    // <tr>
    //   <td>
    //     <Form.Check
    //       className={formStyles}
    //       type="checkbox"
    //       aria-label={ariaLabel}
    //       onChange={props.onChangeCheckbox}
    //       id={props.newUser.id}
    //     />
    //   </td>
    //   <td>{props.newUser.id}</td>
    //   <td>{props.newUser.name}</td>
    //   <td>{props.newUser.email}</td>
    //   <td>{lastLogDate}</td>
    //   <td>{regDate}</td>
    //   <td>{props.newUser.status}</td>
    // </tr>
    <tr>
      <td>
        <Form.Check
          className={formStyles}
          type="checkbox"
          // aria-label={ariaLabel}
          aria-label="user-row"
          onChange={props.onChangeCheckbox}
          id="dxfc"
        />
      </td>
      <td>dxc</td>
      <td>v</td>
      <td>v</td>
      <td>v</td>
      <td>v</td>
      <td>v</td>
      <td>No</td>
    </tr>
  );
};

export default NewUserRow;
