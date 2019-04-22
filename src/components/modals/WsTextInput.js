import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default class WsTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false
    }
  }
  render() {
    return (
      <View  {...this.props} style={[styles.container, this.props.style]}>
        <Text>{this.props.title}</Text>
        <TextInput {...this.props.textInput} underlineColorAndroid='transparent' style={[styles.textInput]} onBlur={this.onBlur} onFocus={this.onFocus} />
        <Text style={styles.errorText}>{this.props.errorText}</Text>
      </View>
    );
  }
  onFocus = () => {
    this.setState({
      onFocus: true
    })
  }
  onBlur = () => {
    this.setState({
      onFocus: false
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textInput: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.greyLighten2
  },
  iconStyle: {
    position: 'absolute',
    right: 10,
    top: 25
  },
  errorText: {
    color: colors.primary,
    width: '100%',
    textAlign: 'right'
  }
});