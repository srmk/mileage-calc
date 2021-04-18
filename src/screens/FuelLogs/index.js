import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Cards from '../../components/Cards';
import LottieView from 'lottie-react-native';
import empty from '../../lottie_Json/list_empty.json';
import _ from 'lodash';

const { height } = Dimensions.get('window');
class FuelLogs extends Component {
    render() {
        const { fuelLogHistory } = this.props;
        return (
            <ScrollView>
                <View style={styles.container}>
                    {!_.isEmpty(fuelLogHistory) ?
                        fuelLogHistory.map((val, i) => {
                            return (
                                <View key={`log_field_${i}`} style={styles.cardParentStyle}>
                                    <Cards style={{ padding: 15, borderRadius: 10 }}>
                                        {
                                            Object.keys(val).map((key) => {
                                                if (key === 'createdAt') {
                                                    return (
                                                        <View key={key} style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                                                            <Icon name={'time-outline'} color={'#c1c1c1'} size={22} /> 
                                                            <Paragraph style={{ marginLeft: 5 }}>{val[key]}</Paragraph>
                                                        </View>
                                                    )
                                                } else {
                                                    return (
                                                        <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Title>{key} :</Title>
                                                            <Paragraph>{val[key]}</Paragraph>
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
                        />
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: height - 80,
        paddingTop: 20,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({ fuelLogs }) => {
    const { fuelLogHistory } = fuelLogs;
    console.log(fuelLogs);
    return {
        fuelLogHistory
    }
}

export default connect(mapStateToProps)(FuelLogs);