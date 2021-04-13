import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from "./TabBar";
import { useSafeArea } from "react-native-safe-area-context";
import { View, Button } from "react-native";
import CustomMaterialMenu from '../Menu';

import HomeScreen from '../../screens/HomeScreen';
import FuelLogs from '../../screens/FuelLogs';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: "Mileage Calculator",
                    headerRight: () => (
                        <CustomMaterialMenu
                            menutext="Menu"
                            menustyle={{ marginRight: 16 }}
                            textStyle={{ color: 'white' }}
                            isIcon={true}
                        />
                    ),
                }}
            />
        </HomeStack.Navigator>
    );
}

const LogHistoryStack = createStackNavigator();

function LogHistoryStackScreen() {
    return (
        <LogHistoryStack.Navigator initialRouteName="Feed">
            <LogHistoryStack.Screen
                name="FuelLog"
                component={FuelLogs}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: "Log History"
                }}
            />
        </LogHistoryStack.Navigator>
    );
}

export const BottomMenu = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Tab.Navigator
                tabBar={(props) => <TabBar {...props} />}
            >
                <Tab.Screen name="ios-calculator" component={HomeStackScreen} />
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