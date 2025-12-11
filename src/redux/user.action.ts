import { createAsyncThunk } from "@reduxjs/toolkit";
import {getEmployeeLoginDetails, updateEmployeeLoginDetails } from "./user.services";


export const loginDetails = createAsyncThunk(
    'user/login',
    async (data: any) => {
        return await getEmployeeLoginDetails(data);
    } 
)

export const updateLoginDetails = createAsyncThunk(
    'user/updateLogin',
    async (formData: any, {getState}: any) => {

        console.log("getState***********", getState(),formData);
         const { user } = getState(); // get state
         console.log("userdetails:::::",formData);
         return await updateEmployeeLoginDetails(formData);
        
        // formData = {...formData, userAccountId: user.data.id} // set userAccountId
        // let addressList = [...address.data];

    }
)
