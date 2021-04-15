import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Cards from '../Cards';

const { width } = Dimensions.get('window');

export class FuelPriceBoard extends Component {
    render() {
        const { data: { products } } = this.props;
        return (
            <View style={styles.priceContainer}>
                {
                    products.map((item, i) => {
                        const padding = i === 0 ? { paddingRight: 3 } : { paddingLeft: 3 };
                        return (
                            <View
                                style={[styles.priceBoards, padding]}
                            >
                                <Cards
                                    style={{
                                        backgroundColor: '#fff',
                                    }}
                                    CardTitle={`${item.productPrice} ${item.productCurrency}`}
                                    CardSubTitle={item.productName}
                                    isIcon={false}
                                >
                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Paragraph>Price Change: {item.priceChangeSign} {item.priceChange}</Paragraph>
                                    </View>
                                </Cards>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    priceContainer: {
        flex: 1,
        width: width,
        padding: 20,
        paddingBottom: 0,
        marginBottom: 20,
        flexDirection: 'row',
    },
    priceBoards: {
        flex: 1
    }
})

export default FuelPriceBoard
