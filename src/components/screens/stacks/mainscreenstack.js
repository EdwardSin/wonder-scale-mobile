import { FontAwesome, Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import CategoryMenuScreen from 'components/screens/user/main/category-menu';
import MapSearchingScreen from 'components/screens/user/main/map-searching';
import ProfileScreen from 'components/screens/user/main/profile';
import ScanScreen from 'components/screens/user/main/scan';
import SearchMenuScreen from 'components/screens/user/main/search-menu';
import SearchScreen from 'components/screens/user/search';
import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import * as AuthUser from 'services/http/public/auth';
import { isSignedIn } from 'services/http/public/auth';
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
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
    initialRouteName: 'SearchMenu'
  })
const MapSearchingStack = createStackNavigator({
  MapSearching: {
    screen: MapSearchingScreen,
    navigationOptions: {
      header: null
    }
  }
})
const CategoryStack = createStackNavigator({
  Category: {
    screen: CategoryMenuScreen,
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
  TermAndCondition: {
    screen: TermAndConditionScreen,
    navigationOptions: {
      header: null
    }
  }
})

const footerStyle = {
  iconSelectedColor: colors.gold,
  inactiveIconColor: colors.white,
  barStyle: {
    backgroundColor: colors.secondary
  }
}

export default createMaterialBottomTabNavigator({
  Search: {
    screen: SearchStack,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons size={23} name={'ios-search'} color={focused ? colors.gold : tintColor} />
      ),
      tabBarOnPress: ({ screen, jumpToIndex, defaultHandler }) => {
        defaultHandler();
      }
    })
  },
  //Explore: { screen: ExploreStack },
  // Latest: {
  //   screen: LatestStack, navigationOptions: {
  //     tabBarIcon: ({ tintColor, focused }) => (
  //         <Icon size={23} name={`ios-information-circle${focused ? '' : '-outline'}`} type={'ionicon'} style={{ color: tintColor }} />
  //     )
  //   }
  // },
  // MapSearching: {
  //   screen: MapSearchingStack,
  //   navigationOptions: ({ navigation }) => ({
  //     title: 'Map Searching',
  //     tabBarIcon: ({ tintColor, focused }) => (
  //       <FontAwesome size={21} name={'map'} color={focused ? colors.gold : tintColor} />
  //     ),
  //     tabBarOnPress: ({ screen, jumpToIndex, defaultHandler }) => {
  //       defaultHandler();
  //     }
  //   })
  // },
  Scan: {
    screen: ScanStack, navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons size={23} name={'md-qr-scanner'} color={focused ? colors.gold : tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileStack, navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome size={23} name={'user-o'} color={focused ? colors.gold : tintColor} />
      ),
      tabBarOnPress: ({ screen, jumpToIndex, defaultHandler }) => {
        defaultHandler();
        // isSignedIn()
        //   .then(res => {
        //     if (res) {
        //       defaultHandler();
        //     }
        //     else {
        //       AsyncStorage.removeItem(AuthUser.WS_Token);
        //       navigation.navigate('Login');
        //     }
        //   })
        //   .catch(err => alert(err));
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
