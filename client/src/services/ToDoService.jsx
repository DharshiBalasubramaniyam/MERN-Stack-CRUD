import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToDos, setError, setToDo } from "../redux/features/todo";
import { api } from "../config/api.config";

function ToDoService() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const getAllToDo = async () => {
        dispatch(setLoading(true))
        await api.get(`todo/all`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
                console.log(response.data.message) // i got the result here 
                dispatch(setToDos(response.data.message))
            })
            .catch((error) => {
                dispatch(setError(true)); 
                dispatch(setToDos(null))
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
    }

    const getToDoById = async (id) => {
        dispatch(setLoading(true))
        console.log("getting todo")
        await api.get(`todo/${id}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
                console.log(response.data.message)
                dispatch(setToDo(response.data.message))
            })
            .catch((error) => {
                dispatch(setError(true)); dispatch(setToDo(null))
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
    }

    const addToDo = async (task, category, datetime) => {
        dispatch(setLoading(true))
        await api.post(`todo/new`, { task: task, category: category, datetime: datetime }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
                toast.success(response.data.message)
            })
            .catch((error) => {
                dispatch(setError(true))
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
        getAllToDo()
    }

    const editToDo = async (id, task, category, isCompleted, datetime) => {
        dispatch(setLoading(true))
        await api.put(`todo/${id}`, { task: task, category: category, isCompleted: isCompleted, datetime: datetime }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
                dispatch(setToDo(null))
                toast.success(response.data.message)
            })
            .catch((error) => {
                dispatch(setError(true))
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
        getAllToDo()
    }

    const deleteToDo = async (id) => {
        dispatch(setLoading(true))
        await api.delete(`todo/${id}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
                toast.success(response.data.message)
            })
            .catch((error) => {
                dispatch(setError(true))
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
        getAllToDo()
    }

    return { getAllToDo, getToDoById, addToDo, editToDo, deleteToDo }
}

export default ToDoService;