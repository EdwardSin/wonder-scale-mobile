import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { BottomButton, WsTextInput } from 'components/modals/ws-modals';
import EmailValidator from 'components/validators/email';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendPasswordLinkToEmail } from 'services/users';

class ForgotPasswordScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      loading: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <WsTextInput style={{ marginBottom: 10, paddingHorizontal: '10%'}} title={'Email'} 
              textInput={{onChangeText: this.onEmailChanged, keyboardType: "email-address", value:this.state.email}} />
        <Text style={styles.text} onPress={this.onBackPress}>Back</Text>
        <BottomButton disabled={this.state.loading} onPress={this.onSendPress}>Submit</BottomButton>
      </View>
    );
  }

  onEmailChanged = (email) => {
    this.setState({email});
  }
  onSendPress = () => {
    if(!EmailValidator.isValid(this.state.email)){
      this.props.onToast("Please enter a valid email!");
    }
    else{
      this.sendPasswordLinkToEmail();
    }
  }
  sendPasswordLinkToEmail(){
    this.setState({ loading: true });
    sendPasswordLinkToEmail(this.state.email, (result) => {
      this.props.onToast(result.message);
      this.setState({ loading: false, email: '' });
      this.props.navigation.goBack();
    }, (err) => {
      this.setState({ loading: false });
      this.props.onToast(err);
    })
  }
  onBackPress = () => {
    this.props.navigation.goBack();
  }
}
const mapStateToProps = state => {
  return { };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80
  },
  text: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 15
  }
});