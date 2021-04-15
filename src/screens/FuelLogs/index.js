import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import Cards from '../../components/Cards';

const FuelLogHistory = [
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    },
    {
        Title: 'Card Title 1',
        subTitle: 'SubTitle 1',
        values: {
            FuelPrice: 1,
            TravelKM: 1,
            TotalFuel: 1,
            Mileage: 1,
            TotalFuelPrice: 1,
            createdAt: '21-2-2020'
        }
    }
]

export default class FuelLogs extends Component {
    constructor(props) {
        super(props);
        console.log('FUEL LOG', props);
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        FuelLogHistory.map((val) => {
                            return (
                                <View style={styles.cardParentStyle}>
                                    <Cards CardTitle="Title" isIcon CardSubTitle={'sub title'}>
                                        <Title>Card title</Title>
                                        <Paragraph>Card content</Paragraph>
                                    </Cards>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
});