import { useContext, useEffect, useState } from 'react';
import ToDoItem from './ToDoItem';
import Info from './Info';
import ToDoContext from '../contexts/ToDoContext';
import { isToday, isAfter, isBefore } from 'date-fns';
import Filter from './Filter';

function ToDoList() {

    const { allTodos, getAllToDo, editToDo, deleteToDo, getToDoById, loading, error } = useContext(ToDoContext)
    const [filteredTodos, setFilteredTodos] = useState(allTodos);
    const [todayCount, setTodayCount] = useState(0);
    const [upcomingCount, setUpcomingCount] = useState(0);
    const [overdueCount, setOverdueCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [filterOption, setFilterOption] = useState("today");

    useEffect(() => {
        getAllToDo()
    }, [])

    useEffect(() => {
        let today = 0;
        let upcoming = 0;
        let overdue = 0;
        let completed = 0;
        const now = new Date();
        const filter = allTodos?.filter(task => {
            const due = new Date(task.datetime);

            if (task.isCompleted) completed++;

            if (isToday(due) && !task.isCompleted) today++;
            else if (isAfter(due, now) && !isToday(due) && !task.isCompleted) upcoming++;
            else if (isBefore(due, now) && !isToday(due) && !task.isCompleted) overdue++;

            switch (filterOption) {
                case "today":
                    return isToday(due) && !task.isCompleted;
                case "upcoming":
                    return isAfter(due, now) && !isToday(due) && !task.isCompleted;
                case "overdue":
                    return isBefore(due, now) && !isToday(due) && !task.isCompleted;
                case "completed":
                    return task.isCompleted;
                default:
                    return true; 
            }
        });
        setFilteredTodos(filter)
        setTodayCount(today);
        setUpcomingCount(upcoming);
        setOverdueCount(overdue);
        setCompletedCount(completed);
    }, [allTodos, filterOption])

    return (
        <section className="my-4 mx-8">
            <Filter 
                filterOption={filterOption} 
                setFilterOption={setFilterOption} 
                todayCount={todayCount} 
                overdueCount={overdueCount} 
                upcomingCount={upcomingCount} 
                completedCount={completedCount}
                allCount={allTodos?.length}
            />
            {
                loading ? (
                    <Info message="Loading..." />
                ) : (
                    filteredTodos && filteredTodos.map((todo) => {
                        return <ToDoItem todo={todo} key={todo._id} deleteToDo={deleteToDo} editToDo={editToDo} getToDoById={getToDoById} />
                    })
                )
            }
            {
                filteredTodos && filteredTodos.length === 0 && <Info message="No tasks to found!" />
            }
            {
                !loading && error && <Info message="Unable to process your request now. Please try again later!" />
            }

        </section>
    )

}


export default ToDoList;