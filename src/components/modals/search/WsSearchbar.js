import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default class WsSearchbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View style={[{ height: 55, flexDirection: 'row', backgroundColor: colors.greyLighten3, borderRadius: 5 }, this.props.containerStyle]}>
            <TouchableOpacity onPress={this.props.onPress} style={{ justifyContent: 'center', alignItems: 'center', width: 45 }}>
                {this.props.icon == undefined ? <Ionicons name={'ios-search'} size={30} color={colors.greyDarken1} /> : this.props.icon}
            </TouchableOpacity>
            <TextInput {...this.props} style={styles.textInput} />
        </View>)
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        width: '100%'
    },
    searchBarContainer: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: colors.greyLighten3
    }
});
