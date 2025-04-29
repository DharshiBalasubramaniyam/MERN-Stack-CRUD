import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToDos, setError, setToDo, setCounts } from "../redux/features/todo";
import { api } from "../config/api.config";
import { useSearchParams } from 'react-router-dom'

function ToDoService() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const type1 = searchParams.get('type');
    const category1 = searchParams.get('category');
    const due1 = searchParams.get('due');

    const getAllToDo = async () => {
        dispatch(setLoading(true))
        await api.get(`todo/summary`, { headers: { "authorization": `bearer ${token}` }, params: { type: type1, category: category1, due: due1 } })
            .then((response) => {
                dispatch(setError(false))
                dispatch(setToDos(response.data.tasks))
                dispatch(setCounts(response.data.counts))
            })
            .catch((error) => {
                dispatch(setError(true));
                dispatch(setToDos(null))
                console.log(error)
                toast.error((error.response && error.response.data.message) || error.message)
            })
        dispatch(setLoading(false))
    }

    const getToDoById = async (id) => {
        dispatch(setLoading(true))
        await api.get(`todo/${id}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                dispatch(setError(false))
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