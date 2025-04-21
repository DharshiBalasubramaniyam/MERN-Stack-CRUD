function Filter({ filterOption, setFilterOption, todayCount, upcomingCount, overdueCount, completedCount, allCount }) {
   return (
      <div className='mb-4'>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3 mr-2 mb-2 rounded-lg border-2 border-blue-900 ${filterOption === "today" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => setFilterOption("today")}
         >
            Today ({todayCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${filterOption === "upcoming" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => setFilterOption("upcoming")}
         >
            Upcoming ({upcomingCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${filterOption === "overdue" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => setFilterOption("overdue")}
         >
            Overdue ({overdueCount || 0})
         </button>
         <button
            className={`text-xs md:text-sm py-0 px-1 md:py-1 md:px-3  mr-2 mb-2 rounded-lg border-2 border-blue-900 ${filterOption === "completed" ? "bg-blue-800 text-white" : "bg-transparent text-blue-900 hover:bg-blue-100"}`}
            onClick={() => setFilterOption("completed")}
         >
            Completed ({completedCount || 0})
         </button>
      </div>
   )
}

export default Filter;