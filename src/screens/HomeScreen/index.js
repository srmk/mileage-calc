import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import FuelPriceBoard from '../../components/FuelPriceBoard';
import FuelStatistics from '../../components/FuelStatistics';
import Tips from '../../components/Tips';
import { fetchCurrFuelPrice, fetchDistricts } from '../../redux/ReduxSlices/CurrFuelPriceSlices';

const { width: screenWidth } = Dimensions.get('window');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openFab: false
        }
    }

    componentDidMount() {
        const { dispatch, currFuelPrice: { currState, currDistrict } } = this.props;
        dispatch(fetchCurrFuelPrice({
            state: currState,
            district: currDistrict
        }));
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