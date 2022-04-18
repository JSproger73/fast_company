import React from "react";
import User from "./user";
import PropTypes from "prop-types";

function UsersTable({ users, onSort, curentSort, ...rest }) {
    const handleSort = (item) => {
        if (curentSort.iter === item) {
            onSort({
                ...curentSort,
                order: curentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")} scope="col">
                        Имя
                    </th>
                    <th scope="col">Качества</th>
                    <th
                        onClick={() => handleSort("profession.name")}
                        scope="col"
                    >
                        Профессия
                    </th>
                    <th
                        onClick={() => handleSort("completedMeetings")}
                        scope="col"
                    >
                        Встретился, раз
                    </th>
                    <th onClick={() => handleSort("rate")} scope="col">
                        Оценка
                    </th>
                    <th onClick={() => handleSort("bookmark")} scope="col">
                        Избранное
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User {...user} {...rest} key={user._id} />
                ))}
            </tbody>
        </table>
    );
}
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    rest: PropTypes.func,
    onSort: PropTypes.func,
    curentSort: PropTypes.object
};

export default UsersTable;
