import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { api } from "../config/api.config";
import { setCategories } from '../redux/features/category';

function CategoryService() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const addCategory = async (newCategory) => {
        await api.post(`user/cat`, { newCategory }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                console.log(response.data)
                dispatch(setCategories(response.data.categories));
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log(error)
                toast.error((error.response && error.response.data.message) || error.message)
            })
    }

    const editCategory = async (newCategory, oldCategory) => {
        await api.put(`user/cat`, { newCategory, oldCategory }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                console.log(response.data)
                dispatch(setCategories(response.data.categories));
                toast.success(response.data.message)
            })
            .catch((error) => {
                toast.error((error.response && error.response.data.message) || error.message)
            })
    }

    const deleteCategory = async (categoryToRemove) => {
        await api.delete(`user/cat/${categoryToRemove}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setCategories(response.data.categories));
                toast.success(response.data.message)
            })
            .catch((error) => {
                toast.error((error.response && error.response.data.message) || error.message)
            })
    }

    return { addCategory, editCategory, deleteCategory }
}

export default CategoryService;