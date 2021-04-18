import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

// reducers
import fuelLogReducer from '../ReduxSlices/FuelLogSlice';
import currFuelPriceSlice from '../ReduxSlices/CurrFuelPriceSlices';

const reducers = combineReducers({
    fuelLogs: fuelLogReducer,
    currFuelPrice: currFuelPriceSlice
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);