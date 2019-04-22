import React from 'react';
import { View, StyleSheet, Picker, Text } from 'react-native';
import colors from '../../variables/colors';

export default class WsTextInput extends React.Component {
  render() {
    return (
      <View  {...this.props} style={[styles.container, this.props.style]}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 5,
    borderBottomWidth: 1,
    borderColor: colors.greyLighten1,
    
  },
  textInput: {
    fontSize: 20,
    width: 300,
    padding: 5,
    paddingHorizontal: 5,
    color: colors.greyDarken1
  }
});