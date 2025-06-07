const { poolPromise, sql } = require('../database/dbConfig');

exports.categories = async () => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query("SELECT * FROM Categories ORDER BY CategoryName ASC");

        console.log("Getting all categories");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
}