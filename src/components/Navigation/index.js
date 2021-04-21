import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from "./TabBar";
import { useSafeArea } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import CustomMaterialMenu from '../Menu';
import { FAB } from 'react-native-paper';

import HomeScreen from '../../screens/HomeScreen';
import FuelLogs from '../../screens/FuelHistory';
import Settings from '../../screens/Settings';
import MileageCalc from '../../screens/MileageCalc';
import FuelLoger from '../../screens/FuelLoger';
import About from '../../screens/About';
import Help from '../../screens/Help';
import HowToUse from '../../screens/HowTouse';
import { navigate } from './navigation_helper';

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 60,
    },
})

export const MainTabScreens = () => {
    const [state, setState] = React.useState({ open: false });
    const Tab = createBottomTabNavigator();
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    return (
        <>
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
            <FAB.Group
                style={styles.fab}
                color={'#fff'}
                open={open}
                icon={open ? 'calculator' : 'plus'}
                actions={[
                    {
                        icon: 'history',
                        label: 'Creat new history',
                        onPress: () => navigate('FuelLoger'),
                    }
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        navigate('MileageCalc')
                    }
                }}
            />
        </>
    );
};

export const Navigation = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={({ route, navigation }) => ({
                headerRight: () => route.name === 'Home' ? (
                    <CustomMaterialMenu
                        navigation={navigation}
                        route={route}
                    />
                ) : null,
            })}
        >
            <Stack.Screen
                name="Home"
                component={MainTabScreens}
                options={{
                    title: 'Mileage Calc'
                }}
            />
            <Stack.Screen
                name="MileageCalc"
                component={MileageCalc}
                options={{
                    title: 'Mileage Calculator'
                }}
            />
            <Stack.Screen
                name="Settings"
                component={Settings}
            />
            <Stack.Screen
                name="FuelLoger"
                component={FuelLoger}
                options={{
                    title: 'Fuel Loger'
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    title: 'About Us'
                }}
            />
            <Stack.Screen
                name="Help"
                component={Help}
                options={{
                    title: 'Help / Feedback'
                }}
            />
            <Stack.Screen
                name="HowtoUse"
                component={HowToUse}
                options={{
                    title: 'How to Use?'
                }}
            />
        </Stack.Navigator>
    );
}