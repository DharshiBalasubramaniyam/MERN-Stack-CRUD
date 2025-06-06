import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth';
import todoReducer from '../features/todo';
import categoryReducer from '../features/category';

// Create and configure the Redux store
const store = configureStore({
    reducer: {
        // Define the reducer for the 'auth' slice
        auth: authReducer,
        category: categoryReducer,
        todo: todoReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the configured store as the default export
export default store;
