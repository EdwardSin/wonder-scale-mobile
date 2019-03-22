import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from 'assets/variables/colors';

export default class LoadingSpinner extends React.Component {
  
  constructor(props){
    super(props);
  }
  render() {
    return (<View style={styles.container}>
      <ActivityIndicator size="small" color={colors.secondary}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 100,
    flex:1,
    backgroundColor: colors.white
  }
});