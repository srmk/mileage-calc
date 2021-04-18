// import * as React from 'react';
// import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { Form, FormItem } from 'react-native-form-validation';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const formFields = {
//     FuelPrice: {
//         label: 'Fuel Price',
//     },
//     TravelKM: {
//         label: 'Travel KM',
//     },
//     TotalFuel: {
//         label: 'Total Fuel',
//     },
//     Mileage: {
//         label: 'Mileage',
//     },
//     TotalFuelPrice: {
//         label: 'TotalFuel Price',
//     },
// }

// export default class MyComponent extends React.Component {

//     constructor(props) {
//         super(props);

//         this.formRef = null;
//         this.state = {
//             params: {
//                 FuelPrice: null,
//                 TravelKM: null,
//                 TotalFuel: null,
//                 Mileage: null,
//                 TotalFuelPrice: null,
//             },
//             fuelEfficiency: {
//                 mileage: 0,
//                 fuelCostPerKM: 0,
//                 TotalFuelPrice: 0
//             },
//             showResult: false
//         }

//         this.formSubmit = this.formSubmit.bind(this);
//     }

//     formSubmit() {
//         this.validate({
//             name: { minlength: 3, maxlength: 7, required: true }
//         });
//         let submitResults = this.formRef.validate();
//         console.log(submitResults);
//     }

//     customValidation() {
//         return true;
//     }

//     render() {
//         const { params: {
//             FuelPrice,
//             TravelKM,
//             TotalFuel,
//             Mileage,
//             TotalFuelPrice,
//         } } = this.state;
//         return (
//             <KeyboardAwareScrollView>
//                 <View style={styles.container}>
//                     <Form
//                         ref={(e) => this.formRef = e}
//                         shouldValidate={true}
//                     >
//                         {
//                             Object.keys(formFields).map((field) => {
//                                 return (
//                                     <FormItem
//                                         key={field}
//                                         isRequired={true}
//                                         validationFunction={this.customValidation.bind(this)}
//                                         style={styles.fields}
//                                     >
//                                         <TextInput
//                                             label={formFields[field].label}
//                                             mode={'outlined'}
//                                             underlineColor={'#000'}
//                                             value={this.state[field]}
//                                             style={{ backgroundColor: '#fff' }}
//                                             onChangeText={text => this.setState({ [field]: text })}
//                                         />
//                                     </FormItem>
//                                 )
//                             })
//                         }
//                     </Form>
//                     <TouchableOpacity
//                         style={styles.submitBtn}
//                         onPress={this.formSubmit}
//                     >
//                         <Text style={{ color: '#fff', fontSize: 20 }}>Calculate</Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAwareScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         padding: 20,
//         paddingBottom: 60,
//         backgroundColor: '#ffffff',
//     },
//     fields: {
//         marginBottom: 20
//     },
//     submitBtn: {
//         height: 50,
//         marginTop: 10,
//         marginBottom: 30,
//         borderRadius: 30,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black'
//     }
// });

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import t from 'tcomb-form-native';
import { connect } from "react-redux";
import { TextInput, Title, Paragraph } from 'react-native-paper';
import { saveFuelLogHistory } from '../../redux/ReduxSlices/FuelLogSlice';
import _ from 'lodash';
import ModelDialog from '../../components/ModelDialog';

let Form = t.form.Form

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 50;
stylesheet.textbox.error.height = 50;
stylesheet.textbox.normal.backgroundColor = '#fff';
stylesheet.textbox.error.backgroundColor = '#fff';

function PaperInputField({ label, value, onChange, hasError, error, ...rest }) {
    return (
        <View style={{ marginBottom: 20 }}>
            <TextInput
                label={label}
                value={value}
                selectionColor={'#fff'}
                underlineColor={'#fff'}
                style={styles.inputStyle}
                onChangeText={onChange}
            />
            {hasError && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
class MileageForm extends Component {
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

        this.saveLog = this.saveLog.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitForResult = this.submitForResult.bind(this);
        this.calculateMileage = this.calculateMileage.bind(this);
    }

    onChange(value) {
        this.setState((prevState) => ({
            params: { ...prevState.params, ...value }
        }));
    }

    submitForResult = async () => {
        var value = this.formRef.getValue();
        if (value) {
            await this.calculateMileage(value);
            console.log(value);
        }
    }

    calculateMileage({ FuelPrice,
        Mileage,
        TotalFuel,
        TotalFuelPrice,
        TravelKM, }) {
        this.setState({
            fuelEfficiency: {
                mileage: Math.round(TravelKM / TotalFuel),
                fuelCostPerKM: FuelPrice,
                TotalFuelPrice: FuelPrice
            },
            showResult: true
        })
    }

    saveLog() {
        this.props.dispatch(saveFuelLogHistory(this.state.fuelEfficiency));
        this.setState({
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
        });
    }

    render() {
        let FormModel = t.struct({
            FuelPrice: t.Number, // a required string
            TravelKM: t.Number, // an optional string
            TotalFuel: t.Number, // a required number
            Mileage: t.maybe(t.Number), // a required number
            TotalFuelPrice: t.maybe(t.Number), // a required number
        });
        let Options = {
            stylesheet: stylesheet,
            fields: {
                FuelPrice: {
                    label: 'Fuel Price (Rs)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                TravelKM: {
                    label: 'Travel KM (Km)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                TotalFuel: {
                    label: 'Total Fuel (Ltr)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                Mileage: {
                    label: 'Mileage (Km/Ltr)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                TotalFuelPrice: {
                    label: 'Total Fuel Price (Rs)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                }
            }
        }
        const { fuelEfficiency } = this.state;
        return (
            <>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Form
                            ref={(e) => this.formRef = e}
                            type={FormModel}
                            options={Options}
                            value={this.state.params}
                            onChange={this.onChange}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.submitForResult}>
                            <Text style={styles.buttonText}>Calculate</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <ModelDialog
                    showResult={this.state.showResult}
                    saveLog={this.saveLog}
                    closeLog={() => this.setState({ showResult: false })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Total Fuel Price: </Title>
                        <Paragraph>{fuelEfficiency.TotalFuelPrice}</Paragraph>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Mileage: </Title>
                        <Paragraph>{fuelEfficiency.mileage}</Paragraph>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Cost / KM: </Title>
                        <Paragraph>{fuelEfficiency.fuelCostPerKM}</Paragraph>
                    </View>
                </ModelDialog>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        // backgroundColor: '#ffffff',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
    },
    button: {
        display: 'flex',
        height: 60,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 0
        },
        shadowRadius: 25,
    },
    inputStyle: {
        backgroundColor: '#fff'
    }
});

const mapStateToProps = (state) => ({
    //
  });

export default connect(mapStateToProps)(MileageForm);