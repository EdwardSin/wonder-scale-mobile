import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class WsSlashText extends React.Component {
  render() {
    return (
      <View  {...this.props} style={[styles.container, this.props.style]}>
        <View style={[styles.crossLineStyle, this.props.crossLineStyle]}></View>
        <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    paddingLeft: '10%',
    paddingRight:  '10%',
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.black,
    backgroundColor: colors.greyLighten5
  },
  crossLineStyle: {
    height: 1,
    width: '100%',
    backgroundColor: colors.black,
    position: 'absolute',
    top: '50%'
  }
});