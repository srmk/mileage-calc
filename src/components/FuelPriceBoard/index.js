// import React, { Component } from 'react'
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import Cards from '../Cards';

// const { width } = Dimensions.get('window');

// export class FuelPriceBoard extends Component {
//     render() {
//         const { data: { fuelPriceData } } = this.props;
//         return (
//             <View style={styles.priceContainer}>
//                 {
//                     fuelPriceData.products && fuelPriceData.products.map((item, i) => {
//                         const padding = i === 0 ? { paddingRight: 3 } : { paddingLeft: 3 };
//                         return (
//                             <View
//                                 style={[styles.priceBoards, padding]}
//                             >
//                                 <Cards
//                                     style={{
//                                         backgroundColor: '#fff',
//                                     }}
//                                     CardTitle={`${item.productPrice} ${item.productCurrency}`}
//                                     CardSubTitle={item.productName}
//                                     isIcon={false}
//                                 >
//                                     <View style={{ alignSelf: 'flex-end' }}>
//                                         <Paragraph>Price Change: {item.priceChangeSign} {item.priceChange}</Paragraph>
//                                     </View>
//                                 </Cards>
//                             </View>
//                         )
//                     })
//                 }
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     priceContainer: {
//         flex: 1,
//         width: width,
//         padding: 20,
//         paddingBottom: 0,
//         marginBottom: 20,
//         flexDirection: 'row',
//     },
//     priceBoards: {
//         flex: 1
//     }
// })

// export default FuelPriceBoard

import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Cards from '../Cards';
import { useSelector, useDispatch } from "react-redux";
// import ContentPreLoader from '../ContentLoader';
import AnimatedNumbers from '../AnimatedNumber';

import { fetchCurrFuelPrice } from '../../redux/ReduxSlices/CurrFuelPriceSlices';

const { width } = Dimensions.get('window');

export default function FuelPriceBoard(props) {
    const { data: { fuelPriceData, loading } } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrFuelPrice({ state: 'Assam', district: '' }));
    }, [dispatch]);

    return (
        <View style={styles.priceContainer}>
            {
                fuelPriceData.products && fuelPriceData.products.map((item, i) => {
                    const padding = i === 0 ? { paddingRight: 3 } : { paddingLeft: 3 };
                    return (
                        <View
                            key={item.productName}
                            style={[styles.priceBoards, padding]}
                        >
                            <Cards
                                style={{
                                    backgroundColor: '#fff',
                                }}
                            >
                                <View style={styles.priceContent}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.preiceTitle}>{item.productPrice}</Text>
                                        <Text>{item.productCurrency}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Paragraph>{item.productName}</Paragraph>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Paragraph>Price Change: {item.priceChangeSign} {item.priceChange}</Paragraph>
                                    </View>
                                </View>
                            </Cards>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    priceContainer: {
        flex: 1,
        width: width,
        padding: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        marginBottom: 20,
        flexDirection: 'row',
    },
    priceBoards: {
        flex: 1
    },
    priceContent: {
        padding: 10,
    },
    preiceTitle: {
        fontSize: 40,
        marginRight: 5
    }
})

