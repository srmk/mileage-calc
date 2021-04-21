import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import t from 'tcomb-form-native';
import { connect } from "react-redux";
import moment from 'moment';
import { TextInput, Title, Paragraph } from 'react-native-paper';
import { saveFuelLogHistory } from '../../redux/ReduxSlices/FuelLogSlice';
import _ from 'lodash';

let Form = t.form.Form

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 50;
stylesheet.textbox.error.height = 50;
stylesheet.textbox.normal.backgroundColor = '#fff';
stylesheet.textbox.error.backgroundColor = '#fff';
stylesheet.dateValue.normal.height = 50;
stylesheet.controlLabel.normal.backgroundColor = '#fff';
stylesheet.controlLabel.normal.marginBottom = 0;
stylesheet.controlLabel.normal.paddingLeft = 10;
stylesheet.controlLabel.normal.color = '#cfcfcf';
stylesheet.dateValue.normal.borderBottomWidth = 1;
stylesheet.dateValue.normal.backgroundColor = '#fff';
stylesheet.dateValue.normal.borderColor = '#cfcfcf';
stylesheet.dateValue.normal.borderWidth = 0;
stylesheet.dateValue.normal.borderTop = 0;



function PaperInputField({ label, value, onChange, hasError, error }) {
    return (
        <View style={{ marginBottom: 20 }}>
            <TextInput
                label={label}
                value={value}
                error={error ? true : false}
                theme={{
                    colors: {
                        primary: '#2AC062',
                        underlineColor: '#2AC062'
                    }
                }}
                keyboardType={label !== 'Comments (optional)' ? 'numeric':'default'}
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
                Date: new Date(),
                FuelMeterReading: null,
                TotalFuelPrice: null,
                FuelPrice: null,
                FuelQuantity: null,
                Comments: null,
            }
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveFuelHistory = this.saveFuelHistory.bind(this);
    }

    onChange(value) {
        this.setState((prevState) => ({
            params: {
                ...prevState.params,
                ...value,
            }
        }));
    }

    submit = async () => {
        var value = this.formRef.getValue();
        if (value) {
            await this.saveFuelHistory(value);
        }
    }

    saveFuelHistory(value) {
        this.props.dispatch(saveFuelLogHistory({
            ...value,
            Date: this.dateFormater("DD/MM/YYYY", value.Date)
        }));
        this.setState({
            params: {
                Date: new Date(),
                FuelMeterReading: null,
                TotalFuelPrice: null,
                FuelPrice: null,
                FuelQuantity: null,
                Comments: null,
            }
        });
    }

    dateFormater = (format, date) => {
        return moment(date).format(format);
    }

    render() {
        let FormModel = t.struct({
            Date: t.Date,
            FuelMeterReading: t.Number, // an optional string
            TotalFuelPrice: t.Number, // a required number
            FuelPrice: t.Number, // a required number
            FuelQuantity: t.Number, // a required number
            Comments: t.maybe(t.String), // a required number
        });
        let Options = {
            stylesheet: stylesheet,
            fields: {
                Date: {
                    label: 'Date',
                    placeholder: '',
                    help: '',
                    mode: 'date',
                    config: {
                        format: (date) => this.dateFormater("DD/MM/YYYY", date)
                    },
                    error: 'Insert a valid data',
                },
                FuelMeterReading: {
                    label: 'Fuel Meter Reading',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                TotalFuelPrice: {
                    label: 'Total Fuel Price (Ltr)',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                FuelPrice: {
                    label: 'Fuel Price',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                FuelQuantity: {
                    label: 'Fuel Quantity',
                    placeholder: '0',
                    help: '',
                    error: 'Insert a valid data',
                    template: PaperInputField
                },
                Comments: {
                    label: 'Comments',
                    placeholder: '',
                    help: '',
                    key: 'Comments',
                    error: 'Insert a valid data',
                    template: PaperInputField
                }
            }
        }
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Form
                        ref={(e) => this.formRef = e}
                        type={FormModel}
                        options={Options}
                        value={this.state.params}
                        onChange={this.onChange}
                    />
                    <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity
                            style={styles.button}
                        // onPress={this.submitForResult}
                        >
                            <Text style={styles.buttonText}>History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.submit}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
        width: '40%',
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