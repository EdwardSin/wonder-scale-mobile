import React from 'react';
import { StyleSheet, Button, View, Picker, PickerIOS } from 'react-native';
import colors from 'assets/variables/colors';

export class WSPickerIOS extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <PickerIOS selectedValue={this.props.value} onValueChange={this.updateValue}>
            <PickerIOS.Item label="Select" value=""/>
            <PickerIOS.Item label="Male" value="male"/>
            <PickerIOS.Item label="Female" value="female"/>
          </PickerIOS>
      </View>
      
    );
  }
  updateValue = () => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.greyLighten4
  }
});
