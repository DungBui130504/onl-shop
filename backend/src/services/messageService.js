const { poolPromise, sql } = require('../database/dbConfig');


async function saveMessage(senderId, text, receiverId = null, roomId = null) {
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
        console.error('❌ Error saving message:', err);
    }
}

async function getMessagesByUser(userId) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .query(`
                SELECT 
                    M.MessageID,
                    M.SenderID,
                    M.ReceiverID,
                    M.RoomID,
                    M.Text,
                    M.CreatedAt,
                    U.FullName AS SenderName,
                    U.Role
                FROM Messages M
                LEFT JOIN Users U ON M.SenderID = U.UserID
                WHERE M.SenderID = @UserID OR M.ReceiverID = @UserID
                ORDER BY M.CreatedAt ASC
            `);
        return result.recordset;
    } catch (err) {
        console.error('❌ Error retrieving messages:', err);
        return [];
    }
}



module.exports = {
    saveMessage,
    getMessagesByUser
};
