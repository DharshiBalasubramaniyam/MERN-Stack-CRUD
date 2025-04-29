import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../services/CategoryService";

function CategoryForm({ onCancel, editCategoryName }) {

    // const { addToDo, editToDo } = ToDoService()
    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState({ name: editCategoryName || "" });
    const categoryNameInput = useRef()
    const {addCategory, editCategory, deleteCategory} = CategoryService()

    useEffect(() => {
            categoryNameInput.current.focus()
    }, [])

    const clearForm = () => {
        setCategoryData(prev => {
            return { ...prev, name: "" };
        });
    }

    const handleInputChange = (name, value) => {
        setCategoryData(prev => {
            return { ...prev, [name]: value };
        });
    }

    const onAdd = async (e) => {
        e.preventDefault()
        console.log(categoryData)
        if (!categoryData.name || categoryData.name.trim() === "") {
            toast.error("Category name is required!")
            return;
        }
        await addCategory(categoryData.name)
        onCancel()
        clearForm()

    }

    const onEdit = async (e) => {
        e.preventDefault()
        console.log(categoryData)
        if (!categoryData.name || categoryData.name.trim() === "") {
            toast.error("Category name is required!")
            return;
        }
        await editCategory(categoryData.name, editCategoryName)
        clearForm()
        onCancel()
    }

    const onCancelClick = (e) => {
        e.preventDefault()
        // dispatch(setToDo(null))
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
                <h1 className="text-lg font-bold">{editCategoryName ? "Edit" : "New"} Category</h1>
                <input
                    className="flex-1 border-2 border-blue-900 text-blue-950 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    ref={categoryNameInput}
                    placeholder="Enter task"
                    name="name"
                    value={categoryData.name}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                    editCategoryName ?
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

export default CategoryForm;