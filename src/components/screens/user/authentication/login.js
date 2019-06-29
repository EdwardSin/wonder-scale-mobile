import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { WsButton, WsTextInput } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Facebook, Google } from 'expo';
import React from 'react';
import { AsyncStorage, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onSignIn, WS_Token } from 'services/http/public/auth';
import { addUserByFb, addUserByGoogle } from 'services/http/public/users';
import EmailValidator from 'validators/email';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    }
    this.props.navigation.setParams({ onGoBack: () => this.props.navigation.goBack() });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
            <Image style={{ width: 60, height: 60 }} source={require('' + 'assets/icons/icon-front.png')} />
            <Text style={styles.loginText}>Wonder Scale</Text>
          </View>
          <View style={{ paddingHorizontal: '10%', width: '100%' }}>
            <WsTextInput placeholder={'Email'} keyboardType={'email-address'} onChangeText={this.onEmailChanged} value={this.state.email} />
            <WsTextInput placeholder={'Password'} onChangeText={this.onPasswordChanged} secureTextEntry={true} value={this.state.password} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text} onPress={this.onPressForgotPassword}>Forgot Password?</Text>
            <Text style={styles.text} onPress={this.onPressSignUp}>Sign-up</Text>
          </View>
          <WsButton icon={{ name: 'sign-in', color: colors.white }} style={[styles.button, { marginBottom: 10 }]} disabled={this.state.loading} onPress={this.onPressLogin}>Login</WsButton>
          <View style={{ width: '100%', paddingHorizontal: '10%' }}>
            <Divider style={{ backgroundColor: colors.greyLighten1, width: '100%', marginVertical: 10 }} />
          </View>
          <WsButton icon={{ name: 'facebook', color: colors.white }} style={[styles.button, { marginVertical: 10, backgroundColor: colors.facebookColor }]} onPress={this.onPressFBLogin}>Log in with Facebook</WsButton>
          <WsButton icon={{ name: 'google-plus', color: colors.white }} textColor={colors.white} style={[styles.button, { marginBottom: 10, backgroundColor: colors.googleColor }]} onPress={this.onPressGoogleLogin}>Log in with Google</WsButton>
        </ScrollView>
      </View>
    );
  }
  // #region Events
  onEmailChanged = (email) => {
    this.setState({ email: email });
  }
  onPasswordChanged = (password) => {
    this.setState({ password: password });
  }
  onPressFBLogin = async () => {
    try {
      this.setState({ loading: true });
      const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(environments.FB_API, { permissions: ['public_profile', 'email'] });
      if (type === 'success') {
        const result = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture.width(300).height(300),birthday`).then(res => res.json());
        let user = {
          first_name: result.name.substring(0, result.name.lastIndexOf(" ")).trim(),
          last_name: result.name.substring(result.name.lastIndexOf(" ")).trim(),
          email: result.email,
          receive_info: true,
          profile_image: result.picture.data.url
        };
        addUserByFb(user, this.loginSuccessCallback.bind(this), this.loginFailCallback.bind(this))
      }
      else {
        this.setState({ loading: false });
      }
    }
    catch (err) {
      this.props.onToast(err);
    }
  }
  onPressGoogleLogin = async () => {
    try {
      this.setState({ loading: true });
      const result = await Google.logInAsync({
        androidClientId: environments.GOOGLE_ANDROID_API,
        iosClientId: environments.GOOGLE_IOS_API,
        scopes: ['profile', 'email'],
        behavior: 'web'
      })
      if (result.type === 'success') {
        let user = {
          first_name: result.user.givenName,
          last_name: result.user.familyName,
          email: result.user.email,
          receive_info: true,
          profile_image: result.user.photoUrl
        }
        addUserByGoogle(user, this.loginSuccessCallback.bind(this), this.loginFailCallback.bind(this));
      }
      else {
        this.setState({ loading: false });
      }
    } catch (err) {
      this.props.onToast(err);
    }
  }
  onPressLogin = () => {
    if (this.state.email === "") {
      this.props.onToast("Please enter a valid email!");
    }
    else if (!EmailValidator.isValid(this.state.email)) {
      this.props.onToast("Please enter a valid email!");
    }
    else if (this.state.password === '') {
      this.props.onToast("Please enter a valid password!");
    }
    else {
      this.setState({ loading: true });
      onSignIn(this.state.email, this.state.password, this.loginSuccessCallback.bind(this), this.loginFailCallback.bind(this))
    }
  }
  loginSuccessCallback(result) {
    this.setState({ loading: false });
    this.props.updateUser(result.user);
    AsyncStorage.setItem(WS_Token, result.token);
    this.props.navigation.dispatch(this.resetActions);
  }
  loginFailCallback(err) {
    err = JSON.parse(err);
    if (err && err.message) {
      this.props.onToast(err.message);
    }
    else {
      this.props.onToast('Server Error! Try again later');
    }
    this.setState({ loading: false });
  }
  resetActions = StackActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: 'Main' })
    ],
  })
  onPressSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
  onPressForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }
  // #endregion
}


const mapStateToProps = state => {
  return {};
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction, ...UserAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: '10%'
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  textContainer: {
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 15
  }
});