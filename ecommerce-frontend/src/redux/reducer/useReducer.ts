import { createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";


const initialState:UserReducerInitialState={
    user:null,
    loading:true,

}

export const userReducer = createSlice({
    name:"userReducer",
    initialState,
    reducers:{
        userExist:(state,action)=>{
            state.loading = false;
            state.user = action.payload;

        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
          },

    }
})

export const { userExist, userNotExist } = userReducer.actions;