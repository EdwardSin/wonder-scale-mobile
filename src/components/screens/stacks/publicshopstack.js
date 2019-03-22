import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ShopAllItemsScreen from '../public/shop/allitems';
import ShopCategoriesScreen from '../public/shop/categories';
import ShopContactScreen from '../public/shop/contact';
import FrontShopScreen from '../public/shop/frontshop';
import InfoScreen from '../public/shop/info';
import ShopQRCodeScreen from '../public/shop/qrcode';
import PublicShopReview from '../public/shop/reviews';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FrontShopStack = createStackNavigator({
  FrontShop: {
    screen: FrontShopScreen,
    navigationOptions: {
      header: null
    }
  },
  Info:{
    screen: InfoScreen,
    navigationOptions: {
      header: null
    }
  }
});
const AllItemsStack = createStackNavigator({
  AllItems: {
    screen: ShopAllItemsScreen,
    navigationOptions: {
      header: null,
      title: 'All Items'
    }
  }
});
const CategoriesStack = createStackNavigator({
  Categories: {
    screen: ShopCategoriesScreen,
    navigationOptions: {
      header: null,
      title: 'Categories'
    }
  }
});
const QRCodeStack = createStackNavigator({
  QRCode: {
    screen: ShopQRCodeScreen,
    navigationOptions: {
      header: null,
      title: 'QRCode'
    }
  }
});
const ContactStack = createStackNavigator({
  Contact: {
    screen: ShopContactScreen,
    navigationOptions: {
      header: null,
      title: 'Contact'
    }
  }
}, {
  initialRouteName: "CategoriesStack"
});
// const AllItemsStack = createStackNavigator({
//   AllItems: {
//     screen: ShopAllItemsScreen,
//     navigationOptions: {
//       header: null,
//       title: 'All Items'
//     }
//   }
// });
// const CategoriesStack = createStackNavigator({
//   Categories: {
//     screen: ShopCategoriesScreen,
//     navigationOptions: ({navigation}) => 
//     {
//       return (
//       {
//       header: null,
//       title: 'Categories'
//     })
//   }}
// });
// const QRCodeStack = createStackNavigator({
//   Categories: {
//     screen: ShopQRCodeScreen,
//     navigationOptions: {
//       header: null,
//       title: 'QRCode'
//     }
//   }
// });
// const ContactStack = createStackNavigator({
//   Contact: {
//     screen: ShopContactScreen,
//     navigationOptions: {
//       header: null,
//       title: 'Contact'
//     }
//   }
// });

const footerStyle = {
 
  iconSelectedColor: colors.white,
  inactiveIconColor: colors.white,
  barStyle: {
    backgroundColor: colors.secondary
  }
};

export default createMaterialBottomTabNavigator(
  {
    FrontShop: {
      screen: FrontShopScreen, navigationOptions: ({ navigation }) => {
        return ({
          params: navigation.state.params,
          title: "Home",
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-home${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    AllItems: {
      screen: ShopAllItemsScreen, navigationOptions: ({ navigation }) => {
        return ({
          params: navigation.state.params,
          title: "All Items",
          tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome name={`th-large${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    Categories: {
      screen: ShopCategoriesScreen, navigationOptions: ({ navigation }) => {
        return ({
          params: navigation.state.params,
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-list${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    QRCode: {
      screen: ShopQRCodeScreen, navigationOptions: ({ navigation }) => {
        return ({
          params: navigation.state.params,
          title: "QR Code",
          tabBarIcon: ({ focused, tintColor }) => (
            <MaterialCommunityIcons size={25} name={`qrcode${focused ? '' : ''}`} color={tintColor} />
          )
        })
      }
    },
    Review: {
      screen: PublicShopReview, navigationOptions: ({ navigation }) => {
        return ({
          params: navigation.state.params,
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-chatbubbles`} size={25} color={tintColor} />
          )
        })
      }
    }
    // Contact: {
    //   screen: ShopContactScreen, navigationOptions: ({ navigation }) => {
    //     return ({
    //       params: navigation.state.params,
    //       tabBarIcon: ({ focused, tintColor }) => (
    //         <Ionicons name={`ios-information-circle${focused ? '' : ''}`} size={25} color={tintColor} />
    //       )
    //     })
    //   }
    // }
  },
  {
    initialRouteName: 'FrontShop',
    activeTintColor: footerStyle.iconSelectedColor,
    inactiveTintColor: footerStyle.inactiveIconColor,
    
    barStyle: { backgroundColor: footerStyle.barStyle.backgroundColor }
  }
);
