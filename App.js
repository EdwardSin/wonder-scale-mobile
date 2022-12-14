import { createAppContainer } from '@react-navigation/native';
import colors from 'assets/variables/colors';
import FilterModal from 'components/modals/search/FilterModal';
import { WsToast } from 'components/modals/ws-modals';
import ItemdetailScreen from 'components/screens/public/itemdetail';
import PromotionDetailScreen from 'components/screens/public/promotiondetail';
import RecruitmentDetailScreen from 'components/screens/public/recruitmentdetail';
import ShopAllItemsScreen from 'components/screens/public/shop/allitems';
import CategoryItemsScreen from 'components/screens/public/shop/categoryitems';
import ShopDiscountItemsScreen from 'components/screens/public/shop/discountitems';
import InfoScreen from 'components/screens/public/shop/info';
import ItemsDisplayScreen from 'components/screens/public/shop/itemsdisplay';
import MapModal from 'components/screens/public/shop/mapmodal';
import ShopNewItemsScreen from 'components/screens/public/shop/newitems';
import ShopPromotionScreen from 'components/screens/public/shop/promotion';
import ShopQRCodeScreen from 'components/screens/public/shop/qrcode';
import RecruitmentMapModalScreen from 'components/screens/public/shop/recruitment-mapmodal';
import MainScreenStack from 'components/screens/stacks/mainscreenstack';
import PublicShopStack from 'components/screens/stacks/publicshopstack';
import ForgotPasswordScreen from 'components/screens/user/authentication/forgotpassword';
import LoginScreen from 'components/screens/user/authentication/login';
import SignUpScreen from 'components/screens/user/authentication/signup';
import PermissionScreen from 'components/screens/user/permission.screen';
import ReportReviewScreen from 'components/screens/user/report-review.screen';
import AboutusScreen from 'components/screens/user/settings/aboutus';
import CurrencyScreen from 'components/screens/user/settings/currency';
import EditProfileScreen from 'components/screens/user/settings/editprofile';
import FavoriteScreen from 'components/screens/user/settings/favorite';
import FeedbackScreen from 'components/screens/user/settings/feedback';
import PolicyScreen from 'components/screens/user/settings/policy';
import RedeemScreen from 'components/screens/user/settings/redeem';
import SecurityScreen from 'components/screens/user/settings/security';
import SettingsScreen from 'components/screens/user/settings/settings';
import VourchersScreen from 'components/screens/user/settings/voucher';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import { Provider } from 'react-redux';
import allReducers from 'reducers/index';
import { createStore } from 'redux';
import { getAuthentication } from 'services/http/public/auth';
let navigationOptions = { header: null };
let navigationOptionsWithBack = {
  headerTintColor: colors.secondary,
  containerStyle: { paddingTop: 0, height: 60 },
  headerLeftContainerStyle: {
    paddingVertical: 10,
    paddingLeft: 10
  },
};

