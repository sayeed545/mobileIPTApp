import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { profile } from '../interfaces/profile';

export interface ServicesState {
    cities: any[],
    profile: profile[]
} 
const initialState: ServicesState = {
    cities: [],
    profile: []
}
export const serviceSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
       
    }  
})
export const { reset } = serviceSlice.actions;
export default serviceSlice.reducer;