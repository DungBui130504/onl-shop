const { poolPromise, sql } = require('../database/dbConfig');

//  Lấy danh sách khách hàng có tin nhắn (dành cho nhân viên)
exports.getCustomersWithMessages = async () => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            WITH RankedMessages AS (
                SELECT 
                    u.UserID,
                    u.FullName,
                    m.Text,
                    m.ReceiverID,
                    m.CreatedAt,
                    ROW_NUMBER() OVER (PARTITION BY u.UserID ORDER BY m.CreatedAt DESC) AS rn
                FROM Messages m
                JOIN Users u ON m.SenderID = u.UserID
                WHERE u.Role = 'Customer'
            )
            SELECT 
                UserID,
                FullName,
                Text,
                ReceiverID,
                CreatedAt AS LastMessageTime
            FROM RankedMessages
            WHERE rn = 1
            ORDER BY LastMessageTime DESC
        `);

        return result.recordset;
    } catch (err) {
        console.error("❌ getCustomersWithMessages error:", err);
        throw err;
    }
};


//  Lấy đoạn chat giữa nhân viên và 1 khách hàng
exports.getChatWithCustomer = async (customerId, staffId) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .input('StaffID', sql.Int, staffId)
            .query(`
                SELECT 
                    m.MessageID,
                    m.SenderID,
                    sender.FullName AS SenderName,
                    sender.Role AS SenderRole,

                    m.ReceiverID,
                    receiver.FullName AS ReceiverName,
                    receiver.Role AS ReceiverRole,

                    m.Text,
                    m.CreatedAt
                FROM Messages m
                JOIN Users sender ON m.SenderID = sender.UserID
                JOIN Users receiver ON m.ReceiverID = receiver.UserID
                WHERE 
                    (m.SenderID = @CustomerID AND m.ReceiverID = @StaffID)
                    OR
                    (m.SenderID = @StaffID AND m.ReceiverID = @CustomerID)
                ORDER BY m.CreatedAt ASC
            `);

        return result.recordset;
    } catch (err) {
        console.error("❌ getChatWithCustomer error:", err);
        throw err;
    }
};



//  Nhân viên nhận trách nhiệm tư vấn khách hàng (claim)
exports.claimMessages = async (staffId, customerId) => {
    try {
        const pool = await poolPromise;

        await pool.request()
            .input('StaffID', sql.Int, staffId)
            .input('CustomerID', sql.Int, customerId)
            .query(`
                UPDATE Messages
                SET ReceiverID = @StaffID
                WHERE ReceiverID IS NULL AND SenderID = @CustomerID
            `);
    } catch (err) {
        console.error("❌ claimMessages error:", err);
        throw err;
    }
};

// ✉️ Lưu tin nhắn mới vào DB
exports.saveMessage = async (senderId, text, receiverId = null, roomId = null) => {
    try {
        const pool = await poolPromise;

        await pool.request()
            .input('SenderID', sql.Int, senderId)
            .input('Text', sql.NVarChar(sql.MAX), text)
            .input('ReceiverID', sql.Int, receiverId)
            .input('RoomID', sql.NVarChar(50), roomId)
            .query(`
                INSERT INTO Messages (SenderID, Text, ReceiverID, RoomID)
                VALUES (@SenderID, @Text, @ReceiverID, @RoomID)
            `);
    } catch (err) {
        console.error("❌ saveMessage error:", err);
        throw err;
    }
};
