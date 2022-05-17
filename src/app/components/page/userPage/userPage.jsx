import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import Qualities from "../../ui/qualities";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div className="m-4">
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> Изменить </button>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
