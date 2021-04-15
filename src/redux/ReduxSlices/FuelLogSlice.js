import { createSlice } from "@reduxjs/toolkit";

const fuelLogSlice = createSlice({
    name: "fuelLogs",
    initialState: {
        fuelLogs: [{
            mileage: '50',
            totalFuelPrcie: '200',
            fuelPricePerKM: '3.30'
        }]
    },
    reducers: {
        addingFuelLogHistory(state, action) {
            state.fuelLogs = action.payload
        }
    }
});

export const { addingFuelLogHistory } = fuelLogSlice.actions

export default fuelLogSlice.reducer;