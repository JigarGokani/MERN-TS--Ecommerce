import {configureStore} from "@reduxjs/toolkit"
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";


export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer:{
        userApi:userAPI.reducer,
        productApi:productAPI.reducer,
        orderApi:orderAPI.reducer,
        dashboardApi:dashboardApi.reducer,
        userReducer:userReducer.reducer,
        cartReducer:cartReducer.reducer,
        



    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, productAPI.middleware, orderAPI.middleware,dashboardApi.middleware),
});



export type RootState = ReturnType<typeof store.getState>;
