const { poolPromise, sql } = require('../database/dbConfig');

exports.categories = async () => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query("SELECT * FROM Categories ORDER BY CategoryName ASC");

        // console.log("Getting all categories");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.delCategory = async (CategoryID) => {
    try {
        const pool = await poolPromise;

        // Xóa lần lượt từng bảng có liên quan
        await pool.request()
            .input('CategoryID', sql.Int, CategoryID)
            .query(`DELETE FROM Products WHERE CategoryID = @CategoryID;`);

        const result = await pool.request()
            .input('CategoryID', sql.Int, CategoryID)
            .query(`DELETE FROM Categories WHERE CategoryID = @CategoryID;`);

        return result;
    } catch (err) {
        console.error('Error deleting category:', err);
        throw err;
    }
};

exports.addCategory = async (cateName, desc) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('CategoryName', sql.NVarChar, cateName)
            .input('Description', sql.NVarChar, desc)
            .query(`
            INSERT INTO Categories (CategoryName, Description)
            VALUES (@CategoryName, @Description);
        `);

        return result.recordset[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};