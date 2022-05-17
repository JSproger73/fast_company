import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserEditForm from "../components/page/userEditForm";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {edit ? (
                <UserEditForm />
            ) : userId ? (
                <UserPage />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
