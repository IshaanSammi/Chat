

import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col bg-zinc-900 rounded-md shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 bg-zinc-800 text-white px-4 py-3 border-b border-zinc-700">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" // {selectedUser?.profilePhoto}
                alt="user-profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-400"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p className="font-medium text-lg">{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages and Input */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <div className="border-t border-zinc-700">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center bg-zinc-800 h-full text-white">
          <h1 className="text-4xl font-bold mb-2">Hi, {authUser?.fullName}</h1>
          <h2 className="text-2xl">Kick off a new chat!</h2>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
