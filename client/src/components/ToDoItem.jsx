import { FaCheckCircle, FaCircle, FaPen, FaTrashAlt } from 'react-icons/fa';
import {
    isToday,
    isTomorrow,
    isYesterday,
    differenceInCalendarDays,
    format,
} from 'date-fns';

function ToDoItem({ todo, deleteToDo, editToDo, getToDoById }) {

    const onDelete = () => {
        deleteToDo(todo._id)
    }
    const onCheck = () => {
        editToDo(todo._id, todo.task, todo.category, !todo.isCompleted, todo.datetime)
    }
    const onEdit = () => {
        getToDoById(todo._id)
    }

    return (

        <div className="flex flex-col px-4 py-3  *:text-blue-950 items-center rounded mb-3 bg-blue-100 hover:bg-blue-200">

            <div className='flex *:text-blue-950 items-center w-full'>
                <p className='flex-1'>
                    <span className='capitalize'>{todo.task}</span>
                    <span className={`px-2 py-0 capitalize rounded-full border-2 border-yellow-700 text-yellow-700 bg-yellow-200 ml-2 text-xs`}>
                    {todo.category.charAt(0).toUpperCase() + todo.category.slice(1).toLowerCase()}
                    </span>
                </p>

                <p className='flex items-center *:p-2 *:rounded *:transition-all *:duration-100'>
                    <span className='hover:bg-blue-300' onClick={onCheck}>
                        {
                            todo.isCompleted ? (
                                <FaCheckCircle size={20} color='green' />
                            ) : (
                                <FaCircle className='border-2 border-green-600 rounded-full text-transparent' size={19} />
                            )
                        }

                    </span>
                    <span className='hover:bg-blue-300' onClick={onEdit}>
                        <FaPen size={15} color='purple' />
                    </span>
                    <span className='hover:bg-blue-300' onClick={onDelete}>
                        <FaTrashAlt size={15} color='red' />
                    </span>
                </p>
            </div>

            <div className='w-full'>
                <span className='capitalize'>{categorizeDate(todo.datetime)}</span>
            </div>

        </div>

    )

}


export default ToDoItem;

export function categorizeDate(input) {
    const date = new Date(input);
    const today = new Date();
    const diff = differenceInCalendarDays(date, today);
    const formattedDate = formatDateTime(input);
    const time = format(new Date(date), "hh:mm a")


    if (isToday(date)) return <span className='text-yellow-700'>{`Today, ${time}`}</span>;
    if (isTomorrow(date)) return <span className=''>{`Tomorrow, ${time}`}</span>;
    if (isYesterday(date)) return <span className='text-red-700'>{`Yesterday, ${time}`}</span>;

    if (diff < 0 && diff >= -7) return <span className='text-red-700'>{`${Math.abs(diff)} Days Ago`}</span>;
    if (diff > 0 && diff <= 7) return <span className=''>{`In ${diff} Days, ${time}`}</span>;
    if (diff < -7) return <span className='text-red-700'>{`Older`}</span>

    return <span className=''>{formattedDate}</span>;
}

export function formatDateTime(date) {
    return format(new Date(date), "MMM d, yyyy hh:mm a"); // e.g., Apr 20, 2025 09:15 AM
}
