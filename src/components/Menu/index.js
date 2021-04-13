// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                            style={{ marginRight: 5 }}
                        />
                    }
                >
                    <MenuItem onPress={this.hideMenu}>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideMenu}> Login / SignUp </MenuItem>
                </Menu>
            </View>
        );
    }
}

export default CustomMaterialMenu;