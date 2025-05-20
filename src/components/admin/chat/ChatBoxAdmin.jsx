import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FiSend, FiMaximize, FiX } from 'react-icons/fi';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { ChatContext } from '../../../context/ChatProvider';
import { AccountsContext } from '../../../context/AccountsProvider';
import { getOjectById } from '../../../services/FunctionRepon';
import { addDocument, updateDocument } from '../../../services/firebaseService';


function ChatBoxAdmin({ className }) {
  const chatContent = useContext(ChatContext);
  const [userChat, setUserChat] = useState([]);
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);
  const [openChat, setOpenChat] = useState(false);
  const accounts = useContext(AccountsContext);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || !selectedUserId) return;
    setInput('');
    // Thêm tin nhắn mới vào Firestore
    await addDocument("messages", {
      text: input,
      role: "admin",
      sender: selectedUserId,
      timestamp: new Date(),
      status: false
    });


  };


  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Xử lý danh sách người dùng để chat
  useEffect(() => {
    const data = [];
    chatContent.map(item => {
      const check = data.findIndex(i => i.sender === item.sender);
      if (check === -1) {
        data.push(item);
      } else {
        if (item.timestamp > data[check].timestamp) {
          data[check] = item;
        }
      }
    })
    setUserChat(data.sort((a, b) => b.timestamp - a.timestamp));
  }, [chatContent]);

  const searchUser = userChat.filter((item) =>
    getOjectById(accounts, item.sender)?.useName?.toLowerCase().includes(search.toLowerCase())
  );

  // Lọc tin nhắn khi chọn người dùng
  useEffect(() => {
    if (selectedUserId) {
      const userMessages = chatContent.filter(msg =>
        (msg.sender === selectedUserId && msg.role === "user") ||
        (msg.sender === selectedUserId && msg.role === "admin")
      );
      setMessages(userMessages.sort((a, b) => a.timestamp - b.timestamp));
    } else {
      setMessages([]);
    }
  }, [selectedUserId, chatContent]);
  useEffect(() => {
    updateStatus();
  }, [selectedUserId, chatContent]);

  const updateStatus = async () => {
 
    const chatRef = chatContent.filter(item => item.sender === selectedUserId && item.role === "user");
    await Promise.all(chatRef.map(async (item) => {
      await updateDocument("messages", {
        ...item,
        status: true
      });
    }));
  };

  
  

  return (
    <div >
      {openChat ? (
        <FaFacebookMessenger className='fixed bottom-5 right-5 text-4xl text-blue-500 hover:text-blue-600 cursor-pointer' onClick={() => setOpenChat(false)} />
      ) : (
        <div className={`w-[600px] h-[350px] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#50C4D3] to-[#7BE0F4] flex flex-col font-sans ${className || ''}`}>
          {/* Header */}
          <div className="flex items-center px-5 py-3 border-b border-[#7FE9FF]/20">
            <div className="w-9 h-9 rounded-full bg-[#b5e0ff] flex items-center justify-center text-blue-800 font-semibold">
              A
            </div>
            <div className="font-bold text-lg text-gray-800 ml-3">Admin</div>
            <div className="flex-1"></div>
            <button className="text-xl text-gray-500 hover:text-gray-700" onClick={() => setOpenChat(true)}>
              <FiX />
            </button>
          </div>

          {/* Main content */}
          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-[235px] bg-white/50 flex flex-col">
              <div className="p-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder='Tìm kiếm'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full py-2 px-4 rounded-full border border-gray-300 outline-none focus:border-blue-400 text-sm"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {searchUser.map(user => {
                  const userAccount = getOjectById(accounts, user.sender);
                  if (!userAccount) return null;

                  return (
                    <div
                      key={user.sender}
                      onClick={() => setSelectedUserId(user.sender)}
                      className={`flex gap-3 items-center p-3 cursor-pointer transition-colors ${selectedUserId === user.sender
                        ? 'bg-blue-50/80'
                        : 'hover:bg-blue-50/40'
                        }`}
                    >
                      <img className='w-10 h-10 rounded-full' src={userAccount.imgUrl} alt="" />
                      <div>
                        <div className={`font-semibold text-gray-800`}>
                          {userAccount.useName}
                        </div>
                        <div className={user.status === false ? "text-black font-semibold" : "text-gray-500"}>
                          {user.text || "Chưa có tin nhắn"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-white/30">
              <div className="flex-1 overflow-y-auto p-4">
                {!selectedUserId ? (
                  <div className="text-gray-400 text-center mt-10">Chọn một người dùng để bắt đầu chat</div>
                ) : messages.length === 0 ? (
                  <div className="text-gray-400 text-center mt-10">Chưa có tin nhắn nào</div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "admin" ? 'justify-end' : 'justify-start'} mb-2.5 gap-2`}
                    >

                      {msg.role === "user" ? (
                        <div className='w-7 h-7 rounded-full flex items-end mt-4.5'>
                          <img src={getOjectById(accounts, msg.sender)?.imgUrl} alt="" className='w-full h-full rounded-full' />
                        </div>
                      ) : ""}
                      <div
                        className={`py-2 px-3.5 rounded-2xl max-w-[220px] shadow-sm ${msg.role === "admin"
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800'
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messageEndRef} />
              </div>
              <form
                onSubmit={handleSend}
                className="flex items-center p-3 border-t border-[#7FE9FF]/20 bg-white/70"
              >
                <button
                  type="button"
                  className="text-xl text-gray-500 hover:text-blue-500 mr-2"
                >
                  <RiEmotionHappyLine />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 py-2.5 px-3 rounded-full border border-gray-300 outline-none focus:border-blue-400 text-sm"
                />
                <button
                  type="submit"
                  className="ml-2 text-blue-500 hover:text-blue-600 p-2"
                >
                  <FiSend size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ChatBoxAdmin; 