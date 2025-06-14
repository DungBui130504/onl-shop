const { poolPromise, sql } = require('../database/dbConfig');
exports.products = async (userID) => {
    try {
        const pool = await poolPromise;

        let result;
        if (userID) {
            result = await pool.request()
                .input('UserID', userID)
                .query(`
                    SELECT 
                        p.*,
                        CASE 
                            WHEN uf.UserID IS NOT NULL THEN 1 
                            ELSE 0 
                        END AS isFav
                    FROM Products p
                    LEFT JOIN UserFavorites uf
                        ON p.ProductID = uf.ProductID AND uf.UserID = @UserID;
                `);
        } else {
            result = await pool.request()
                .query(`SELECT * FROM Products`);
        }

        // console.log("Getting all products");
        return result.recordset;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.delProduct = async (ProductID) => {
    try {
        const pool = await poolPromise;

        console.log('Deleting related records before deleting product...');

        // Xóa lần lượt từng bảng có liên quan
        await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(`DELETE FROM OrderDetails WHERE ProductID = @ProductID`);

        await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(`DELETE FROM UserFavorites WHERE ProductID = @ProductID`);

        await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(`DELETE FROM Cart WHERE ProductID = @ProductID`);

        const result = await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(`DELETE FROM Products WHERE ProductID = @ProductID`);

        return result;
    } catch (err) {
        console.error('Error deleting product:', err);
        throw err;
    }
};

exports.addProduct = async (data) => {
    try {
        const pool = await poolPromise;
        let insertedCount = 0;


        for (let row of data) {
            const { CategoryID, ProductName, Description, Price, ImageUrl } = row;

            await pool.request()
                .input('CategoryID', sql.Int, CategoryID)
                .input('ProductName', sql.NVarChar(100), ProductName)
                .input('Description', sql.NVarChar(sql.MAX), Description)
                .input('Price', sql.Decimal(18, 2), Price)
                .input('ImageUrl', sql.NVarChar(255), ImageUrl)
                .query(`
                INSERT INTO Products (CategoryID, ProductName, Description, Price, ImageUrl)
                VALUES (@CategoryID, @ProductName, @Description, @Price, @ImageUrl)
            `);

            insertedCount++;
        }

        return insertedCount;
    } catch (err) {
        console.error('Lỗi khi thêm sản phẩm:', err);
        throw err;
    }
};


exports.getProductByCategoriy = async (ID) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("CategoryID", sql.Int, ID)
            .query("select * from products join Categories on Products.CategoryID = Categories.CategoryID where Categories.CategoryID = @CatagoryID");

        // console.log("Getting products from category");
        return result.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

exports.setFavProduct = async (ID, UserID) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("ProductID", sql.Int, ID)
            .input("UserID", sql.Int, UserID)
            .query(`
                INSERT INTO UserFavorites (UserID, ProductID)
                VALUES (@UserID, @ProductID);
            `);

        // console.log("Set favorite products from products");
        return result.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

exports.resetFavProduct = async (ID, UserID) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("ProductID", sql.Int, ID)
            .input("UserID", sql.Int, UserID)
            .query(`
                DELETE FROM UserFavorites
                WHERE UserID = @UserID AND ProductID = @ProductID;
            `);

        // console.log("Reset favorite products from products");
        return result.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getFavProduct = async (UserID) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("UserID", sql.Int, UserID)
            .query(`
            SELECT p.*
            FROM Products p
            INNER JOIN UserFavorites uf ON p.ProductID = uf.ProductID
            WHERE uf.UserID = @UserID;
            `);

        // console.log("Getting favorite products");
        return result.recordset;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}