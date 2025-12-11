import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginDetails, updateLoginDetails } from './user.action'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserState {
  details: {
    createdBy: string;
    legacyPatientId : string,
    emailId : string,
    _id : string,
    patientId: number,
    assignedMeasures: any
    patientName: {
        firstName: string,
        lastName:  string
    }
  }
}

const initialState: UserState = {
  details: {
    createdBy: "",
    legacyPatientId : "",
    emailId : "",
    _id : "",
    patientId : 0,
    assignedMeasures: [],
    patientName: {
      firstName: "",
      lastName: ""
    }
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginDetails.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("loginnnnnn action.payload*********************%%%%%%%%%%%%%%$$$$$$$$$$$$$$::::", action.payload)
       //AsyncStorage.setItem("ACCESSTOKEN", action.payload.token);
        return {
            ...state,
            details: action.payload
        }
    }),
    builder.addCase(updateLoginDetails.fulfilled, (state, action: PayloadAction<any>) => {
      console.log("updateLoginDetailsupdateLoginDetailsupdateLoginDetails action.payload::::", action.payload)
      return {
          ...state,
          details: action.payload
      }
    })
  
    
} 
})

// Action creators are generated for each case reducer function
export const { reset } = userSlice.actions

export default userSlice.reducer