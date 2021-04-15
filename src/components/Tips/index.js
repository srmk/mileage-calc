// import React, { Component } from 'react'
// import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native'
// const { width: screenWidth } = Dimensions.get('window')

// const ENTRIES1 = [
//     {
//         title: 'Beautiful and dramatic Antelope Canyon',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//         illustration: 'https://i.imgur.com/UYiroysl.jpg',
//     },
//     {
//         title: 'Earlier this morning, NYC',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
//     },
//     {
//         title: 'White Pocket Sunset',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
//         illustration: 'https://i.imgur.com/MABUbpDl.jpg',
//     },
//     {
//         title: 'Acrocorinth, Greece',
//         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//         illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
//     },
//     {
//         title: 'The lone tree, majestic landscape of New Zealand',
//         subtitle: 'Lorem ipsum dolor sit amet',
//         illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
//     },
// ];

// export default class Tips extends Component {

//     _renderItem({ item, index }, parallaxProps) {
//         return (
//             <View style={styles.item}>
//                 <ParallaxImage
//                     source={{ uri: item.thumbnail }}
//                     containerStyle={styles.imageContainer}
//                     style={styles.image}
//                     parallaxFactor={0.4}
//                     {...parallaxProps}
//                 />
//                 <Text style={styles.title} numberOfLines={2}>
//                     {item.title}
//                 </Text>
//             </View>
//         );
//     }

//     render() {
//         return (
//             <View>
//                 <Carousel
//                     sliderWidth={screenWidth}
//                     sliderHeight={screenWidth}
//                     itemWidth={screenWidth - 60}
//                     data={ENTRIES1}
//                     renderItem={this._renderItem}
//                     hasParallaxImages={true}
//                 />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     item: {
//         width: screenWidth - 60,
//         height: screenWidth - 60,
//     },
//     imageContainer: {
//         flex: 1,
//         marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
//         backgroundColor: 'white',
//         borderRadius: 8,
//     },
//     image: {
//         ...StyleSheet.absoluteFillObject,
//         resizeMode: 'cover',
//     },
// })

import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Title } from 'react-native-paper';

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
];

const { width: screenWidth } = Dimensions.get('window');

export default class Tips extends Component {
    _renderItem({ item, index }, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.5}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Title>Tips</Title>
                </View>
                <Carousel
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    data={ENTRIES1}
                    renderItem={this._renderItem}
                    hasParallaxImages={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: 200,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 10,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    title: {
        marginBottom: 5,
        paddingLeft: 20,
        paddingRight: 20
    }
})