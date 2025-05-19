import React, { useState, useRef, useEffect, useContext } from 'react';
import { FiMaximize, FiSend, FiX, FiMinimize } from 'react-icons/fi';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { FaFacebookMessenger } from 'react-icons/fa';
import { Timestamp } from 'firebase/firestore';
import { ContextAuth } from '../../../context/AuthProvider';
import { addDocument } from '../../../services/firebaseService';
import { ChatContext } from '../../../context/ChatProvider';

function ChatBoxClient(props) {
    const [chat,setChat] = useState([]);
    const [input, setInput] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const messageEndRef = useRef(null);
    const {accountLogin} = useContext(ContextAuth);
    const chatContent = useContext(ChatContext);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
   const getChatContent = chatContent.filter(item => item.sender === accountLogin?.id);
   setChat(getChatContent);

    }, [chatContent]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        // Lưu tin nhắn vào database
        setInput("");
       await addDocument("messages", {
            sender: accountLogin.id,
            status: false,
            text: input,
            timestamp: Timestamp.now(),
            role: accountLogin.role
        });
      
    };

    if (!isOpen) {
        return (
            <div className='fixed bottom-5 right-5 z-50'>
                <button 
                    onClick={() => setIsOpen(true)}
                    className='bg-gradient-to-r from-[#50C4D3] to-[#7BE0F4] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                >
                    <FaFacebookMessenger />
                </button>
            </div>
        );
    }

    return (
        <div className='fixed bottom-5 right-5 z-50'>
            <div className={`w-[350px] ${isMinimized ? 'h-[60px]' : 'h-[450px]'} rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#50C4D3] to-[#7BE0F4] flex flex-col font-sans transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center px-5 py-3 border-b border-[#7FE9FF]/20 bg-white/20">
                    <div className="w-10 h-10 rounded-full bg-[#b5e0ff] flex items-center justify-center text-blue-800 font-semibold">
                        A
                    </div>
                    <div className="font-bold text-lg text-gray-800 ml-3">Stream Flix Support</div>
                    <div className="flex-1"></div>
                    <button 
                        className="text-xl text-gray-500 hover:text-gray-700 mr-2 transition-colors"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        {isMinimized ? <FiMaximize /> : <FiMinimize />}
                    </button>
                    <button 
                        className="text-xl text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiX />
                    </button>
                </div>

                {/* Main content */}
                {!isMinimized && (
                    <div className="flex-1 flex flex-col">
                        {/* Chat area */}
                        <div className="flex-1 flex flex-col bg-white/30">
                            <div className="overflow-y-auto h-[320px] p-4">
                                {chat.sort((a,b) => a.timestamp - b.timestamp).map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "user" ? 'justify-end' : 'justify-start'} mb-3`}
                                    >
                                        <div
                                            className={`py-2.5 px-4 rounded-2xl max-w-[280px] shadow-sm ${
                                                msg.role === "user"
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white text-gray-800'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messageEndRef} />
                            </div>
                            <form
                                onSubmit={handleSend}
                                className="flex items-center p-3 border-t border-[#7FE9FF]/20 bg-white/70"
                            >
                                <button
                                    type="button"
                                    className="text-xl text-gray-500 hover:text-blue-500 mr-2 transition-colors"
                                >
                                    <RiEmotionHappyLine />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 py-2.5 px-4 rounded-full border border-gray-300 outline-none focus:border-blue-400 text-sm transition-all"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 text-blue-500 hover:text-blue-600 p-2 transition-colors"
                                >
                                    <FiSend size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBoxClient;