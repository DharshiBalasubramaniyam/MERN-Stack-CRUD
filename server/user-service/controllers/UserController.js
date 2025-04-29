const User = require("../models/User");

exports.createCategory = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { newCategory } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            { $addToSet: { categories: newCategory.trim().toLowerCase() } },
            { new: true, select: "categories" }
        );
        res.status(201).json({ success: true, message: "Category successfully added!", categories: updatedUser.categories }); // returns []
    } catch (error) {
        next(error);
    }
};

exports.editCategory = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { newCategory, oldCategory } = req.body
        await User.updateOne(
            { _id: user.id },
            {
                $pull: { categories: oldCategory.trim().toLowerCase() },
            }
        );
        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            { $addToSet: { categories: newCategory.trim().toLowerCase() } },
            { new: true, select: "categories" }
        );
        res.status(200).json({ success: true, message: "Task successfully edited!", categories: updatedUser.categories });
    } catch (error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { categoryToRemove } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            user.id,
            { $pull: { categories: categoryToRemove.trim().toLowerCase() } },
            { new: true, select: "categories" }
        );
        res.status(200).json({ success: true, message: "Category successfully deleted!", categories: updatedUser.categories });
    } catch (error) {
        next(error);
    }
};

