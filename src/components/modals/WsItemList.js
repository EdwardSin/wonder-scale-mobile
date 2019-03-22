import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import WsItem from './WsItem';

const {width} = Dimensions.get('window');


export default class WsItemList extends React.Component {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
            <WsItem navigation={this.props.navigation} showFollow={true} item={this.props.item}></WsItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 5,
    width: width/2
  }
});