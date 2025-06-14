import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/body/chatList.css';

function ConversationList({ token, onSelectConversation, handleChangeTarget, handleSetNewChat, handleSetReceiveID }) {
    const [conversations, setConversations] = useState([]);
    const [c_ID, setC_ID] = useState(null);

    const handleSelect = async (customerId) => {
        // console.log(customerId);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const staffId = localStorage.getItem('UserID');

        handleSetReceiveID(customerId);

        setC_ID(customerId);

        try {
            const res = await axios.post(`${backendUrl}/mess/claim`, { staffId, customerId }, { withCredentials: true });

            const resNewChat = await axios.get(`${backendUrl}/mess/chat`, {
                params: {
                    customerId,
                    staffId
                },
                withCredentials: true
            });
            handleSetNewChat(resNewChat.data);

            // window.location.reload();

        } catch (err) {
            console.log(err);
            console.log("Khong lay duoc du lieu tin nhan");
        }
    };

    useEffect(() => {
        const getAllUserMess = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const res = await axios.get(`${backendUrl}/mess/customers`, { withCredentials: true });

                // console.log(res.data);

                setConversations(res.data);

            } catch (err) {
                console.log(err);
                console.log("Khong lay duoc du lieu tin nhan");
            }
        };

        getAllUserMess();
    }, [token]);

    return (
        <div style={{ paddingTop: '10vh' }}>
            {conversations.map(conv => (
                <div className='customer-chat' key={conv.UserID} onClick={() => handleSelect(conv.UserID)}>
                    <strong>Khách hàng: {conv.FullName}</strong><br />
                    <span>{conv.LastMessageText}</span><br />
                    <small>🕒 {new Date(conv.LastMessageTime).toLocaleString()}</small><br />
                </div>
            ))}
            {conversations.length == 0 && <p>Hiện chưa có yêu cầu tư vấn nào!</p>}
        </div>
    );
}

export default ConversationList;
