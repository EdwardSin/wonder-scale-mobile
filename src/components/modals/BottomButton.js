import colors from 'assets/variables/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class BottomButton extends React.Component {

    render(){
        return (<TouchableOpacity {...this.props} style={styles.container}>
             <View style={[this.props.style, styles.button, 
                 { backgroundColor: this.props.disabled ? colors.grey : this.props.backgroundColor || colors.secondary, borderColor: this.props.borderColor || colors.white }]}>
                 <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 5, color: this.props.textColor || colors.white }}>{this.props.children}</Text>
                 { this.props.disabled ? <ActivityIndicator size="small" color={colors.white}/>: (null)}
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
        paddingTop: 17,
        paddingBottom: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});