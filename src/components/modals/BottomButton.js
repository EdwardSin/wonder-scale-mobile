import colors from 'assets/variables/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class BottomButton extends React.Component {

    render(){
        return (<TouchableOpacity activeOpacity={.8} {...this.props} style={styles.container}>
             <View style={[this.props.style, styles.button, 
                 { backgroundColor: this.props.disabled ? colors.grey : this.props.backgroundColor || colors.secondary, borderColor: this.props.borderColor || colors.white }]}>
                 { this.props.disabled && <ActivityIndicator size="small" color={colors.white}/>}
                 <Text style={{ fontSize: 16, marginHorizontal: 5, color: this.props.textColor || colors.white }}>{this.props.children}</Text>
             </View>
             </TouchableOpacity>)
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    button: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});