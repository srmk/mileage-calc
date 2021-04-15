import * as React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Cards from '../../components/Cards';
import FuelPriceBoard from '../../components/FuelPriceBoard';
import FuelStatistics from '../../components/FuelStatistics';
import Tips from '../../components/Tips';

const { width: screenWidth } = Dimensions.get('window');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    title: "Item 1",
                    text: "Text 1",
                },
                {
                    title: "Item 2",
                    text: "Text 2",
                },
                {
                    title: "Item 3",
                    text: "Text 3",
                },
                {
                    title: "Item 4",
                    text: "Text 4",
                },
                {
                    title: "Item 5",
                    text: "Text 5",
                },
            ]
        }
    }

    _renderItem({ item, index }) {
        return (
            <Cards
                CardTitle={item.title}
                isIcon={false}
                imgSrc={'https://picsum.photos/700'}
            >
                <Text>{item.text}</Text>
            </Cards>

        )
    }

    pagination() {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Pagination
                dotsLength={carouselItems.length}
                dotColor={'black'}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        const { currFuelPrice } = this.props;
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1, marginBottom: 100 }}>
                    <FuelPriceBoard data={currFuelPrice} />
                    <FuelStatistics />
                    <Tips />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'center'
    },
})

const mapStateToProps = ({ currFuelPrice }) => {
    return {
        currFuelPrice
    }
}

export default connect(mapStateToProps)(HomeScreen);