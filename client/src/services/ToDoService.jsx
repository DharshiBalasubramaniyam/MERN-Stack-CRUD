import { useEffect, useState } from "react";
import axios from 'axios'
import { API_BASE_URL } from "./ApiConfig";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";

function ToDoService() {
    const [allTodos, setAllToDos] = useState(null)
    const [toDo, setToDo] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { token } = useSelector((state) => state.auth)

    const getAllToDo = async () => {
        setLoading(true)
        await axios.get(`${API_BASE_URL}/all`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                setError(false)
                setAllToDos(response.data.message)
            })
            .catch((error) => {
                setError(true); setAllToDos(null)
                toast.error((error.response && error.response.data.message) || error.message)
            })
        setLoading(false)
    }

    const getToDoById = async (id) => {
        setLoading(true)
        await axios.get(`${API_BASE_URL}/${id}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                setError(false)
                setToDo(response.data.message)
            })
            .catch((error) => {
                setError(true); setToDo(null)
                toast.error((error.response && error.response.data.message) || error.message)
            })
        setLoading(false)
    }

    const addToDo = async (task, category, datetime) => {
        setLoading(true)
        await axios.post(`${API_BASE_URL}/new`, { task: task, category: category, datetime: datetime }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                setError(false)
                toast.success(response.data.message)
            })
            .catch((error) => {
                setError(true);
                toast.error((error.response && error.response.data.message) || error.message)
            })
        setLoading(false)
        getAllToDo()
    }

    const editToDo = async (id, task, category, isCompleted, datetime) => {
        setLoading(true)
        await axios.put(`${API_BASE_URL}/${id}`, { task: task, category: category, isCompleted: isCompleted, datetime: datetime }, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                setError(false)
                setToDo(null)
                toast.success(response.data.message)
            })
            .catch((error) => {
                setError(true);
                toast.error((error.response && error.response.data.message) || error.message)
            })
        setLoading(false)
        getAllToDo()
    }

    const deleteToDo = async (id) => {
        setLoading(true)
        await axios.delete(`${API_BASE_URL}/${id}`, { headers: { "authorization": `bearer ${token}` } })
            .then((response) => {
                setError(false)
                toast.success(response.data.message)
            })
            .catch((error) => {
                setError(true);
                toast.error((error.response && error.response.data.message) || error.message)
            })
        setLoading(false)
        getAllToDo()
    }

    // useEffect(() => {
    //     getAllToDo()
    // }, [token])

    return { allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo }
}

export default ToDoService;