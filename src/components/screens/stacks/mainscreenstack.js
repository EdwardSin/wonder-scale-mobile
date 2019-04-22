import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import ProfileScreen from 'components/screens/user/main/profile';
import ScanScreen from 'components/screens/user/main/scan';
import SearchMenuScreen from 'components/screens/user/main/search-menu';
import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import * as AuthUser from 'services/auth';
import { isSignedIn } from 'services/auth';
import TermAndConditionScreen from '../user/termandcondition';



// const ExploreStack = createStackNavigator({
//   Explore: {
//     screen: ExploreScreen,
//     navigationOptions: {
//       header: null
//     }
//   }
// })
// const LatestStack = createStackNavigator({
//   Latest: {
//     screen: LatestScreen,
//     navigationOptions: {
//       header: null
//     }
//   },
// })
// const NotificationStack = createStackNavigator({
//   Notification: {
//     screen: NotificationScreen,
//     navigationOptions: {
//       header: null
//     }
//   }
// })
const SearchStack = createStackNavigator({
  SearchMenu: {
    screen: SearchMenuScreen,
    navigationOptions: {
      header: null
    }
  },
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
  TermAndCondition: {
    screen: TermAndConditionScreen,
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
  //Notification: { screen: NotificationStack },
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
