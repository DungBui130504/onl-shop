const ProductModel = require('../model/productModel');
const path = require('path');
const xlsx = require('xlsx');

exports.products = async (req, res) => {
    try {
        const userID = req.user ? req.user.UserID : null;
        const products = await ProductModel.products(userID);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.delProduct = async (req, res) => {
    try {
        console.log(req.params);
        const ProductID = req.params.id;
        const del = await ProductModel.delProduct(ProductID);
        res.json(del);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const add = await ProductModel.addProduct(data);

        res.json({ message: 'Import thành công', rows: add });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi import dữ liệu', error: err.message });
    }
};

exports.productsOfCategory = async (req, res) => {
    try {
        const products = await ProductModel.getProductByCategoriy();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.setFav = async (req, res) => {
    try {
        const ID = req.body.ID;
        const UserID = req.user.UserID;
        // console.log(ID);

        const favProducts = await ProductModel.setFavProduct(ID, UserID);
        res.json(favProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.resetFav = async (req, res) => {
    try {
        const ID = req.body.ID;
        const UserID = req.user.UserID;
        const favProducts = await ProductModel.resetFavProduct(ID, UserID);
        res.json(favProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFavProduct = async (req, res) => {
    try {
        const UserID = req.user.UserID;
        const favProducts = await ProductModel.getFavProduct(UserID);
        res.json(favProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}