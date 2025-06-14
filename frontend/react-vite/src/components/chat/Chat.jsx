import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { io } from 'socket.io-client';
import '../../css/chat/chat.css';
import { IoSendOutline } from "react-icons/io5";
import axios from 'axios';

function Chat({ token, role, targetUserId = null, newChat, receiveId }) {
    const [socket, setSocket] = useState(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef(null);

    // console.log({ token, role, targetUserId });

    // console.log(receiveId);

    const toggleChat = () => {
        setIsMinimized(!isMinimized);
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() && socket) {
            const message = {
                Text: input,
                to: receiveId,
                SenderID: targetUserId,
                Role: role
            };
            socket.emit('chat message', message);
            setMessages((prev) => [...prev, message]); // Hiển thị ngay
            setInput('');
        }
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            auth: { token }
        });

        setSocket(newSocket);

        // Nếu là staff, tham gia phòng của khách
        newSocket.on('connect', () => {
            // console.log("✅ Socket connected với ID:", newSocket.id);

            if (role === 'Staff' && targetUserId) {
                newSocket.emit('join room', targetUserId);
            }
        });


        // Nhận tin nhắn từ server
        newSocket.on('chat message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [token, role, targetUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const getHistoryMessage = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const res = await axios.get(`${backendUrl}/mess/history/${targetUserId}`, { withCredentials: true });

                // console.log(res.data);

                setMessages(res.data);


            } catch (err) {
                console.log(err);
                console.log("Khong lay duoc du lieu tin nhan");
            }
        };

        getHistoryMessage();
    }, []);

    useEffect(() => {
        // console.log('new chat', newChat);
        setMessages(newChat);
    }, [newChat]);

    useEffect(() => {
        setMessages([]);
    }, [targetUserId]);

    return (
        <div className="position-fixed bottom-0 end-0 m-3 chat-container" style={{ zIndex: 9999 }}>
            {isMinimized ? (
                <button
                    className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
                    style={{ width: '60px', height: '60px', fontSize: '24px' }}
                    onClick={toggleChat}
                >
                    💬
                </button>
            ) : (
                <div className="card card-container" style={{ width: '400px', height: '500px' }}>
                    <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
                        <span>Hỗ trợ khách hàng</span>
                        <button className="btn btn-sm btn-light" onClick={toggleChat}>✖</button>
                    </div>
                    <div className="card-body chat-body" style={{ height: '380px', overflowY: 'auto' }}>
                        {role == 'Customer' && <p>Xin chào! Bạn cần hỗ trợ gì?</p>}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`message ${msg.SenderID == localStorage.getItem('UserID') ? 'my-message' : 'other-message'}`}
                            >
                                {msg.Text}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                    <div className="card-footer d-flex align-items-center gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                        />
                        <button onClick={handleSend} className="send-btn btn btn-primary">
                            Gửi <IoSendOutline />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
