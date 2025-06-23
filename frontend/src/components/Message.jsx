
import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  const isSender = message?.senderId === authUser?._id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Format time using plain JS
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const messageTime = formatTime(message?.createdAt);

  return (
    <div
      ref={scroll}
      className={`flex items-end gap-2 mb-3 px-4 ${isSender ? 'justify-end' : 'justify-start'}`}
    >
      {!isSender && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" //{selectedUser?.profilePhoto}
          alt="user"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      <div className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
        isSender
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gray-200 text-black rounded-bl-none'
      }`}>
        {message?.message}
        <div className="text-[10px] text-black mt-1 text-right">
          {messageTime}
        </div>
      </div>

      {isSender && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" // {authUser?.profilePhoto}
          alt="you"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default Message;



