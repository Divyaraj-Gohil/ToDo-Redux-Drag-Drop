import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice.js'

export const store = configureStore({
    reducer: todoReducer
})