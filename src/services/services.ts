import { Alert, Linking, PermissionsAndroid, Platform } from "react-native"
// import { BarangayResponseData } from "../interfaces/address/BarangayResponseData"
// import { CityResponseData } from "../interfaces/address/CityResponseData"
import { baseURL } from "../utils/http"
import { IS_MOCK } from "../utils/constants";
//import Geolocation from 'react-native-geolocation-service';

export const getMeasureItemData = async (id: number) => {
    if (IS_MOCK) {
            const mockResponse = require('../JSON/measureList.json');
            return mockResponse
        }
        const response = await baseURL.get(`/measures/${id}`)
    return response.data;
}
export const postMeasureForm = async (data: any) => {
    console.log("post form data request:::::",data);
    const response = await baseURL.post(`/patientFeedback`, data)
    console.log("response22222:::::",response);
    return response.data
}




// export const getAllCityByProvinceApi = async (id: number) => {
//     const response = await httpCore.get<CityResponseData>(`locations/provinces/${id}/cities`)
//     return response.data.cities
// }

// export const getAllBarangayByCityApi = async (id: number) => {
//     const response = await httpCore.get<BarangayResponseData>(`locations/cities/${id}/barangays`)
//     return response.data.barangays
// }

// export const checkUserLocationEnabled = async () => {
//     if (Platform.OS === 'ios') {
//         const auth = await Geolocation.requestAuthorization("whenInUse");
//         return auth;
        
//     } else {
//         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         return granted;
//     }
// }