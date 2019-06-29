import colors from 'assets/variables/colors';
import { Constants } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';




class WsStatusBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View {...this.props} style={[styles.statusbar, this.props.style]}></View>
    }
}
const styles = StyleSheet.create({
    statusbar: {
        height: Constants.statusBarHeight,
        backgroundColor: colors.secondary
    }
});
export default WsStatusBar;