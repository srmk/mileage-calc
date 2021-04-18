import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const fuelLogSlice = createSlice({
    name: "fuelLogs",
    initialState: {
        fuelLogHistory: []
    },
    reducers: {
        saveFuelLogHistory(state, action) {
            state.fuelLogHistory = [
                ...state.fuelLogHistory,
                {
                    createdAt: moment().format('MM-DD-YYYY, h:mm:ss a'),
                    ...action.payload,
                }
            ]
        }
    }
});

export const { saveFuelLogHistory } = fuelLogSlice.actions

export default fuelLogSlice.reducer;