import * as React from 'react';
import { TouchableOpacity, Animated, View, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import MileageCalculated from './MileageCalculated';
import SavedLogs from './SavedLogs';

const layout = useWindowDimensions();
const renderScene = SceneMap({
    calculated: MileageCalculated,
    saved: SavedLogs,
});

class FuelHistoryTabs extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            routes: [
                { key: 'calculated', title: 'Calculation History' },
                { key: 'saved', title: 'Refill History' },
            ]
        }
    }

    _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}
                        >
                            <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _handleIndexChange = (index) => this.setState({ index });

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={renderScene}
                onIndexChange={this._handleIndexChange.bind(this)}
                renderTabBar={this._renderTabBar.bind(this)}
                initialLayout={{ width: layout.width }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

export default FuelHistoryTabs;
