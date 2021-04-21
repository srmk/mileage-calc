import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchDistricts = createAsyncThunk(
    "fuelPrice/fetchDistricts", async (state, thunkAPI) => {
        try {
            const response = await axios.get(`https://fuelprice-api-india.herokuapp.com/${state}/districts`);
            return await response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    });

export const fetchCurrFuelPrice = createAsyncThunk(
    "fuelPrice/fetchCurrFuelPrice", async (params, thunkAPI) => {
        try {
            const { state, district } = params;
            const url = (state && district) ? `${state}/${district}` : `${state}`;
            const response = await axios.get(`https://fuelprice-api-india.herokuapp.com/price/${url}`);
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
        Districts: [],
        fuelPriceData: {
            "district": "",
            "products": [
                {
                    "productName": "",
                    "productPrice": "",
                    "productCurrency": "",
                    "priceChange": "",
                    "priceChangeSign": ""
                },
                {
                    "productName": "",
                    "productPrice": "",
                    "productCurrency": "",
                    "priceChange": "",
                    "priceChangeSign": ""
                }
            ]
        },
        currState: 'Tamil-Nadu',
        currDistrict: 'SALEM',
        loading: true,
        error: "",
    },
    reducers: {
        getCurrFuelPrice(params, action) {
            try {
                const { state, district } = params;
                const url = (state && district) ? `${state}/${district}` : `${state}`;
                const response = axios.get(`https://fuelprice-api-india.herokuapp.com/price/${url}`);
                state.fuelPriceData = response.data[0]
            } catch (err) {
                console.error(err)
            }
        }
    },
    extraReducers: {
        // Fetch fuel price
        [fetchCurrFuelPrice.fulfilled]: (state, { meta, payload }) => {
            state.fuelPriceData = payload;
            state.loading = false;
            state.error = "";
        },
        // [fetchCurrFuelPrice.pending]: (state, { meta }) => {
        //     state.loading = true;
        // },
        [fetchCurrFuelPrice.rejected]: (state, { meta, payload, error }) => {
            state.loading = false;
            state.error = error;
        },

        // fetch District
        [fetchDistricts.fulfilled]: (state, { meta, payload }) => {
            state.Districts = payload;
            state.error = "";
        },
        // [fetchDistricts.pending]: (state, { meta }) => {
        //     state.loading = true;
        // },
        [fetchDistricts.rejected]: (state, { meta, payload, error }) => {
            state.loading = false;
            state.error = error;
        }
    }
});

export const { getCurrFuelPrice } = currFuelPriceSlice.actions

export default currFuelPriceSlice.reducer;