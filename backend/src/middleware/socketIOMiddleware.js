const { saveMessage } = require('../services/messageService');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.secret_access_token_key;

function setupSocket(io) {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        try {
            const decoded = jwt.verify(token, SECRET);
            socket.userId = decoded.UserID;
            socket.role = decoded.Role;
            next();
        } catch (err) {
            return next(new Error('Invalid token'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`✅ Socket connected: ${socket.userId} (Role: ${socket.role})`);

        // Nếu là khách hàng, join vào phòng riêng
        if (socket.role === 'Customer') {
            const userRoom = `user_${socket.userId}`;
            socket.join(userRoom);
            console.log(`📥 Customer joined room: ${userRoom}`);
        }

        // Nếu là nhân viên, join vào tất cả các phòng khách hàng đang có
        if (socket.role === 'Staff') {
            // Lấy danh sách socket đang tham gia để tìm các room bắt đầu bằng 'user_'
            const rooms = new Set();
            const sockets = await io.fetchSockets();

            sockets.forEach(s => {
                for (const room of s.rooms) {
                    if (room.startsWith('user_')) {
                        rooms.add(room);
                    }
                }
            });

            // Tham gia từng room
            for (const room of rooms) {
                socket.join(room);
                console.log(`👨‍💼 Staff joined room: ${room}`);
            }
        }

        // Khi có tin nhắn
        socket.on('chat message', async (msg) => {
            const senderId = msg.SenderID;
            const receiverId = msg.to;
            const text = msg.Text;
            let toRoom;

            if (msg.Role == 'Customer') {
                toRoom = `user_${senderId}`;
                console.log(toRoom);
            }

            if (msg.Role == 'Staff') {
                toRoom = `user_${receiverId}`;
                console.log(toRoom);
            }

            // Gửi tin nhắn tới room (không gửi lại cho người gửi)
            socket.to(toRoom).emit('chat message', {
                Text: text,
                from: senderId,
                sender: senderId,
                Role: socket.role || 'Unknown'
            });


            // Lưu tin nhắn
            try {
                await saveMessage(senderId, text, receiverId, toRoom);
            } catch (err) {
                console.error('❌ Failed to save message:', err);
            }
        });

        const clients = await io.in('user_11').fetchSockets();
        console.log('🔍 Sockets in room user_11:', clients.map(socket => socket.userId));
    });
}

module.exports = setupSocket;
