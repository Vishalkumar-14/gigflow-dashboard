import { useEffect, useState } from "react";

import { getUsers } from "../api/users";

interface User {
  _id: string;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] =
    useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getUsers(token);

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Users
      </h1>

      <div className="bg-slate-900 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-800"
              >
                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;