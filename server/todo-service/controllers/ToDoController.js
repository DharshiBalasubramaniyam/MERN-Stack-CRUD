const ToDo = require("../models/ToDo");
const moment = require('moment');

exports.createToDo = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { task, category, datetime } = req.body;

        const existingToDo = await ToDo.findOne({ task, datetime, category, user: user.id });

        if (existingToDo) {
            return res.status(400).json({ success: false, message: "Task already exists!" });
        }

        const data = {
            task: task,
            category: category,
            datetime: datetime,
            user: user.id
        };

        await ToDo.create(data);

        res.status(201).json({ success: true, message: "Task successfully added!" });
    } catch (error) {
        next(error);
    }
};

exports.getToDoById = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { id } = req.params;
        const toDo = await ToDo.findOne({ _id: id, user: user.id });
        if (!toDo) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }
        res.status(200).json({ success: true, message: toDo });
    } catch (error) {
        next(error);
    }
};

exports.editToDo = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { task, category, isCompleted, datetime } = req.body;
        const { id } = req.params;

        const existingToDo = await ToDo.findOne({ _id: id, user: user.id });

        if (!existingToDo) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        const data = { task, category, isCompleted, datetime };
        await ToDo.updateOne({ _id: id }, { $set: data });

        res.status(200).json({ success: true, message: "Task successfully edited!" });
    } catch (error) {
        next(error);
    }
};

exports.deleteToDo = async (req, res, next) => {
    try {
        const user = { id: req.headers['x-user-id'] };
        const { id } = req.params;
        const existingToDo = await ToDo.findOne({ _id: id, user: user.id });

        if (!existingToDo) {
            return res.status(404).json({ success: false, message: "Task not found!" });
        }

        await ToDo.deleteOne({ _id: id });

        res.status(200).json({ success: true, message: "Task successfully deleted!" });
    } catch (error) {
        next(error);
    }
};

exports.getToDoSummary = async (req, res) => {
    const user = { id: req.headers['x-user-id'] };
    console.log("user in todo service: ", user)
    const { type, category, due, pageno, pagesize } = req.query;


    const validTypes = ['today', 'overdue', 'upcoming', 'completed'];
    // if (!type || !validTypes.includes(type) || !pageno || !pagesize) {
    if (!type || !validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid or missing query parameters.' });
    }

    // const page = parseInt(pageno);
    // const size = parseInt(pagesize);
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const categoryFilter = category?.trim() ? { category } : {};

    let typeFilter = {};
    switch (type) {
        case 'today':
            typeFilter = {
                datetime: { $gte: todayStart, $lte: todayEnd },
                isCompleted: false
            };
            break;
        case 'overdue':
            typeFilter = {
                datetime: { $lt: todayStart },
                isCompleted: false
            };
            break;
        case 'upcoming':
            typeFilter = {
                datetime: { $gt: todayEnd },
                isCompleted: false
            };
            break;
        case 'completed':
            typeFilter = { isCompleted: true };
            break;
    }

    console.log({ ...typeFilter, ...categoryFilter })

    try {
        console.log("category is there")
        const sortOrder = due === '1' || due === '-1' ? parseInt(due) : 1;
        tasks = await ToDo.find({ ...typeFilter, ...categoryFilter, user: user.id })
            // .skip((page - 1) * size)
            // .limit(size)
            .sort({ datetime: sortOrder });

        const [todayCount, overdueCount, upcomingCount, completedCount] = await Promise.all([
            ToDo.countDocuments({
                datetime: { $gte: todayStart, $lte: todayEnd },
                isCompleted: false,
                user: user.id,
                ...categoryFilter
            }),
            ToDo.countDocuments({
                datetime: { $lt: todayStart },
                isCompleted: false,
                user: user.id,
                ...categoryFilter,
            }),
            ToDo.countDocuments({
                datetime: { $gt: todayEnd },
                isCompleted: false,
                user: user.id,
                ...categoryFilter
            }),
            ToDo.countDocuments({
                isCompleted: true,
                user: user.id,
                ...categoryFilter
            }),
        ]);

        res.json({
            tasks,
            counts: {
                today: todayCount,
                overdue: overdueCount,
                upcoming: upcomingCount,
                completed: completedCount
            }
        });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

