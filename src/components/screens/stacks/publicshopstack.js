import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from 'assets/variables/colors';
import ShopPromotionScreen from 'components/screens/public/shop/promotion';
import ShopRecruitmentScreen from 'components/screens/public/shop/recruitment';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ShopAllItemsScreen from '../public/shop/allitems';
import ShopCategoriesScreen from '../public/shop/categories';
import FrontShopScreen from '../public/shop/frontshop';
import InfoScreen from '../public/shop/info';
import ShopQRCodeScreen from '../public/shop/qrcode';
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
// const ContactStack = createStackNavigator({
//   Contact: {
//     screen: ShopContactScreen,
//     navigationOptions: {
//       header: null,
//       title: 'Contact'
//     }
//   }
// });
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
let params = {};


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
    // AllItems: {
    //   screen: ShopAllItemsScreen, navigationOptions: ({ navigation }) => {
    //     params = navigation.state.params;
    //     return ({
    //       params: navigation.state.params,
    //       title: "All Items",
    //       tabBarIcon: ({ focused, tintColor }) => (
    //         <FontAwesome name={`th-large${focused ? '' : ''}`} size={25} color={tintColor} />
    //       ),
    //       tabBarOnPress: ({navigation, defaultHandler}) => {
    //         navigation.setParams(params);
    //         defaultHandler();
    //       }
    //     })
    //   }
    // },

    Categories: {
      screen: ShopCategoriesScreen, navigationOptions: ({ navigation }) => {
        if (navigation.state.routes) {
          params = navigation.state.routes[navigation.state.index].params;
        }

        return ({
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-list${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    // QRCode: {
    //   screen: ShopQRCodeScreen, navigationOptions: ({ navigation }) => {
    //     return ({
    //       title: "QR Code",
    //       tabBarIcon: ({ focused, tintColor }) => (
    //         <MaterialCommunityIcons size={25} name={`qrcode${focused ? '' : ''}`} color={tintColor} />
    //       ),
    //       tabBarOnPress: ({navigation, defaultHandler}) => {
    //         navigation.setParams({shopId: shopId});
    //         defaultHandler();
    //       }
    //     })
    //   }
    // },
    Promotion: {
      screen: ShopPromotionScreen, navigationOptions: ({ navigation }) => {
        return ({
          title: "Promotion",
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons name={`ios-pricetags${focused ? '' : ''}`} size={25} color={tintColor} />
          )
        })
      }
    },
    Recruitment: {
      screen: ShopRecruitmentScreen, navigationOptions: ({ navigation }) => {
        return ({
          title: "Recruitment",
          tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome name={`th-large${focused ? '' : ''}`} size={25} color={tintColor} />
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
    activeTintColor: footerStyle.iconSelectedColor,
    inactiveTintColor: footerStyle.inactiveIconColor,
    backBehavior: 'initialRoute',
    barStyle: { backgroundColor: footerStyle.barStyle.backgroundColor }
  }
)


// export default class PublicShopStack extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const { navigation } = this.props;
//     const RootStack = createNavigator();
//     const App = createAppContainer(RootStack);
//     return  <PublicShopStack navigation={navigation} />;
//   }
// }