const createNavigator = () => {
  return createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          gesturesEnabled: false,
          header: (<Header
            containerStyle={{ paddingTop: 0, height: 60 }}
            backgroundColor={colors.secondary}
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={<Icon name='chevron-left' underlayColor='transparent' color='#fff' onPress={() => { navigation.goBack() }} />}
            centerComponent={<Text style={{ color: '#fff', fontSize: 18 }} >Login</Text>}
          />)
        }
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;

        return {
          title: 'Sign Up With Email',
          header: (<Header
            containerStyle={{ paddingTop: 0, height: 60 }}
            backgroundColor={colors.secondary}
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={<Icon name='chevron-left' underlayColor='transparent' color='#fff' onPress={() => { navigation.goBack() }} />}
            centerComponent={<Text style={{ color: '#fff', fontSize: 18 }} >Sign Up With Email</Text>}
            rightComponent={<Text style={{ color: '#fff' }} onPress={() => { state.params.onPressSignUp() }}>Sign Up</Text>}
          />),
          headerTitleStyle: {
            color: colors.black
          },
          headerTintColor: colors.secondary,
          // headerRightContainerStyle: {
          //   paddingRight: 15
          // },
          // headerRight: (<TouchableOpacity onPress={() => { state.params.onPressSignUp() }}><View><Text
          //   style={{ color: colors.secondary, fontSize: 18 }}>Submit</Text></View></TouchableOpacity>)
        }
      }
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: ({ navigation }) => {
        return {
          ...navigationOptionsWithBack,
          header: (<Header
            containerStyle={{ paddingTop: 0, height: 60 }}
            backgroundColor={colors.secondary}
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={<Icon name='chevron-left' underlayColor='transparent' color='#fff' onPress={() => { navigation.goBack() }} />}
            centerComponent={<Text style={{ color: '#fff', fontSize: 18 }} >Forgot Password</Text>}
          />)
        }
      }
    },
    AllItems: {
      screen: ShopAllItemsScreen,
      navigationOptions: navigationOptions
    },
    NewItems: {
      screen: ShopNewItemsScreen,
      navigationOptions: navigationOptions
    },
    DiscountItems: {
      screen: ShopDiscountItemsScreen,
      navigationOptions
    },
    ItemDetail: {
      screen: ItemdetailScreen,
      navigationOptions
    },
    ItemsDisplay: {
      screen: ItemsDisplayScreen,
      navigationOptions
    },
    RecruitmentDetail: {
      screen: RecruitmentDetailScreen,
      navigationOptions
    },
    PromotionDetail: {
      screen: PromotionDetailScreen,
      navigationOptions
    },
    Promotion: {
      screen: ShopPromotionScreen,
      navigationOptions
    },
    QRCode: {
      screen: ShopQRCodeScreen,
      navigationOptions: navigationOptions
    },
    PublicShop: {
      screen: PublicShopStack,
      navigationOptions: navigationOptions
    },
    ReportReview: {
      screen: ReportReviewScreen,
      navigationOptions: navigationOptionsWithBack
    },
    MapModal: {
      screen: MapModal,
      navigationOptions: navigationOptions
    },
    RecruitmentMapModal: {
      screen: RecruitmentMapModalScreen,
      navigationOptions: navigationOptions
    },
    FilterModal: {
      screen: FilterModal,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          ...navigationOptionsWithBack,
          title: 'Filter',
          header: (<Header
            containerStyle={{ paddingTop: 0, height: 60 }}
            backgroundColor={colors.secondary}
            statusBarProps={{ barStyle: 'light-content' }}
            leftComponent={<Icon name='chevron-left' underlayColor='transparent' color='#fff' onPress={() => { navigation.goBack() }} />}
            centerComponent={<Text style={{ color: '#fff', fontSize: 18 }} >Filter</Text>}
            rightComponent={<Text style={{ color: '#fff' }} onPress={() => { state.params.onSearchPressed() }}>Search</Text>}
          />)
          // headerRight: (<TouchableOpacity onPress={() => { state.params.onSearchPressed() }}><View><Text
          //   style={{ color: colors.secondary, fontSize: 18, paddingRight: 20 }}>Search</Text></View></TouchableOpacity>)
        }
      }
    },
    Info: {
      screen: InfoScreen,
      navigationOptions: { ...navigationOptionsWithBack, title: 'Information' }
    },
    // PublicShopReview: {
    //   screen: PublicShopReview,
    //   navigationOptions: navigationOptions
    // },
    CategoryItems: {
      screen: CategoryItemsScreen,
      navigationOptions: navigationOptions
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          title: null,
          headerTintColor: colors.secondary,
          headerLeftContainerStyle: {
            paddingVertical: 10,
            paddingLeft: 10
          },
          headerRightContainerStyle: {
            paddingRight: 15
          },
          headerRight: (<TouchableOpacity onPress={() => { state.params.onPressEdit() }}><View><Text
            style={{ color: colors.secondary, fontSize: 18 }}>Save</Text></View></TouchableOpacity>)
        }
      }
    },
    Vouchers: {
      screen: VourchersScreen,
      navigationOptions: { ...navigationOptionsWithBack, title: 'Vouchers' }
    },
    Redeem: {
      screen: RedeemScreen,
      navigationOptions: navigationOptions
    },
    Favorites: {
      screen: FavoriteScreen,
      navigationOptions: { ...navigationOptionsWithBack, title: 'Favorites' }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: navigationOptionsWithBack
    },
    Aboutus: {
      screen: AboutusScreen,
      navigationOptions: navigationOptionsWithBack
    },
    Feedback: {
      screen: FeedbackScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          title: null,
          headerTintColor: colors.secondary,
          headerLeftContainerStyle: {
            paddingVertical: 10,
            paddingLeft: 10
          },
          headerRightContainerStyle: {
            paddingRight: 15
          },
          headerRight: (<TouchableOpacity onPress={() => { state.params.onPressSubmit() }}><View><Text style={{ color: colors.secondary, fontSize: 18 }}>Submit</Text></View></TouchableOpacity>)
        }
      }
    },
    Policy: {
      screen: PolicyScreen,
      navigationOptions: navigationOptionsWithBack
    },
    Security: {
      screen: SecurityScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          title: null,
          headerTintColor: colors.secondary,
          headerLeftContainerStyle: {
            paddingVertical: 10,
            paddingLeft: 10
          },
          headerRightContainerStyle: {
            paddingRight: 15
          },
          headerRight: (<TouchableOpacity onPress={() => { state.params.onPressEdit() }}><View><Text
            style={{ color: colors.secondary, fontSize: 18 }}>Save</Text></View></TouchableOpacity>)
        }
      }
    },
    Currency: {
      screen: CurrencyScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          title: null,
          headerTintColor: colors.secondary,
          headerLeftContainerStyle: {
            paddingVertical: 10,
            paddingLeft: 10
          },
          headerRightContainerStyle: {
            paddingRight: 15
          },
          headerRight: (<TouchableOpacity onPress={() => { state.params.saveCurrency() }}><View><Text style={{ color: colors.secondary, fontSize: 18 }}>Save</Text></View></TouchableOpacity>)
        }
      }
    },
    Main: {
      screen: MainScreenStack,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
  }, {
      initialRouteName: 'Main',
      headerMode: 'screen',
      transitionConfig: (transitionProps, prevTransitionProps, isModal) => ({
        screenInterpolator: (props) => {
          const { scene, scenes } = props;
          const { route } = scenes[scenes.length - 1];
          const params = route.params || {};
          const transition = params.transition || 'forHorizontal';
          return StackViewStyleInterpolator[transition](props);
          //Basically you need to create a condition for individual scenes


          // if (props.scene.route.routeName === 'MapModal') {

          //   // forVertical makes the scene transition for Top to Bottom
          //   return StackViewStyleInterpolator.forVertical(props);
          // }

          // const last = props.scenes[props.scenes.length - 1];

          // //This controls the transition when navigation back toa specific scene

          // if (last.route.routeName === 'MapModal' || last.route.routeName === 'FilterModal') {

          //   // Here, forVertical flows from Top to Bottom
          //   return StackViewStyleInterpolator.forVertical(props);
          // }
          // return StackViewStyleInterpolator.forHorizontal(props);
        }
      })
    });
};
const store = createStore(allReducers);
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    getAuthentication();
  }

  render() {
    const { navigation } = this.props;
    const RootStack = createNavigator();
    const App = createAppContainer(RootStack);
    return <Provider store={store}>
      <App navigation={navigation} />
      <PermissionScreen></PermissionScreen>
      <WsToast />
    </Provider>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
