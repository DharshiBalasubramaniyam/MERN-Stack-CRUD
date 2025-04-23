import { useSelector } from "react-redux";
import { categories } from "./Categories";
import { useNavigate, useSearchParams } from 'react-router-dom'
import ToDoService from "../services/ToDoService";
import { useEffect } from "react";

function Filter() {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type');
   const category = searchParams.get('category');
   const {todayCount, overdueCount, upcomingCount, completedCount} = useSelector(state => state.todo);
   const navigate = useNavigate();
   console.log(type, category);
   const { getAllToDo } = ToDoService()


   const onTypeChange = (selectedType) => {
      navigate(`/?type=${selectedType}&category=${category}`)
   }

   const onCategoryChange = (selectedCategory) => {
      navigate(`/?type=${type}&category=${selectedCategory}`)
   }

   useEffect(() => {
      getAllToDo();
   }, [type, category])

   return (
      <div className='mb-4'>
         <select 
            name="category" 
            className="text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 bg-transparent text-blue-900 hover:bg-blue-100"
            onChange={(e) => onCategoryChange(e.target.value)}
         >
            <option value="" selected={!category}>Category</option>
            {
               categories.map(cat => {
                  return <option value={cat.name} selected={category===cat.name}>{cat.name}</option>
               })
            }
         </select>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3 mr-2 mb-2 rounded-lg border-2 border-blue-900 ${(type === "today" || !type) ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("today")}
         >
            Today ({todayCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${type === "upcoming" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("upcoming")}
         >
            Upcoming ({upcomingCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${type === "overdue" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("overdue")}
         >
            Overdue ({overdueCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${type === "completed" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("completed")}
         >
            Completed ({completedCount || 0})
         </button>

      </div>
   )
}

export default Filter;