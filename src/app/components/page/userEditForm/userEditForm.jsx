import React from "react";
import { useHistory } from "react-router-dom";

const UserEditForm = ({ userId }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/users/${userId}`);
  };
  return (
    <>
      <h1>User Edit Form</h1>
      <button onClick={handleClick}>Обновить</button>
    </>
  );
};

export default UserEditForm;
