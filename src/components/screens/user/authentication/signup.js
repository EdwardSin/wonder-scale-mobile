import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { LoadingScreen, WsDateTimePicker, WsPicker, WsTextInput } from 'components/modals/ws-modals';
import moment from 'moment';
import React from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from 'services/http/public/users';
import EmailValidator from 'validators/email';
import PasswordValidator from 'validators/password';

class SignUpScreen extends React.Component {
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
      loading: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPressSignUp: () => this.onPressSignUp(), disabled: false });

  }
  render() {
    return (
      <View style={styles.container}>
        <LoadingScreen loading={this.state.loading} title={'Loading...'} onRequestClose={this.requestClose} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: '5%', paddingBottom: '10%', paddingHorizontal: '10%' }}
          keyboardShouldPersistTaps='handled'>
          <WsTextInput placeholder={'Login Email'} onChangeText={this.onEmailChanged} keyboardType={'email-address'} value={this.state.email} />
          <WsTextInput placeholder={'First Name'} onChangeText={this.onFirstNameChanged} value={this.state.firstName} />
          <WsTextInput placeholder={'Last Name'} onChangeText={this.onLastNameChanged} value={this.state.lastName} />
          <WsTextInput placeholder={'Phone Number'} onChangeText={this.onTelChanged} keyboardType={"number-pad"} value={this.state.tel} />
          <WsPicker placeholder={'Gender'} onValueChange={this.onGenderValueChange} value={this.state.gender}
            customStyles={{ btnCancel: { color: colors.secondary } }}
            items={[{ label: 'Select Gender', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}></WsPicker>
          <WsTextInput placeholder={'Password'} onChangeText={this.onPasswordChanged} secureTextEntry={true} value={this.state.password} />
          <WsTextInput placeholder={'Confirmation Password'} onChangeText={this.onConfirmationPasswordChanged} secureTextEntry={true} value={this.state.confirmPassword} />
          <WsDateTimePicker style={{ marginBottom: 20 }} placeholder={'Birthday'} date={this.state.dateOfBirth} onDateChanged={this.onDateChanged} />
          <CheckBox containerStyle={styles.checkboxView} checkedColor={colors.secondary} checked={this.state.receiveInfo} onPress={this.onPressCheckbox} title="I'd like to receive marketing and policy communications fromWonderScale and its partners." />
        </ScrollView>
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
      loading: false
    })
  }
  // #region Event
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
        this.requestClose = this.signInSuccessCallback.bind(this, result);
        this.setState({ loading: false });
      }, (error) => {
        let err = JSON.parse(error);
        this.setState({ loading: false, callbackMessage: err.message });
      })
    }
    else {
      this.setState({ loading: false });
    }
  }
  onPressCheckbox = () => {
    this.setState({ receiveInfo: !this.state.receiveInfo });
  }
  onEmailChanged = (email) => {
    this.setState({ email });
  }
  onFirstNameChanged = (firstName) => {
    this.setState({ firstName });
  }
  onTelChanged = (tel) => {
    this.setState({ tel });
  }
  onLastNameChanged = (lastName) => {
    this.setState({ lastName });
  }
  onDateChanged = (dateOfBirth) => {
    this.setState({ dateOfBirth });
  }
  onGenderValueChange = (gender) => {
    this.setState({ gender });
  }
  onPasswordChanged = (password) => {
    this.setState({ password });
  }
  onConfirmationPasswordChanged = (confirmPassword) => {
    this.setState({ confirmPassword });
  }
  requestClose = () => {
    this.onRequestClose();
  }
  onRequestClose = () => {
    if (this.state.callbackMessage && this.state.callbackMessage != '') {
      alert(this.state.callbackMessage);
    }
    this.setState({ callbackMessage: '' });
  }
  // #endregion

  // #region Private Methods
  signInSuccessCallback(result) {
    if (result.result) {
      alert("Please verify your account by email and login again!");
      this.resetField();
      this.props.navigation.navigate('Main');
    }
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
      this.props.onToast("Email is required!");
      return false;
    }
    else if (!EmailValidator.isValid(email)) {
      this.props.onToast("Email is not valid!");
      return false;
    }
    else if (first_name.trim() == '') {
      this.props.onToast("First name is required!");
      return false;
    }
    else if (last_name.trim() == '') {
      this.props.onToast("Last name is required!");
      return false;
    }
    else if (tel.trim() == '') {
      this.props.onToast("Tel is required!");
      return false;
    }
    else if (gender.trim() == '' || gender == 'Select Gender') {
      this.props.onToast("Gender is required!");
      return false;
    }
    else if (password.trim() == '') {
      this.props.onToast("Password is required!");
      return false;
    }
    else if (!PasswordValidator.isMinLength(password)) {
      this.props.onToast("Password should more than 7 characters!");
      return false;
    }
    else if (!PasswordValidator.isContainDigit(password)) {
      this.props.onToast("Password should contain a digit!");
      return false;
    }
    else if (!PasswordValidator.isContainUppercase(password)) {
      this.props.onToast("Password should contain an upper character!");
      return false;
    }
    else if (confirm_password.trim() == '') {
      this.props.onToast("Confirmation Password is required!");
      return false;
    }
    else if (password !== confirm_password) {
      this.props.onToast("Password is not matched!");
      return false;
    }
    return true;
  }

  // #endregion
}
const mapStateToProps = state => {
  return {};
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  checkboxView: {
    width: '100%',
    paddingHorizontal: '10%',
    marginBottom: 30,
    borderWidth: 0,
    backgroundColor: 'transparent'
  }
});