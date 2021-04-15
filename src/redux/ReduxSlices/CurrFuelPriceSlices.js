import { createSlice } from "@reduxjs/toolkit";

const currFuelPriceSlice = createSlice({
    name: "currFuelPrice",
    initialState: {
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
    reducers: {
        getCurrFuelPrice(state, action) {
            state.fuelLogs = action.payload
        }
    }
});

export const { getCurrFuelPrice } = currFuelPriceSlice.actions

export default currFuelPriceSlice.reducer;