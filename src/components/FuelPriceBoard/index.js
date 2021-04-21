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

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';
import { useDispatch } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import ModelDialog from '../ModelDialog';
import DropDownPicker from 'react-native-dropdown-picker';
import ContentPreLoader from '../ContentLoader';
import Cards from '../Cards';
import _ from 'lodash';

import { fetchCurrFuelPrice, fetchDistricts } from '../../redux/ReduxSlices/CurrFuelPriceSlices';

const { width } = Dimensions.get('window');

export default function FuelPriceBoard(props) {
    const [popup, openPopup] = useState(false);
    const [region, setRegion] = useState({ state: 'Tamil-Nadu', district: 'SALEM' });
    const { data: { fuelPriceData, States, Districts, loading } } = props;
    const dispatch = useDispatch();

    const _dropDownOptinos = (options = []) => {
        return options.map((opt) => ({ label: _.startCase(opt), value: opt }))
    }
console.log('RENDERING');
    return (
        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-between' }}>
                <Title>Current Fuel Price</Title>
                {/* <TouchableOpacity onPress={() => openPopup(true)}>
                    <Icon name={'settings'} color={'#c1c1c1'} size={25} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.priceContainer}>
                {
                    fuelPriceData?.products.map((item, i) => {
                        const padding = i === 0 ? { paddingRight: 3 } : { paddingLeft: 3 };
                        console.log('LJDFNKJDKFJASN: ', item);
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
                                    {
                                        !item.productName ? <ContentPreLoader width={120} height={120} style={styles.priceContent} /> :
                                            <View style={styles.priceContent}>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                                    <Text style={styles.preiceTitle}>{item.productPrice}</Text>
                                                    <Text>{item.productCurrency}</Text>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                                    <Paragraph>{item.productName}</Paragraph>
                                                </View>
                                                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                                                    <Paragraph>Price Change: </Paragraph>
                                                    <Paragraph style={{ color: item.priceChangeSign == '-' ? 'red' : 'green' }}>
                                                        {item.priceChangeSign} {item.priceChange || 0}
                                                    </Paragraph>
                                                </View>
                                            </View>
                                    }
                                </Cards>
                            </View>
                        )
                    })
                }
            </View>
            <ModelDialog
                showResult={popup}
                saveLog={async () => {
                    let dt = await dispatch(fetchCurrFuelPrice({
                        state: region.state,
                        district: region.district
                    }))
                    dt && openPopup(false);
                }}
                onBackdropPress={() => openPopup(false)}
                closeLog={() => openPopup(false)}
                btnLabels={{
                    ok: 'OK',
                    cancel: 'Cancel'
                }}
            >
                <View>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <Title style={{ alignSelf: 'flex-start', paddingBottom: 10 }}>State: </Title>
                        <DropDownPicker
                            items={_dropDownOptinos(States)}
                            defaultValue={region?.state}
                            searchable={true}
                            containerStyle={{ height: 40, width: '100%' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            onChangeItem={async (item) => {
                                await dispatch(fetchDistricts(item.value));
                                setRegion({ state: item.value })
                            }}
                        />
                    </View>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Title style={{ alignSelf: 'flex-start', paddingBottom: 10 }}>District: </Title>
                        <DropDownPicker
                            items={_dropDownOptinos(Districts)}
                            disabled={Districts?.length <= 0}
                            defaultValue={region?.district}
                            searchable={true}
                            containerStyle={{ height: 40, width: '100%' }}
                            itemStyle={{ justifyContent: 'flex-start' }}
                            onChangeItem={item => setRegion({ district: item.value })}
                        />
                    </View>
                </View>
            </ModelDialog>
        </View>
    )
}

const styles = StyleSheet.create({
    priceContainer: {
        // flex: 1,
        // width: width,
        // padding: 20,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 0,
        // marginBottom: 20,
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

