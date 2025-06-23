
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors
          ${selectedUser?._id === user?._id
            ? 'bg-gray-200 text-gray-900'
            : 'text-white hover:bg-gray-100 hover:text-gray-900'}
        `}
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" // {user?.profilePhoto}
            alt="user-profile"
            className="w-12 h-12 rounded-full object-cover border border-gray-400"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <p className="font-medium">{user?.fullName}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-2 border-gray-700" />
    </>
  );
};

export default OtherUser;
