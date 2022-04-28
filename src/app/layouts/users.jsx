import React /*, { useState, useEffect }*/ from "react";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";
// import api from "../API";

const Users = ({ match }) => {
    const userId = match.params.userId;

    // const [users, setUsers] = useState();

    // useEffect(() => {
    //   api.users.fetchAll().then((data) => setUsers(data));
    // }, []);

    return (
        <>
            {userId ? (
                <UserPage id={userId} /*users={users}*/ />
            ) : (
                <UsersList /*users={users}*/ />
            )}
        </>
    );
};

export default Users;
