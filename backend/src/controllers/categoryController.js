const CategoryModel = require('../model/categoryModel');

exports.categories = async (req, res) => {
    try {
        const categories = await CategoryModel.categories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.delCategory = async (req, res) => {
    try {
        // console.log(req.params);
        const CategoryID = req.params.id;
        const del = await CategoryModel.delCategory(CategoryID);
        res.json(del);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { cateName, desc } = req.body
        const addStatus = await CategoryModel.addCategory(cateName, desc);
        res.json(addStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}