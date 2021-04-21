import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Title, Paragraph, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Cards from '../../components/Cards';
import LottieView from 'lottie-react-native';
import empty from '../../lottie_Json/list_empty.json';
import { navigate } from '../../components/Navigation/navigation_helper';
import _ from 'lodash';

const { height } = Dimensions.get('window');
class SavedHistory extends Component {
    state = {
        openFab: false
    }
    render() {
        const { fuelHistory } = this.props;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {!_.isEmpty(fuelHistory) ?
                        fuelHistory.map((val, i) => {
                            return (
                                <View key={`log_field_${i}`} style={styles.cardParentStyle}>
                                    <Cards style={{ padding: 15, borderRadius: 10 }}>
                                        {
                                            Object.keys(val).map((key) => {
                                                if (key === 'createdAt') {
                                                    return null
                                                } else {
                                                    return (
                                                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Title>{(_.startCase(key))} :</Title>
                                                            <Text> {val[key]}</Text>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }
                                    </Cards>
                                </View>
                            )
                        }) :
                        <LottieView
                            autoPlay
                            loop
                            source={empty}
                            style={styles.emptyContainer}
                        />
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // height: height-80,
        paddingTop: 20,
        marginBottom: 80,
        paddingBottom: 65
    },
    cardParentStyle: {
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        marginBottom: 5
    },
    emptyContainer: {
        height: height / 2,
        alignSelf: 'center'
    }
});

const mapStateToProps = ({ fuelLogs }) => {
    const { fuelHistory } = fuelLogs;
    return {
        fuelHistory
    }
}

export default connect(mapStateToProps)(SavedHistory);