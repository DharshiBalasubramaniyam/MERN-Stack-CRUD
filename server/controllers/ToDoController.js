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
        const allToDo = await ToDo.find({user: user.id}).sort({ datetime: 1 });
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


