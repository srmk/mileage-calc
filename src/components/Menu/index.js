// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuItems = [
    {
        id: 'howTo',
        label: 'How to use?',
        navigateTo: 'HowtoUse'
    },
    {
        id: 'help',
        label: 'Help / Feedbacl',
        navigateTo: 'Help'
    },
    {
        id: 'settings',
        label: 'Settings',
        navigateTo: 'Settings'
    },
    {
        id: 'about',
        label: 'About us',
        navigateTo: 'About'
    },
]

class CustomMaterialMenu extends React.PureComponent {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    render() {
        const { route, navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <Icon
                            name={'dots-vertical'}
                            size={28}
                            color={'gray'}
                            onPress={this.showMenu}
                            style={{ paddingRight: 10 }}
                        />
                    }
                >
                    {
                        menuItems.map((item) => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    onPress={() => {
                                        navigation.navigate(item.navigateTo);
                                        this.hideMenu()
                                    }}
                                >
                                    {item.label}
                                </MenuItem>
                            )
                        })
                    }
                    {/* <MenuDivider />
                    <MenuItem onPress={this.hideMenu}> Login / SignUp </MenuItem> */}
                </Menu>
            </View>
        );
    }
}

export default CustomMaterialMenu;