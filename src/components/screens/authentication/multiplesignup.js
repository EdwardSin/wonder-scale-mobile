import colors from 'assets/variables/colors';
import { LoadingScreen, WsButton } from 'components/modals/ws-modals';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


export default class MultipleSignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signupLoading: false
    }
  }

  render() {
    return (<View style={styles.container}>
      {this.state.signupLoading && <LoadingScreen title={'Authenticated...\nSigning in...'} />}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
          </View>
          <WsButton iconName={'envelope'} iconColor={colors.white} style={{ marginBottom: 10 }} onPress={this.onPressSignUp} >Sign up with Email Address</WsButton>
          <Text style={{ marginTop: 20 }} onPress={() => { this.props.navigation.goBack(); }}>Back</Text>
        </View>
      </ScrollView>
    </View>)
  }
  
  onPressSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLighten5
  }
});