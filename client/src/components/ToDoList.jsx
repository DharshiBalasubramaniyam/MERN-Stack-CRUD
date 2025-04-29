import ToDoItem from './ToDoItem';
import Info from './Info';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import ToDoService from '../services/ToDoService';
import { memo } from 'react';

const ToDoList = () => {

    const { todos, loading, error } = useSelector(state => state.todo);
    const { editToDo, deleteToDo, getToDoById } = ToDoService()

    console.log(todos)

    return (
        <section className="my-4 px-3 md:px-8">
            <Filter />
            {
                loading ? (
                    <Info message="Loading..." />
                ) : (
                    todos && todos.map((todo) => {
                        return <ToDoItem todo={todo} key={todo._id} deleteToDo={deleteToDo} editToDo={editToDo} getToDoById={getToDoById} />
                    })
                )
            }
            {
                todos && todos.length === 0 && <Info message="No tasks to found!" />
            }
            {
                !loading && error && <Info message="Unable to process your request now. Please try again later!" />
            }

        </section>
    )

}


export default memo(ToDoList);