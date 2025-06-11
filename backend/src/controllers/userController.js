const UserModel = require('../model/userModel');
const path = require('path');
const xlsx = require('xlsx');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        console.log(req.user);

        const ID = req.user.UserID;
        const users = await UserModel.getUser(ID);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.delUser = async (req, res) => {
    try {
        const { UserID } = req.body;
        const del = await UserModel.delUser(UserID);
        res.json(del);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeInfor = async (req, res) => {
    try {
        const newInfor = req.body;
        const UserID = req.user.UserID;

        const change = await UserModel.changeInfor(newInfor, UserID);
        res.json(change);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeAccountInfor = async (req, res) => {
    try {
        const newInfor = req.body;
        const UserID = req.user.UserID;
        // console.log(UserID);
        // console.log(newInfor);

        const change = await UserModel.changeAccountInfor(newInfor, UserID);
        res.json(change);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changeAddress = async (req, res) => {
    try {
        const newInfor = req.body;
        const UserID = req.user.UserID;
        // console.log(UserID);
        // console.log(newInfor);

        const change = await UserModel.changeAddress(newInfor, UserID);
        res.json(change);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStaffInfor = async (req, res) => {
    try {
        const staffInfors = await UserModel.getStaffInfor();
        res.json(staffInfors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.delStaff = async (req, res) => {
    try {
        console.log(req.params);
        const staffID = req.params.id;
        const del = await UserModel.delUser(staffID);
        res.json(del);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addStaff = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const add = await UserModel.addStaff(data);

        res.json({ message: 'Import thành công', rows: add });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi import dữ liệu', error: err.message });
    }
};
