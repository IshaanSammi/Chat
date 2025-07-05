


import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();

  const { messages } = useSelector(store => store.message);


  const formatDate = (dateStr) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";

    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className='px-4 flex-1 overflow-auto py-2'>
      {messages && messages.map((message, idx) => {
        const currDate = new Date(message?.createdAt).toDateString();
        const prevDate = idx > 0 ? new Date(messages[idx - 1].createdAt).toDateString() : null;
        const showDate = currDate !== prevDate;

        return (
          <React.Fragment key={message._id}>
            {showDate && (
              <div className="text-center text-xs text-gray-200 my-4">
                {formatDate(currDate)}
              </div>
            )}
            <Message message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Messages;
