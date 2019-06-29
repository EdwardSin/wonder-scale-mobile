import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import ShopRecruitmentScreen from 'components/screens/public/shop/recruitment';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ShopCategoriesScreen from '../public/shop/categories';
import FrontShopScreen from '../public/shop/frontshop';
import InfoScreen from '../public/shop/info';
import PublicShopReview from '../public/shop/reviews';


let navigationOptions = { header: null };

const FrontShopStack = createStackNavigator({
  FrontShop: {
    screen: FrontShopScreen,
    navigationOptions: navigationOptions
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: navigationOptions
  }
});

const footerStyle = {
  iconSelectedColor: colors.gold,
  inactiveIconColor: colors.white,
  barStyle: {
    backgroundColor: colors.secondary
  }
};

export default createMaterialBottomTabNavigator(
  {
    FrontShop: {
      screen: FrontShopStack, navigationOptions: ({ navigation, screenProps }) => {
        return ({
          title: "Home",
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-home${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    Categories: {
      screen: ShopCategoriesScreen, navigationOptions: ({ navigation }) => {
        return ({
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-list${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    Information: {
      screen: InfoScreen, navigationOptions: ({ navigation }) => {
        return ({
          title: "Information",
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-information-circle`} size={25} color={tintColor} />
          )
        })
      }
    },
    Recruitment: {
      screen: ShopRecruitmentScreen, navigationOptions: ({ navigation }) => {
        return ({
          title: "Recruitment",
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`md-person`} size={25} color={tintColor} />
          )
        })
      }
    },
    Review: {
      screen: PublicShopReview, navigationOptions: ({ navigation }) => {
        return ({
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-chatbubbles`} size={25} color={tintColor} />
          )
        })
      }
    }
  },
  {
    initialRouteName: 'FrontShop',
    activeTintColor: footerStyle.iconSelectedColor,
    inactiveTintColor: footerStyle.inactiveIconColor,
    labeled: true,
    shifting: false,
    backBehavior: 'initialRoute',
    barStyle: { backgroundColor: footerStyle.barStyle.backgroundColor }
  }
)