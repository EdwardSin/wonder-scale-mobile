import colors from 'assets/variables/colors';
import { BottomButton, WsTextInput } from 'components/modals/ws-modals';
import EmailValidator from 'components/validators/email';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      emailError: '',
      email: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WsTextInput style={{ marginBottom: 10, paddingLeft: '10%', paddingRight: '10%'}} 
          title={'Email'} errorText={this.state.emailError} textInput={{onChangeText: this.onEmailChanged, value:this.state.email}} />
        <Text style={styles.text} onPress={this.onPressBack}>Back</Text>
        <BottomButton onPress={this.onPressSend}>Submit</BottomButton>
      </View>
    );
  }

  onEmailChanged = (email) => {
    this.setState({email: email});
  }
  onPressSend = () => {
    if(!EmailValidator.isValid(this.state.email)){
      this.setState({ emailError: "Please enter a valid email!" });
    }
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightenGrey,
    alignItems: 'center',
    paddingTop: 80
  },
  errorText:{
    color: colors.main,
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 15
  }
});