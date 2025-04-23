import { useContext, useEffect, useRef, useState } from "react";
import { categories } from "./Categories";
import ToDoContext from "../contexts/ToDoContext";
import { useDispatch, useSelector } from "react-redux";
import ToDoService from "../services/ToDoService";
import { setToDo } from "../redux/features/todo";

function ToDoForm({ onCancel }) {

    const { todo } = useSelector(state => state.todo)
    const { addToDo, editToDo } = ToDoService()
    const dispatch = useDispatch();
    const [toDoData, setToDoData] = useState({ task: "", category: categories[0].name, datetime: getCurrentDateTime(new Date()) });
    const taskInput = useRef()

    useEffect(() => {
        if (todo) {
            setToDoData(prev => {
                return { ...prev, task: todo.task, category: todo.category, datetime: getCurrentDateTime(todo.datetime) };
            });
            taskInput.current.focus()
        }
    }, [todo])

    const clearForm = () => {
        setToDoData(prev => {
            return { ...prev, task: "", category: categories[0].name, datetime: (new Date()).toISOString().slice(0, 16) };
        });
    }

    const handleInputChange = (name, value) => {
        setToDoData(prev => {
            return { ...prev, [name]: value };
        });
    }

    const onAdd = async (e) => {
        e.preventDefault()
        console.log(toDoData)
        await addToDo(toDoData.task, toDoData.category, toDoData.datetime)
        onCancel()
        clearForm()

    }

    const onEdit = (e) => {
        e.preventDefault()
        editToDo(todo._id, toDoData.task, toDoData.category, todo.isCompleted, toDoData.datetime)
        clearForm()
    }

    const onCancelClick = (e) => {
        e.preventDefault()
        dispatch(setToDo(null))
        clearForm()
        onCancel()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <main className="bg-[rgba(0,0,0,0.5)] h-screen w-full p-2 fixed z-20 top-0 left-0 flex items-center justify-center">
            <form
                className="p-3 bg-blue-400 flex-col flex gap-4 w-full max-w-96"
                onSubmit={handleSubmit}
            >
                <h1 className="text-lg font-bold">{todo ? "Edit" : "New"} TODO</h1>
                <select
                    className="p-3 border-2 border-blue-900 text-blue-950 focus:ring-2 focus:ring-blue-500 outline-none rounded-l"
                    name="category"
                    value={toDoData.category}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                >
                    {
                        categories.map((category) => {
                            return (
                                <option
                                    value={category.name}
                                    key={category.name}
                                >
                                    {category.name}
                                </option>
                            )
                        })
                    }
                </select>
                <input
                    className="flex-1 border-2 border-blue-900 text-blue-950 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    ref={taskInput}
                    placeholder="Enter task"
                    name="task"
                    value={toDoData.task}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <input
                    className="flex-1 border-2 border-blue-900 text-blue-950 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    type="datetime-local"
                    ref={taskInput}
                    placeholder="Enter Date and time"
                    name="datetime"
                    value={toDoData.datetime}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                    todo ?
                        (
                            <div className="flex gap-2 justify-end">
                                <button
                                    className="bg-gray-500 px-6 py-3 hover:bg-gray-600 text-white focus:ring-2 focus:ring-gray-300"
                                    onClick={onCancelClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-r"
                                    onClick={onEdit}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 justify-end">
                                <button
                                    className="bg-gray-500 px-6 py-3 hover:bg-gray-600 text-white focus:ring-2 focus:ring-gray-300 rounded-sm"
                                    onClick={onCancelClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-sm"
                                    onClick={onAdd}
                                >
                                    Add
                                </button>

                            </div>
                        )
                }
            </form>
        </main>
    )
}

function getCurrentDateTime(date) {
    const input = new Date(date);

    const year = input.getFullYear();
    const month = String(input.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(input.getDate()).padStart(2, '0');
    const hours = String(input.getHours()).padStart(2, '0');
    const minutes = String(input.getMinutes()).padStart(2, '0');

    const localDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
    return localDatetime;
}

export default ToDoForm;