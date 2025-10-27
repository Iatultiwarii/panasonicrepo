
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h3 className="mb-3">Registered Users</h3>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-3" key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
