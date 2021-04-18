import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
export default class ModelDialog extends Component {
    render() {
        const { showResult, saveLog, closeLog, children } = this.props;
        return (
            <Modal
                testID={'modal'}
                backdropOpacity={0.8}
                animationIn={'slideInUp'}
                deviceWidth={width}
                deviceHeight={height}
                animationOut={'slideOutDown'}
                // animationInTiming={600}
                // animationOutTiming={600}
                // backdropTransitionInTiming={800}
                // backdropTransitionOutTiming={800}
                isVisible={showResult}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        {children}
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            delayPressIn={150}
                            style={styles.closeButton}
                            onPress={saveLog}
                        >
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            delayPressIn={150}
                            style={styles.closeButton}
                            onPress={closeLog}
                        >
                            <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    content: {
        padding: 15,
        justifyContent: 'center'
        // marginBottom: 80,
    },
    footer: {
        paddingTop: 15,
        paddingBottom: 0,
        borderTopColor: '#f1f1f1',
        borderTopWidth: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        // position: 'absolute',
        // bottom: 0
    },
    closeButton: {
        height: 40,
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
    },
    image: {
        marginBottom: 10,
        width: '100%',
        height: 350,
    },
    text: {
        fontSize: 20,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#fff'
    },
    closeText: {
        fontSize: 24,
        color: '#fff',
        padding: 10,
        textAlign: 'center',
    }
});