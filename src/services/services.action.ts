import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeasureItemData, postMeasureForm } from "./services";



    export const getFormData = createAsyncThunk(
        'measure/items',
        async (id: number) => {
            return await getMeasureItemData(id);
        } 
    )
    
    export const postForm = createAsyncThunk(
        'measure/postForm',
        async (data: any) => {
            return await postMeasureForm(data);
        } 
    )



// export const getAllCitiesByProvince = createAsyncThunk(
//     'address/allCitiesByProvince',
//     async (provinceId: number) => {
//         return await getAllCityByProvinceApi(provinceId);
//     }
// )
// export const getAllBarangayByCity = createAsyncThunk(
//     'address/allBarangaysByCity',
//     async (cityId: number) => {
//         return await getAllBarangayByCityApi(cityId)
//     }
// )

// export const checkUserLocation  = createAsyncThunk(
//     'location/checkdevice',
//     async () => {
//         return await checkUserLocationEnabled()
//     }
// )