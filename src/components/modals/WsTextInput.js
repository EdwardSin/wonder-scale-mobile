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
      <View style={[styles.container, this.props.containerStyle]}>
        <TextInput {...this.props} underlineColorAndroid='transparent' clearButtonMode={'always'} style={[styles.textInput]} onBlur={this.onBlur} onFocus={this.onFocus} />
        {this.props.errorText == '' && <Text style={styles.errorText}>{this.props.errorText}</Text>}
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
    width: '100%',
    marginBottom: 15
  },
  textInput: {
    fontSize: 18,
    backgroundColor: colors.greyLighten3,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 5,
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