import { useState } from "react";
import Header from "../components/Header";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import ToDoContext from "../contexts/ToDoContext";
import ToDoService from "../services/ToDoService";
import AddButton from "../components/AddButton";
import { useSelector } from "react-redux";

function Home() {

    // const { allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo } = ToDoService();
    const [isAdd, setIsAdd] = useState(false);
    const {todo} = useSelector(state => state.todo)

    return (
        <main className="font-AfacadFlux">
            <Header />
            <AddButton onAddClick={() => setIsAdd(!isAdd)} />
            {/* <ToDoContext.Provider value={{ allTodos, toDo, loading, error, getAllToDo, getToDoById, addToDo, editToDo, deleteToDo, setToDo }}> */}
                {(isAdd || todo) && <ToDoForm onCancel={() => setIsAdd(false)} />}
                <ToDoList />
            {/* </ToDoContext.Provider> */}
        </main>
    )

}

export default Home;