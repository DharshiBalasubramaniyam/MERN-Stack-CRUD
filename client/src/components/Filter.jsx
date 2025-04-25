import { useSelector } from "react-redux";
import { categories } from "./Categories";
import { useNavigate, useSearchParams } from 'react-router-dom'
import ToDoService from "../services/ToDoService";
import { useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaSortAlphaDown, FaSortAmountDown, FaSortAmountUp, FaSortDown, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";

function Filter() {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type');
   const category = searchParams.get('category');
   const sortOption = searchParams.get('due');
   const { todayCount, overdueCount, upcomingCount, completedCount } = useSelector(state => state.todo);
   const navigate = useNavigate();
   console.log(type, category, sortOption);
   const { getAllToDo } = ToDoService()

   const onTypeChange = (selectedType) => {
      navigate(`/?type=${selectedType}&category=${category ? category : ''}&due=${sortOption ? sortOption : 1}`)
   }

   const onCategoryChange = (selectedCategory) => {
      navigate(`/?type=${type ? type : 'today'}&category=${selectedCategory}&due=${sortOption ? sortOption : 1}`)
   }

   const onSortChange = () => {
      navigate(`/?type=${type ? type : 'today'}&category=${category ? category : ''}&due=${sortOption === "1" ? -1 : 1}`)
   }

   useEffect(() => {
      if (!type) {
         onTypeChange("today")
      } else if (!category && category !== '') {
         onCategoryChange('')
      } else if (!sortOption) {
         onSortChange()
      } else {
         getAllToDo();
      }
   }, [type, category, sortOption])

   return (
      <div className='mb-4 flex items-center justify-start gap-2 flex-wrap'>
         <select
            name="category"
            className="text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mb-2 rounded-lg border-2 border-blue-900 bg-blue-800 text-white hover:bg-blue-900"
            onChange={(e) => onCategoryChange(e.target.value)}
         >
            <option value="" selected={!category}>Category (All)</option>
            {
               categories.map(cat => {
                  return <option value={cat.name} selected={category === cat.name}>{cat.name}</option>
               })
            }
         </select>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3 mb-2 rounded-lg border-2 border-blue-900 hover:border-blue-900 bg-blue-800 text-white flex items-center gap-2`}
            onClick={onSortChange}
         > Due
            {
               sortOption==1 ? <FaSortAmountUp/> : <FaSortAmountDown />
            }
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3 mb-2 rounded-lg border-2 border-blue-900 ${(type === "today" || !type) ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("today")}
         >
            Today ({todayCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mb-2 rounded-lg border-2 border-blue-900 ${type === "upcoming" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("upcoming")}
         >
            Upcoming ({upcomingCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mb-2 rounded-lg border-2 border-blue-900 ${type === "overdue" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("overdue")}
         >
            Overdue ({overdueCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mb-2 rounded-lg border-2 border-blue-900 ${type === "completed" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => onTypeChange("completed")}
         >
            Completed ({completedCount || 0})
         </button>

      </div>
   )
}

export default Filter;