import React from "react";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../store/apiSlice";

const UserList: React.FC = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);

  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id} className="mb-2">
            {user.name} - {user.email}
            {/* <button
              onClick={() => deleteUser(user.id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
      {/* <button
        onClick={() =>
          addUser({ name: "New User", email: "newuser@example.com" })
        }
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        Add User
      </button> */}
    </div>
  );
};

export default UserList;
