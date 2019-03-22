import { createAppContainer } from '@react-navigation/native';
import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { HeaderBackButton, createStackNavigator } from 'react-navigation';
import ForgotPasswordScreen from 'components/screens/authentication/forgotpassword';
import LoginScreen from 'components/screens/authentication/login';
import SignUpScreen from 'components/screens/authentication/signup';
import ItemdetailScreen from 'components/screens/public/itemdetail';
import CategoryItemsScreen from 'components/screens/public/shop/categoryitems';
import InfoScreen from 'components/screens/public/shop/info';
import PublicShopReviewScreen from 'components/screens/public/shop/reviews';
import PublicShopStack from 'components/screens/stacks/publicshopstack';
import MainScreenStack from 'components/screens/stacks/mainscreenstack';
import AboutusScreen from 'components/screens/user/settings/aboutus';
import CurrencyScreen from 'components/screens/user/settings/currency';
import EditProfileScreen from 'components/screens/user/settings/editprofile';
import FeedbackScreen from 'components/screens/user/settings/feedback';
import PolicyScreen from 'components/screens/user/settings/policy';
import SecurityScreen from 'components/screens/user/settings/security';
import SettingsScreen from 'components/screens/user/settings/settings';
import FavoriteScreen from 'components/screens/user/settings/favorite';
import VourchersScreen from 'components/screens/user/settings/voucher';
import RedeemScreen from 'components/screens/user/settings/redeem';
import MapModal from 'components/screens/public/shop/mapmodal';
import FilterModal from 'components/modals/search/FilterModal';
import { isSignedIn } from 'services/auth';
import { Font } from 'expo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from 'reducers/index';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

let navigationOptions = { header: null };
let navigationOptionsWithBack = {
  //title: 'Back',
  headerTintColor: colors.secondary,
  headerLeftContainerStyle: {
    paddingBottom: 10,
    paddingTop: 10,
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
          title: 'Login',
          headerLeft: <HeaderBackButton tintColor={'#000'} onPress={() => state.params.onGoBack()} />,
        }
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;

        return {
          title: 'Sign Up With Email',
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
      navigationOptions: Object.assign({}, navigationOptionsWithBack, {
        title: 'Forgot Password'
      })
    },
    ItemDetail: {
      screen: ItemdetailScreen,
      navigationOptions: navigationOptions
    },
    PublicShop: {
      screen: PublicShopStack,
      navigationOptions: navigationOptions
    },
    MapModal: {
      screen: MapModal,
      navigationOptions: { ...navigationOptions }
    },
    FilterModal: {
      screen: FilterModal,
      navigationOptions: ({ navigation }) => {
        const { state } = navigation;
        return {
          ...navigationOptionsWithBack,
          title: 'Filter',
          headerRight: (<TouchableOpacity onPress={() => { state.params.onSearchPressed() }}><View><Text
            style={{ color: colors.secondary, fontSize: 18, paddingRight: 20 }}>Search</Text></View></TouchableOpacity>)
        }
      }
    },
    Info: {
      screen: InfoScreen,
      navigationOptions: Object.assign({}, navigationOptionsWithBack, {
        title: 'Information'
      })
    },
    PublicShopReview: {
      screen: PublicShopReviewScreen,
      navigationOptions: navigationOptions
    },
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
            paddingBottom: 10,
            paddingTop: 10,
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
      navigationOptions:  Object.assign({}, navigationOptionsWithBack, {
        title: 'Vouchers'
      })
    },
    Redeem: {
      screen: RedeemScreen,
      navigationOptions: navigationOptions
    },
    Favorites: {
      screen: FavoriteScreen,
      navigationOptions:  Object.assign({}, navigationOptionsWithBack, {
        title: 'Favorites'
      })
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
            paddingBottom: 10,
            paddingTop: 10,
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
            paddingBottom: 10,
            paddingTop: 10,
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
            paddingBottom: 10,
            paddingTop: 10,
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
      mode: 'card',
      transitionConfig: (transitionProps, prevTransitionProps, isModal) => ({
        screenInterpolator: (props) => {
          // Basically you need to create a condition for individual scenes
          if (props.scene.route.routeName === 'MapModal') {

            // forVertical makes the scene transition for Top to Bottom
            return StackViewStyleInterpolator.forVertical(props);
          }

          const last = props.scenes[props.scenes.length - 1];

          // This controls the transition when navigation back toa specific scene
          if (last.route.routeName === 'MapModal' || last.route.routeName === 'FilterModal') {

            // Here, forVertical flows from Top to Bottom
            return StackViewStyleInterpolator.forVertical(props);
          }

          return StackViewStyleInterpolator.forHorizontal(props);
        }
      })
    });
};
const store = createStore(allReducers);
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
  async componentDidMount() {
    isSignedIn()
      .then(res => {
        this.setState({ signedIn: res != undefined, checkedSignIn: true })
      })
      .catch(err => alert("An error occurred"));
  }
  render() {
    const { navigation } = this.props;
    const RootStack = createNavigator();
    const App = createAppContainer(RootStack);
    return <Provider store={store}>
      <App navigation={navigation} />
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
