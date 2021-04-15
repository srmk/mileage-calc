/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import React from 'react';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const MileageCalc = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => MileageCalc);
