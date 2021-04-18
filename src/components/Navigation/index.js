import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from "./TabBar";
import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";
import CustomMaterialMenu from '../Menu';

import HomeScreen from '../../screens/HomeScreen';
import FuelLogs from '../../screens/FuelLogs';
import Settings from '../../screens/Settings';
import MileageCalc from '../../screens/MileageCalc';
import { Title } from "react-native-paper";

export const MainTabScreens = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Tab.Navigator
                tabBar={(props) => <TabBar {...props} />}
            >
                <Tab.Screen name="ios-home" component={HomeScreen} />
                <Tab.Screen name="ios-book" component={FuelLogs} />
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

export const Navigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
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
            <Stack.Screen
                name="Home"
                component={MainTabScreens}
                options={{
                    title: 'Mileage Calc'
                }}
            />
            <Stack.Screen name="MileageCalc" component={MileageCalc} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}