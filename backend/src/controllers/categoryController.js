const CategoryModel = require('../model/categoryModel');

exports.categories = async (req, res) => {
    try {
        const categories = await CategoryModel.categories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}