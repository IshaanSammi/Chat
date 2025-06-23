
import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find(user =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="w-full sm:w-72 bg-gray-800 text-white p-4 border-r border-gray-700 flex flex-col">
      {/* Search Bar */}
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
        >
          <BiSearchAlt2 className="w-5 h-5" />
        </button>
      </form>

      {/* Divider */}
      <hr className="border-gray-600 mb-4" />

      {/* Other Users List */}
      <div className="flex-1 overflow-y-auto">
        <OtherUsers />
      </div>

      {/* Logout */}
      <div className="mt-4">
        <button
          onClick={logoutHandler}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
