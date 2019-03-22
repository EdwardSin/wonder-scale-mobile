import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ShopScreen from '../shop/shop';
import CreateShopScreen from '../user/createshop';
import ExploreScreen from '../user/explore';
import LatestScreen from '../user/latest';
import NotificationScreen from '../user/notification';
import ProfileScreen from '../user/profile';
import ScanScreen from '../user/scan';
import SearchScreen from '../user/search';
import TermAndConditionScreen from '../user/termandcondition';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { isSignedIn } from 'services/auth';
import * as AuthUser from 'services/auth';



const ExploreStack = createStackNavigator({
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      header: null
    }
  }
})
const LatestStack = createStackNavigator({
  Latest: {
    screen: LatestScreen,
    navigationOptions: {
      header: null
    }
  },
})
const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  }
})
const NotificationStack = createStackNavigator({
  Notification: {
    screen: NotificationScreen,
    navigationOptions: {
      header: null
    }
  }
})
const ScanStack = createStackNavigator({
  Scan: {
    screen: ScanScreen,
    navigationOptions: {
      header: null
    }
  }
})
const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  CreateShop: {
    screen: CreateShopScreen,
    navigationOptions: {
      header: null
    }
  },
  TermAndCondition: {
    screen: TermAndConditionScreen,
    navigationOptions: {
      header: null
    }
  },
  ShopSetting: {
    screen: ShopScreen,
    navigationOptions: {
      header: null
    }
  }
})

const footerStyle = {
  iconSelectedColor: colors.white,
  inactiveIconColor: colors.white,
  barStyle: {
    backgroundColor: colors.secondary
  }
}

export default createMaterialBottomTabNavigator({
  //Explore: { screen: ExploreStack },
  // Latest: {
  //   screen: LatestStack, navigationOptions: {
  //     tabBarIcon: ({ tintColor, focused }) => (
  //         <Icon size={25} name={`ios-information-circle${focused ? '' : '-outline'}`} type={'ionicon'} style={{ color: tintColor }} />
  //     )
  //   }
  // },
  Search: {
    screen: SearchStack, navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons size={25} name={`${focused ? 'md-search' : 'ios-search'}`} color={tintColor} />
      ),
      tabBarOnPress: ({screen, jumpToIndex, defaultHandler}) => {
        
        defaultHandler();
      }
    })
  },
  Scan: {
    screen: ScanStack, navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons size={25} name={`${focused ? 'md-qr-scanner' : 'ios-qr-scanner'}`} color={tintColor} />
      )
    }
  },
  //Notification: { screen: NotificationStack },
  Profile: {
    screen: ProfileStack, navigationOptions:  ({navigation}) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialCommunityIcons size={25} name={`${focused ? 'account' : 'account-outline'}`} color={tintColor} />
      ),
      tabBarOnPress: ({screen, jumpToIndex, defaultHandler}) => {
        isSignedIn()
          .then(res => {
            if (res) {
              defaultHandler();
            }
            else {
              AsyncStorage.removeItem(AuthUser.WS_Token);
              navigation.navigate('Login');
            }
          })
          .catch(err => alert(err));
      }
    })
  },
},
  {
    initialRouteName: 'Search',
    labeled: true,
    shifting: false,
    activeTintColor: footerStyle.iconSelectedColor,
    inactiveTintColor: footerStyle.inactiveIconColor,
    barStyle: { backgroundColor: footerStyle.barStyle.backgroundColor }
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
