import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'assets/variables/colors';

export default class Title extends React.Component {
    render() {
        return (<View {...this.props} style={{ marginBottom: 10, marginTop: 20}}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.greyDarken2 }}>{this.props.children}</Text>
        </View>);
    }
}
const styles = StyleSheet.create({
});