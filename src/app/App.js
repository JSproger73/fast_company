import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './API';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const userIndex = users.findIndex((user) => user._id === id);
    const newUsers = [...users];
    newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
    setUsers(newUsers);
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
    </div>
  );
}

export default App;
