

import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef();
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onEmojiClick = (emojiData) => {
        setMessage(prev => prev + emojiData.emoji);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
                { message },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage("");
        setShowEmojiPicker(false);
    };

    // ✅ Close emoji picker on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3 relative'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSubmitHandler(e);
                        }
                    }}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white pr-10'
                />
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute inset-y-0 right-10 pr-2 text-white">
                    <FaSmile size={18} />
                </button>
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-2 text-white'>
                    <IoSend size={20} />
                </button>

                {showEmojiPicker && (
                    <div ref={pickerRef} className="absolute bottom-14 right-0 z-10">
                        <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
                    </div>
                )}
            </div>
        </form>
    );
};

export default SendInput;


