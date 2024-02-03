import {configureStore} from "@reduxjs/toolkit"
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer:{
        userApi:userAPI.reducer,
        userReducer:userReducer.reducer,


    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
})
