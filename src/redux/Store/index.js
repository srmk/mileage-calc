import { configureStore } from '@reduxjs/toolkit';
import fuelLogReducer from '../ReduxSlices/FuelLogSlice';
import currFuelPriceSlice from '../ReduxSlices/CurrFuelPriceSlices';

export const store = configureStore({
    reducer: {
        fuelLogs: fuelLogReducer,
        currFuelPrice: currFuelPriceSlice
    }
});