import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../API";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    console.log("UserID", userId);

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    return (
        <>
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <p>
                        {user.qualities.map((item) => (
                            <span
                                key={item._id}
                                className={"badge m-1 bg-" + item.color}
                            >
                                {item.name}
                            </span>
                        ))}
                    </p>
                    <h5>completedMeetings: {user.completedMeetings}</h5>
                    <h3>Rate: {user.rate}</h3>
                    <Link to="/users">
                        <button>Все пользователи</button>
                    </Link>
                </>
            ) : (
                `Loading`
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.object.isRequired
};

export default UserPage;
