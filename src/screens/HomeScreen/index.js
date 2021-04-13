import * as React from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Form, FormItem } from 'react-native-form-validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const formFields = {
    FuelPrice: {
        label: 'Fuel Price',
    },
    TravelKM: {
        label: 'Travel KM',
    },
    TotalFuel: {
        label: 'Total Fuel',
    },
    Mileage: {
        label: 'Mileage',
    },
    TotalFuelPrice: {
        label: 'TotalFuel Price',
    },
}

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);

        this.formRef = null;
        this.state = {
            params: {
                FuelPrice: null,
                TravelKM: null,
                TotalFuel: null,
                Mileage: null,
                TotalFuelPrice: null,
            },
            fuelEfficiency: {
                mileage: 0,
                fuelCostPerKM: 0,
                TotalFuelPrice: 0
            },
            showResult: false
        }

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit() {
        this.validate({
            name: { minlength: 3, maxlength: 7, required: true }
        });
        let submitResults = this.formRef.validate();
        console.log(submitResults);
    }

    customValidation() {
        return true;
    }

    render() {
        const { params: {
            FuelPrice,
            TravelKM,
            TotalFuel,
            Mileage,
            TotalFuelPrice,
        } } = this.state;
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Form
                        ref={(e) => this.formRef = e}
                        shouldValidate={true}
                    >
                        {
                            Object.keys(formFields).map((field) => {
                                return (
                                    <FormItem
                                        key={field}
                                        isRequired={true}
                                        validationFunction={this.customValidation.bind(this)}
                                        style={styles.fields}
                                    >
                                        <TextInput
                                            label={formFields[field].label}
                                            mode={'outlined'}
                                            underlineColor={'#000'}
                                            value={this.state[field]}
                                            style={{ backgroundColor: '#fff' }}
                                            onChangeText={text => this.setState({ [field]: text })}
                                        />
                                    </FormItem>
                                )
                            })
                        }
                    </Form>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.formSubmit}
                    >
                        <Text style={{ color: '#fff', fontSize: 20 }}>Calculate</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 60,
        backgroundColor: '#ffffff',
    },
    fields: {
        marginBottom: 20
    },
    submitBtn: {
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
});