import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'assets/variables/colors';

export default class FooterTab extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
  onPressSignUp = () => {
    //call to api
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
});