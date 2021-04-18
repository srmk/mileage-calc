import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Animated,
} from "react-native";
import { BottomMenuItem } from "./MenuItem";

export const TabBar = ({ state, descriptors, navigation }) => {
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;
    const [translateValue] = useState(new Animated.Value(0));
    return (
        <View style={[style.tabContainer, { width: totalWidth }]}>
            <View style={{ flexDirection: "row" }}>
                <Animated.View
                    style={[
                        style.slider,
                        {
                            transform: [{ translateX: translateValue }],
                            width: tabWidth - 20,
                        },
                    ]}
                />
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;
                    const isFocused = state.index === index;
                    const onPress = () => {
                        Animated.spring(translateValue, {
                            toValue: index * tabWidth,
                            velocity: 10,
                            useNativeDriver: true,
                        }).start();
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    }
                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ["selected"] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                            key={index}
                        >
                            <BottomMenuItem
                                iconName={label.toString()}
                                isCurrent={isFocused}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    tabContainer: {
        height: 60,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.0,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        position: "absolute",
        bottom: 0,
    },
    slider: {
        height: 5,
        position: "absolute",
        top: 0,
        left: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        width: 50
    },
});