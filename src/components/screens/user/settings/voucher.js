import colors from 'assets/variables/colors';
import AvailableClaimedVoucherScreen from 'components/screens/user/settings/available-voucher.js';
import UsedClaimedVoucherScreen from 'components/screens/user/settings/unavailable-voucher.js';
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';

export default createMaterialTopTabNavigator({
    Available: AvailableClaimedVoucherScreen,
    'Used & Expired': UsedClaimedVoucherScreen
},
    {
        initialRouteName: 'Available',
        tabBarOptions: {
            activeTintColor: colors.black,
            pressColor: colors.grey,
            inactiveTintColor: colors.black,
            style: {
                backgroundColor: colors.greyLighten5,
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
function MaterialTopTabBarWithStatusBar(props){
    return (
        <View style={{ backgroundColor: colors.greyLighten5 }} >
            <MaterialTopTabBar {...props} />
        </View>
    );
}