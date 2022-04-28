import React from "react";
import { Link } from "react-router-dom";

const UsersList = ({ id, name }) => {
  return (
    <Link key={id} to={`users/${id}`}>
      <>{name}</>
    </Link>
  );
};

export default UsersList;
