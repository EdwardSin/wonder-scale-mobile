import { FontAwesome } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class WsButton extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={.7} {...this.props} disabled={this.props.disabled}
                style={[styles.container, this.props.containerStyle]}>
                <View style={[styles.button,
                { backgroundColor: this.props.disabled ? colors.grey : this.props.style.backgroundColor || colors.secondary, borderColor: this.props.borderColor || colors.white },
                this.props.style]}>
                    {this.props.icon != undefined && <FontAwesome {...this.props.icon} size={16} />}
                    <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 5, color: this.props.textColor || colors.white }}>{this.props.children}</Text>
                    {this.props.disabled ? <ActivityIndicator size="small" color={colors.white} /> : (null)}
                </View>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});