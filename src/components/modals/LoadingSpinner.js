import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from 'assets/variables/colors';

export default class LoadingSpinner extends React.Component {
  
  constructor(props){
    super(props);
  }
  render() {
    return (<View {...this.props} style={[styles.container, this.props.style]}>
      <ActivityIndicator size="small" color={colors.secondary}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    flex:1,
    backgroundColor: colors.white
  }
});