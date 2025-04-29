import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   todos: [],
   todo: null,
   todayCount: 0,
   overdueCount: 0,
   upcomingCount: 0,
   completedCount: 0,
   loading: false,
   error: null
};

const todoSlice = createSlice({
    name: "todo", 
    initialState: initialState, 
    reducers: {
        setToDo(state, action) {
            state.todo = action.payload
        },
        setCounts(state, action) {
            state.todayCount = action.payload.today
            state.overdueCount = action.payload.overdue
            state.upcomingCount = action.payload.upcoming
            state.completedCount = action.payload.completed
        },
        setToDos(state, action) {
            state.todos = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})

export const { setToDo, setToDos, setLoading, setError, setCounts } = todoSlice.actions;

export default todoSlice.reducer;
