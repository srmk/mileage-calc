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
    const { products } = fuelPriceData;
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
                <View style={[styles.priceBoards, { paddingRight: 3 }]}>
                    <Cards style={{ backgroundColor: '#fff', }}>
                        {!products[0].productName ? <ContentPreLoader width={120} height={120} style={styles.priceContent} /> :
                            <View style={styles.priceContent}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={styles.preiceTitle}>{products[0].productPrice}</Text>
                                    <Text>{products[0].productCurrency}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Paragraph>{products[0].productName}</Paragraph>
                                </View>
                                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                                    <Paragraph>Price Change: </Paragraph>
                                    <Paragraph style={{ color: 'green' }}>
                                        {products[0].priceChangeSign} {products[0].priceChange || 0}
                                    </Paragraph>
                                </View>
                            </View>
                        }
                    </Cards>
                </View>
                <View style={[styles.priceBoards, { paddingRight: 3 }]}>
                    <Cards style={{ backgroundColor: '#fff', }}>
                        {!products[1].productName ? <ContentPreLoader width={120} height={120} style={styles.priceContent} /> :
                            <View style={styles.priceContent}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={styles.preiceTitle}>{products[1].productPrice}</Text>
                                    <Text>{products[1].productCurrency}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Paragraph>{products[1].productName}</Paragraph>
                                </View>
                                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                                    <Paragraph>Price Change: </Paragraph>
                                    <Paragraph style={{ color: 'green' }}>
                                        {products[1].priceChangeSign} {products[1].priceChange || 0}
                                    </Paragraph>
                                </View>
                            </View>
                        }
                    </Cards>
                </View>
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

