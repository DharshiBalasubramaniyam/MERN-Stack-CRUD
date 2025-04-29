// Todo request validation middleware
exports.validateToDoRequest = (type, req, res, next) => {
    const {task, category, isCompleted} = req.body;
    const errors = [];

    if (!task) {
        errors.push("Task name is required!")
    } else if (task.length < 3) {
        errors.push("Task name must be at least 3 characters long!")
    }

    if (!category) {
        errors.push("Category is required!");
    }

    if (type === "edit" && isCompleted === undefined) {
        errors.push("IsCompleted is required!")
    }else if (isCompleted !== undefined && typeof isCompleted !== 'boolean') {
        errors.push("IsCompleted must be a boolean!")
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: errors });
    }

    next();

};
