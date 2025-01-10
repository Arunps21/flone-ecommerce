import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const AllUsers = ({token}) => {
  const [user, setUser] = useState([]);

  const viewUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/viewuser`);
      if (data.success == true) {
        setUser(data.users);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeUser = async (id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/user/deleteUser/${id}`,{},{
        headers: { token },
      });
      if (data.success == true) {
        toast.success(data.msg);
        viewUsers();
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewUsers();
  }, []);

  return (
    <>
      <p className="mb-4">Registered Users</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
          <b>Action</b>
        </div>
        {user.length > 0
          ? user
              .slice()
              .reverse()
              .map((list) => (
                <div
                  className="grid grid-cols-[0.5fr_0.5fr_0.5fr] md:grid-cols-[0.5fr_0.5fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm"
                  key={list._id}
                >
                  <p>{list.name}</p>
                  <p>{list.email}</p>
                  <button
                    onClick={() => removeUser(list._id)}
                    className="py-2 bg-red-600 text-white w-28"
                  >
                    Remove User
                  </button>
                </div>
              ))
          : "No User Found"}
      </div>
    </>
  );
};

export default AllUsers;
