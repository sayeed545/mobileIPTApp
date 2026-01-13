import { Alert, Linking, PermissionsAndroid, Platform } from "react-native"
// import { BarangayResponseData } from "../interfaces/address/BarangayResponseData"
// import { CityResponseData } from "../interfaces/address/CityResponseData"
import { baseURL } from "../utils/http"
import { IS_MOCK } from "../utils/constants";
//import Geolocation from 'react-native-geolocation-service';

export const getEmployeeLoginDetails = async (data: any) => {
    if (IS_MOCK) {
        const mockResponse = require('../JSON/userLogin.json');
        return mockResponse
    }
    const response = await baseURL.put(`/userProfiles/secure/login`, data)
    console.log("response Login:::::",response);
    return response.data
}

export const updateEmployeeLoginDetails = async (data: any) => {
    console.log("updateEmployeeLoginDetails::::::",data);
    return data;
    // const response = await baseURL.post(`/SignIn`, data)
    // console.log("response:::::",response);
    // return response.data
}
