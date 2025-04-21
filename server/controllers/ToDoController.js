const ToDo = require("../models/ToDo");

// Protected Route Test
// authRouter.get('/protected', authenticate, (req: Request, res: Response) => {
//     console.log("protected route. user: ", (req as any).user)
//     res.json({ message: 'This is protected data' });
// });

exports.createToDo = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)

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

exports.getAllToDo = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)
        const allToDo = await ToDo.find({ user: user.id }).sort({ datetime: 1 });
        res.status(200).json({ success: true, message: allToDo });
    } catch (error) {
        next(error);
    }
};

exports.getToDoById = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)
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
        const user = req.user
        console.log(user)
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
        const user = req.user
        console.log(user)
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

exports.getToDoSummary = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)

        const todayStart = moment().startOf('day').toDate();
        const todayEnd = moment().endOf('day').toDate();

        const [todayCount, overdueCount, upcomingCount, completedCount] = await Promise.all([
            ToDo.countDocuments({
                date: { $gte: todayStart, $lte: todayEnd },
                isCompleted: false,
                ...categoryFilter
            }),
            ToDo.countDocuments({
                date: { $lt: todayStart },
                isCompleted: false,
                ...categoryFilter
            }),
            ToDo.countDocuments({
                date: { $gt: todayEnd },
                isCompleted: false,
                ...categoryFilter
            }),
            ToDo.countDocuments({
                isCompleted: true,
                ...categoryFilter
            }),
        ]);

        res.status(200).json({ success: true, message: { todayCount, overdueCount, upcomingCount, completedCount } });
    } catch (error) {
        next()
    }
}

// const express = require('express');
// const router = express.Router();
// const Task = require('../models/Task'); // your mongoose model
// const moment = require('moment');

// router.get('/todo', async (req, res) => {
//     const { type, category, pageno, pagesize } = req.query;

//     // Validate required fields
//     const validTypes = ['today', 'overdue', 'upcoming', 'completed'];
//     if (!type || !validTypes.includes(type) || !pageno || !pagesize) {
//         return res.status(400).json({ error: 'Invalid or missing query parameters.' });
//     }

//     const page = parseInt(pageno);
//     const size = parseInt(pagesize);
//     const todayStart = moment().startOf('day').toDate();
//     const todayEnd = moment().endOf('day').toDate();

//     // Base filter for category if given
//     const categoryFilter = category ? { category } : {};

//     // Type filter logic
//     let typeFilter = {};
//     switch (type) {
//         case 'today':
//             typeFilter = {
//                 date: { $gte: todayStart, $lte: todayEnd },
//                 isCompleted: false
//             };
//             break;
//         case 'overdue':
//             typeFilter = {
//                 date: { $lt: todayStart },
//                 isCompleted: false
//             };
//             break;
//         case 'upcoming':
//             typeFilter = {
//                 date: { $gt: todayEnd },
//                 isCompleted: false
//             };
//             break;
//         case 'completed':
//             typeFilter = { isCompleted: true };
//             break;
//     }

//     try {
//         // Paginated task list
//         const tasks = await Task.find({ ...typeFilter, ...categoryFilter })
//             .skip((page - 1) * size)
//             .limit(size)
//             .sort({ date: 1 });

//         // Counts
//         const [todayCount, overdueCount, upcomingCount, completedCount] = await Promise.all([
//             Task.countDocuments({
//                 date: { $gte: todayStart, $lte: todayEnd },
//                 isCompleted: false,
//                 ...categoryFilter
//             }),
//             Task.countDocuments({
//                 date: { $lt: todayStart },
//                 isCompleted: false,
//                 ...categoryFilter
//             }),
//             Task.countDocuments({
//                 date: { $gt: todayEnd },
//                 isCompleted: false,
//                 ...categoryFilter
//             }),
//             Task.countDocuments({
//                 isCompleted: true,
//                 ...categoryFilter
//             }),
//         ]);

//         res.json({
//             tasks,
//             counts: {
//                 today: todayCount,
//                 overdue: overdueCount,
//                 upcoming: upcomingCount,
//                 completed: completedCount
//             }
//         });
//     } catch (err) {
//         console.error('Error fetching todos:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

