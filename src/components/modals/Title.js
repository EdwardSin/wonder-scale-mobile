import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Title extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<View {...this.props} style={[styles.textContainer, this.props.style]}>
            <Text style={styles.text}>{this.props.children}</Text>
        </View>);
    }
}
const styles = StyleSheet.create({
    textContainer: {
        marginBottom: 10,
        marginTop: 20
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.greyDarken2
    }
});