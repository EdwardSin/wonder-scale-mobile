import colors from 'assets/variables/colors';
import { WsButton, WsTextInput } from 'components/modals/ws-modals';
import EmailValidator from 'components/validators/email';
import { Facebook, Google } from 'expo';
import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Divider } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { WS_Token, onSignIn } from 'services/auth';
import { addUserByFb, addUserByGoogle } from 'services/users';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      loading: false
    }
    //this.props.navigation.setParams({ onGoBack: () => this.onGoBack() });
    this.props.navigation.setParams({ onGoBack: () => this.props.navigation.goBack() });
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <View style={styles.container}>
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.loginText}>Wonder Scale</Text>
          </View>

          <View style={{ paddingLeft: '10%', paddingRight: '10%', width: '100%' }}>
            <WsTextInput title={'Email'}
              errorText={this.state.emailError}
              textInput={{ onChangeText: this.onEmailChanged, keyboardType: "email-address", value: this.state.email }}
            />
            <WsTextInput title={'Password'}
              errorText={this.state.passwordError}
              textInput={{ onChangeText: this.onPasswordChanged, secureTextEntry: true, value: this.state.password }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text} onPress={this.onPressForgotPassword}>Forgot Password?</Text>
            <Text style={styles.text} onPress={this.onPressSignUp}>Sign-up</Text>
          </View>
          <WsButton icon={{ name: 'sign-in' , color: colors.white}} style={[styles.button, { marginBottom: 10 }]} disabled={this.state.loading} onPress={this.onPressLogin}>Login</WsButton>
          <View style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }}>
            <Divider style={{ backgroundColor: colors.greyLighten1, width: '100%', marginVertical: 10 }} />
          </View>
          <WsButton icon={{ name: 'facebook' , color: colors.white}} style={[styles.button, {marginVertical: 10, backgroundColor: colors.facebookColor }]} onPress={this.onPressFBLogin}>Log in with Facebook</WsButton>
          <WsButton icon={{ name: 'google-plus', color: colors.white}} textColor={colors.white}  style={[styles.button, { marginBottom: 10, backgroundColor: colors.googleColor }]} onPress={this.onPressGoogleLogin}>Log in with Google</WsButton>
        </ScrollView>
      </View>
    );
  }
  onEmailChanged = (email) => {
    this.setState({ email: email, emailError: '' });
  }
  onPasswordChanged = (password) => {
    this.setState({ password: password, passwordError: '' });
  }
  onPressFBLogin = async () => {
    try {
      const { type, token, expires, } = await Facebook.logInWithReadPermissionsAsync('246047829574930', { permissions: ['public_profile', 'email'] });
      if (type === 'success') {
        const result = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture.width(300).height(300),birthday`).then(
          res => res.json());
        let user = {
          first_name: result.name.substring(0, result.name.lastIndexOf(" ")).trim(),
          last_name: result.name.substring(result.name.lastIndexOf(" ")).trim(),
          email: result.email,
          receive_info: true,
          profile_image: result.picture.data.url
        };
        addUserByFb(user, (result) => {
          this.setState({ signupLoading: false });
          if (result && result.token) {
            AsyncStorage.setItem(WS_Token, result.token);
            const resetActions = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'Main' })
              ],
            });
            this.props.navigation.dispatch(resetActions);
          }
        })
      }
      else {
        //return { cancelled: true };
      }
    }
    catch (err) {
      alert(err);
    }

  }
  onPressGoogleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '783575719474-il6tb6ac701ugae1cfc0v0pt4trmr5rd.apps.googleusercontent.com',
        iosClientId: '783575719474-onrf7g2prkrl5d0kqegcq4eb4b39s16f.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web'
      })

      if (result.type === 'success') {
        this.setState({ signupLoading: true });
        let user = {
          first_name: result.user.givenName,
          last_name: result.user.familyName,
          email: result.user.email,
          receive_info: true,
          profile_image: result.user.photoUrl
        }
        addUserByGoogle(user, (result) => {
          this.setState({ signupLoading: false });
          if (result && result.token) {
            AsyncStorage.setItem(WS_Token, result.token);
            const resetActions = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'Main' })
              ],
            });
            this.props.navigation.dispatch(resetActions);
          }
        });
      } else {
        //return { cancelled: true };
      }
    } catch (e) {
      console.log(e);
      //return { error: true };
    }
  }
  onPressLogin = () => {
    if (this.state.email === "") {
      this.setState({ emailError: "Please enter a valid email!" });
    }
    else if (!EmailValidator.isValid(this.state.email)) {
      this.setState({ emailError: "Please enter a valid email!" });
    }
    else if (this.state.password === '') {
      this.setState({ passwordError: "Please enter a valid password!" });
    }
    else {
      this.setState({ loading: true });
      onSignIn(this.state.email, this.state.password, (result) => {
        if (result.result) {
          this.setState({ passwordError: "", emailError: "", email: "", password: "", loading: false });
          AsyncStorage.setItem(WS_Token, result.token);
          //this.props.navigation.navigate("Latest");
          const resetActions = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' })
            ],
          });
          this.props.navigation.dispatch(resetActions);

        }
        else {
          this.setState({ passwordError: result.message });
        }
      })
    }
  }
  onPressSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
  onPressForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }
  onGoBack = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' })
      ]
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: 30
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  errorText: {
    color: colors.main,
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    textAlign: 'right'
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