import colors from 'assets/variables/colors';
import { BottomButton, LoadingScreen, WsDateTimePicker, WsPicker, WsTextInput, WsStatusBar } from 'components/modals/ws-modals';
import EmailValidator from 'components/validators/email';
import PasswordValidator from 'components/validators/password';
import moment from 'moment';
import React from 'react';
import { AsyncStorage, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { WS_Token, onSignInWithoutActivated } from 'services/auth';
import { addUser } from 'services/users';

export default class SignUpScreen extends React.Component {
  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth() + 1;
  yyyy = this.today.getFullYear();
  ddAsString;
  mmAsString;

  constructor(props) {
    super(props);
    if (this.dd < 10) {
      this.ddAsString = '0' + this.dd;
    }

    if (this.mm < 10) {
      this.mmAsString = '0' + this.mm
    }

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      tel: '',
      gender: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: this.mmAsString + "/" + this.mmAsString + "/" + this.yyyy,
      receiveInfo: true,
      emailError: '',
      passwordError: '',
      firstNameError: '',
      lastNameError: '',
      telError: '',
      genderError: '',
      dateOfBirthError: '',
      confirmPasswordError: '',
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPressSignUp: () => this.onPressSignUp(), disabled: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <WsStatusBar />
        <LoadingScreen loading={this.state.loading} title={'Loading...'} onRequestClose={this.onRequestClose} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 30, paddingBottom: 60, paddingLeft: '10%', paddingRight: '10%' }}
          keyboardShouldPersistTaps='handled'>
          <WsTextInput title={'Login Email'} textInput={{ onChangeText: this.onEmailChanged, keyboardType: 'email-address', value: this.state.email }} errorText={this.state.emailError} />
          <WsTextInput title={'First Name'} textInput={{ onChangeText: this.onFirstNameChanged, value: this.state.firstName }}
            errorText={this.state.firstNameError} />
          <WsTextInput title={'Last Name'} textInput={{ onChangeText: this.onLastNameChanged, value: this.state.lastName }}
            errorText={this.state.lastNameError} />
          <WsTextInput title={'Phone Number'} textInput={{ onChangeText: this.onTelChanged, keyboardType: "number-pad", value: this.state.tel }} errorText={this.state.telError} />
          <WsPicker title={'Gender'} onValueChange={this.onGenderValueChange} value={this.state.gender}
            customStyles={{ btnCancel: { color: colors.secondary } }}
            items={[{ label: 'Select Gender', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}></WsPicker>
          <WsTextInput title={'Password'} textInput={{ onChangeText: this.onPasswordChanged, secureTextEntry: true, value: this.state.password }} errorText={this.state.passwordError} />
          <WsTextInput title={'Confirmation Password'} textInput={{ onChangeText: this.onConfirmationPasswordChanged, secureTextEntry: true, value: this.state.confirmPassword }} errorText={this.state.confirmPasswordError} />
          <WsDateTimePicker style={{ marginBottom: 20 }} title={'Birthday'} date={this.state.dateOfBirth} onDateChanged={this.onDateChanged} errorText={this.state.dateOfBirthError} />
          <CheckBox containerStyle={styles.checkboxView} checkedColor={colors.secondary} checked={this.state.receiveInfo} onPress={this.onPressCheckbox} title="I'd like to receive marketing and policy communications fromWonderScale and its partners." />
        </ScrollView>
        <BottomButton onPress={this.onPressSignUp}>Sign up</BottomButton>
      </View>
    );
  }
  resetField = () => {
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      tel: '',
      gender: 'Select Gender',
      password: '',
      confirmPassword: '',
      dateOfBirth: this.dd + "/" + this.mm + "/" + this.yyyy,
      receiveInfo: true,
      emailError: '',
      firstNameError: '',
      lastNameError: '',
      telError: '',
      genderError: '',
      dateOfBirthError: '',
      confirmPasswordError: '',
      loading: false
    })
  }
  onPressSignUp = () => {
    let date = moment(this.state.dateOfBirth, 'DD/MM/YYYY').toDate();
    let user = {
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      tel: this.state.tel,
      gender: this.state.gender,
      password: this.state.password,
      confirm_password: this.state.confirmPassword,
      date_of_birth: date,
      receive_info: this.state.receiveInfo
    }
    Keyboard.dismiss();
    this.setState({ loading: true });
    if (this.isValidated(user)) {

      addUser(user, (result) => {
        this.setState({ loading: false }, () => {
          if (result && result.message) {
            this.setState({ callbackMessage: result.message });
          }
          else {
            onSignInWithoutActivated(this.state.email, this.state.password, (result) => {
              if (result.result) {
                alert("Please verify your account by email later!");
                AsyncStorage.setItem(WS_Token, result.token);
                this.props.navigation.navigate('Main');
                this.resetField();
              }
            })
          }
        });
      })
    }
    else {
      this.setState({ loading: false });
    }
  }
  onRequestClose = () => {
    if (this.state.callbackMessage && this.state.callbackMessage != '') {
      alert(this.state.callbackMessage);
    }
    this.setState({ callbackMessage: '' });
  }
  isValidated(user) {
    let email = user.email;
    let first_name = user.first_name;
    let last_name = user.last_name;
    let tel = user.tel;
    let gender = user.gender;
    let password = user.password;
    let confirm_password = user.confirm_password;
    if (email.trim() == '') {
      this.setState({ emailError: "Email is required!" });
      return false;
    }
    else if (!EmailValidator.isValid(email)) {
      this.setState({ emailError: "Email is not valid!" });
      return false;
    }
    else if (first_name.trim() == '') {
      this.setState({ firstNameError: "First name is required!" });
      return false;
    }
    else if (last_name.trim() == '') {
      this.setState({ lastNameError: "Last name is required!" });
      return false;
    }
    else if (tel.trim() == '') {
      this.setState({ telError: "Tel is required!" });
      return false;
    }
    else if (gender.trim() == '' || gender == 'Select Gender') {
      this.setState({ genderError: "Gender is required!" });
      return false;
    }
    else if (password.trim() == '') {
      this.setState({ passwordError: "Password is required!" });
      return false;
    }
    else if (!PasswordValidator.isMinLength(password)) {
      this.setState({ passwordError: "Password should more than 7 characters!" });
      return false;
    }
    else if (!PasswordValidator.isContainDigit(password)) {
      this.setState({ passwordError: "Password should contain a digit!" });
      return false;
    }
    else if (!PasswordValidator.isContainUppercase(password)) {
      this.setState({ passwordError: "Password should contain an upper character!" });
      return false;
    }
    else if (confirm_password.trim() == '') {
      this.setState({ confirmPasswordError: "Confirmation Password is required!" });
      return false;
    }
    else if (password !== confirm_password) {
      this.setState({ confirmPasswordError: "Password is not matched!" });
      return false;
    }
    return true;
  }
  onPressCheckbox = () => {
    this.setState({ receiveInfo: !this.state.receiveInfo });
  }
  onEmailChanged = (email) => {
    this.setState({ emailError: '', email: email });
  }
  onFirstNameChanged = (first_name) => {
    this.setState({ firstNameError: '', firstName: first_name });
  }
  onTelChanged = (tel) => {
    this.setState({ telError: '', tel: tel });
  }
  onLastNameChanged = (last_name) => {
    this.setState({ lastNameError: '', lastName: last_name });
  }
  onDateChanged = (birthday) => {
    this.setState({ dateOfBirthError: '', dateOfBirth: birthday });
  }
  onGenderValueChange = (gender) => {
    this.setState({ genderError: '', gender: gender });
  }
  onPasswordChanged = (password) => {
    this.setState({ passwordError: '', confirmPasswordError: '', password: password });
  }
  onConfirmationPasswordChanged = (confirm_password) => {
    this.setState({ confirmPasswordError: '', passwordError: '', confirmPassword: confirm_password });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLighten5
  },
  checkboxView: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginBottom: 30,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
});