import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from "./TabBar";
import { useSafeArea } from "react-native-safe-area-context";
import { View, Button } from "react-native";
import CustomMaterialMenu from '../Menu';

import HomeScreen from '../../screens/HomeScreen';
import FuelLogs from '../../screens/FuelLogs';
import Settings from '../../screens/Settings';
import MileageCalc from '../../screens/MileageCalc';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={({ route, navigation }) => ({
                headerRight: () => (
                    <CustomMaterialMenu
                        navigation={navigation}
                        route={route}
                    />
                ),
            })}
        >
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: "Mileage Calculator",
                }}
            />
             <HomeStack.Screen
                name="MileageCalc"
                component={MileageCalc}
            />
            <HomeStack.Screen
                name="Settings"
                component={Settings}
            />
        </HomeStack.Navigator>
    );
}

const LogHistoryStack = createStackNavigator();

function LogHistoryStackScreen() {
    return (
        <LogHistoryStack.Navigator
            initialRouteName="FuelLog"
            screenOptions={({ route, navigation }) => ({
                headerRight: () => (
                    <CustomMaterialMenu
                        navigation={navigation}
                        route={route}
                    />
                ),
            })}
        >
            <LogHistoryStack.Screen
                name="MileageCalc"
                component={MileageCalc}
            />
            <LogHistoryStack.Screen
                name="FuelLog"
                component={(props) => <FuelLogs {...props} />}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: "Log History"
                }}
            />
        </LogHistoryStack.Navigator>
    );
}

export const Navigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Tab.Navigator
                tabBar={(props) => <TabBar {...props} />}
            >
                <Tab.Screen name="ios-home" component={HomeStackScreen} />
                <Tab.Screen name="ios-book" component={LogHistoryStackScreen} />
            </Tab.Navigator>
            {useSafeArea().bottom > 0 && (
                <View
                    style={{
                        height: useSafeArea().bottom - 5,
                        backgroundColor: "white",
                    }}
                />
            )}
        </View>
    );
};