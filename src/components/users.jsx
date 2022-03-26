import React, { useState } from 'react';
import api from '../API';
import { fetchAll } from '../API/fake.api/user.api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    number = Math.abs(number) % 100;
    let num = number % 10;
    if (number > 10 && number < 20) {
      return `${number} человек тусанет с тобой сегодня`;
    }
    if (number > 1 && number < 5) {
      return `${number} человека тусанут с тобой сегодня`;
    }
    if (num === 1) {
      return `${number} человек тусанет с тобой сегодня`;
    }
    if (number === 0) {
      return `Никто с тобой не тусанет`;
    }
    return `${number} человек тусанет с тобой сегодня`;
  };

  const getBageClassesForPhrase = () => {
    let classes = 'badge fs-5 ';
    classes += users.length !== 0 ? 'bg-primary' : 'bg-danger';
    return classes;
  };

  const getBageClassesQualities = () => {
    let classes = 'badge bg-';
    classes += users.map((elem) => elem.qualities.map((elem) => typeof elem[2]));
    console.log(classes);
    return classes;
  };

  getBageClassesQualities();

  const renderTable = () => {
    return (
      users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td key={user.qualities.map((id) => id._id)}>
                  {user.qualities.map((item) => (
                    <span className={'badge m-1 bg-' + item.color} key={item._id}>
                      {item.name}
                    </span>
                  ))}
                </td>
                <td key={user.profession._id}>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  };

  return (
    <>
      <span className={getBageClassesForPhrase()}>{renderPhrase(users.length)}</span>
      {renderTable()}
    </>
  );
};

export default Users;
