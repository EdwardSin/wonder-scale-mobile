import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import AvailableClaimedVoucherScreen from 'components/screens/user/settings/available-voucher.js'
import UsedClaimedVoucherScreen from 'components/screens/user/settings/unavailable-voucher.js'

const { width } = Dimensions.get('window');

export default createMaterialTopTabNavigator({
    Available: AvailableClaimedVoucherScreen,
    'Used & Expired': UsedClaimedVoucherScreen
},
    {
        initialRouteName: 'Available',
        tabBarOptions: {
            activeTintColor: colors.black,
            pressColor: "gray",
            inactiveTintColor: colors.black,
            style: {
                backgroundColor: '#f7f7f7',
            },
            indicatorStyle: {
                backgroundColor: colors.secondary,
            },
            upperCaseLabel: false
        },
        lazy: true,
        tabBarComponent: MaterialTopTabBarWithStatusBar,
        animationEnabled: true,
        swipeEnabled: true,
    }
);
function MaterialTopTabBarWithStatusBar(props) {
    return (
        <View
            style={{
                backgroundColor: '#f7f7f7',
            }}
        >
            <MaterialTopTabBar {...props} jumpToIndex={() => { }} />
        </View>
    );
}