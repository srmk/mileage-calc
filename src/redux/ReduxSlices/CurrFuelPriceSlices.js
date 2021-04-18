import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchDistricts = createAsyncThunk(
    "fuelPrice/fetchDistricts", async (state, thunkAPI) => {
        try {
            const response = await axios.get(`https://fuelprice-api-india.herokuapp.com/${state}/districts`);//where you want to fetch data
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const fetchCurrFuelPrice = createAsyncThunk(
    "fuelPrice/fetchCurrFuelPrice", async (params, district, thunkAPI) => {
        try {
            const { state, district } = params;
            const url = (state && district) ? `${state}/${district}` : `${state}`;
            const response = await axios.get(`https://fuelprice-api-india.herokuapp.com/price/Assam/KOKRAJHAR`);
            console.log('DATA', );
            return await response.data[0];
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

const currFuelPriceSlice = createSlice({
    name: "currFuelPrice",
    initialState: {
        States: [
            "Andaman-&-Nicobar",
            "Andhra-Pradesh",
            "Arunachal-Pradesh",
            "Assam",
            "Bihar",
            "Chandigarh",
            "Chhatisgarh",
            "Dadra-Nagarhaveli",
            "Daman-Diu",
            "Delhi",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal-Pradesh",
            "Jammu-&-Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya-Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Pondicherry",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil-Nadu",
            "Telangana",
            "Tripura",
            "Uttar-Pradesh",
            "Uttarakhand",
            "West-Bengal"
        ],
        fuelPriceData: {
            "district": "FATEHGARH SAHIB",
            "products": [
                {
                    "productName": "Petrol",
                    "productPrice": "81.72",
                    "productCurrency": "INR",
                    "priceChange": "0.15",
                    "priceChangeSign": "-"
                },
                {
                    "productName": "Diesel",
                    "productPrice": "75.13",
                    "productCurrency": "INR",
                    "priceChange": "0.19",
                    "priceChangeSign": "-"
                }
            ]
        },
        loading: true,
        error: "",
    },
    reducers: {
        getCurrFuelPrice(state, action) {
            state.fuelLogs = action.payload
        }
    },
    extraReducers: {
        [fetchCurrFuelPrice.fulfilled]: (state, { meta, payload }) => {
            state.fuelPriceData = payload;
            state.loading = false;
            state.error = "";
        },
        [fetchCurrFuelPrice.pending]: (state, { meta }) => {
            state.loading = true;
        },
        [fetchCurrFuelPrice.rejected]: (state, { meta, payload, error }) => {
            state.loading = "fin";
            state.error = error;
        }
    }
});

export const { getCurrFuelPrice } = currFuelPriceSlice.actions

export default currFuelPriceSlice.reducer;