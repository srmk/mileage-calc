import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default class Cards extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { CardTitle, CardSubTitle, children, imgSrc, isIcon, style } = this.props;
        return (
                <Card elevation={2} style={style ? style : styles.cardStyle}>
                    {imgSrc && <Card.Cover source={{ uri: imgSrc }} />}
                    {CardTitle && <Card.Title
                        title={CardTitle}
                        subtitle={CardSubTitle}
                    />}
                    <Card.Content>
                        {children}
                    </Card.Content>
                    {/* <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions> */}
                </Card>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 10,
    }
});