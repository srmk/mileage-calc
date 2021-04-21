import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const createdAt = moment().format('MM-DD-YYYY, h:mm:ss a');
const fuelLogSlice = createSlice({
    name: "fuelLogs",
    initialState: {
        mileageCalculationHistory: [],
        fuelHistory: []
    },
    reducers: {
        saveMileageCalculationHistory(state, action) {
            state.mileageCalculationHistory = [
                ...state.mileageCalculationHistory,
                {
                    createdAt: createdAt,
                    ...action.payload,
                }
            ]
        },
        saveFuelLogHistory(state, action) {
            state.fuelHistory = [
                ...state.fuelHistory,
                {
                    createdAt: createdAt,
                    ...action.payload,
                }
            ]
        }
    }
});

export const { saveMileageCalculationHistory, saveFuelLogHistory } = fuelLogSlice.actions

export default fuelLogSlice.reducer;