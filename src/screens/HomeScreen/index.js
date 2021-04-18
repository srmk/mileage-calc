import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import { FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import FuelPriceBoard from '../../components/FuelPriceBoard';
import FuelStatistics from '../../components/FuelStatistics';
import Tips from '../../components/Tips';
import { navigate } from '../../components/Navigation/navigation_helper';

const { width: screenWidth } = Dimensions.get('window');

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { currFuelPrice } = this.props;
        return (
            <>
                <ScrollView>
                    <SafeAreaView style={{ flex: 1, marginBottom: 100 }}>
                        <FuelPriceBoard data={currFuelPrice} />
                        <FuelStatistics />
                        <Tips />
                    </SafeAreaView>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    animated
                    icon="plus"
                    color="white"
                    onPress={() => navigate('MileageCalc')}
                />
            </>
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
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 60,
    },
})

const mapStateToProps = ({ currFuelPrice }) => {
    return {
        currFuelPrice
    }
}

export default connect(mapStateToProps)(HomeScreen);