import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Users</h1>
      <ul className="list-disc ml-5">
        {users.map(user => (
          <li key={user.id}>{user.name} (Age: {user.age})</li>
        ))}
      </ul>
    </div>
  );
}