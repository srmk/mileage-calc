import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Dimensions } from "react-native";

export default class ModelDialog extends Component {
    render() {
        const { showResult, saveLog, closeLog, children } = this.props;
        return (
            <View style={styles.container}>
                <Dialog
                    visible={false}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Save"
                                onPress={() => saveLog()}
                            />
                            <DialogButton
                                text="Cancel"
                                onPress={() => closeLog()}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View style={styles.content}>
                            {children}
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    content: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height / 4, //full height
        padding: 20
    }
});
