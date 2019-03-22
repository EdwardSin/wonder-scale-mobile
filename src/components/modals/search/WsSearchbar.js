import { View, StyleSheet, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import colors from 'assets/variables/colors';
import React from 'react';

export default class WsSearchbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<View style={[{ height: 30, flexDirection: 'row' }, this.props.containerStyle]}>
            <TextInput {...this.props} placeholder={this.props.placeholder} style={styles.textInput} onChangeText={this.props.onChangeText}
                onFocus={this.props.onFocus}/>
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
        //backgroundColor: colors.secondary
        backgroundColor: colors.white
    },
    searchBarInputContainer: {
        backgroundColor: colors.greyDarken3
        //backgroundColor: colors.white
    },
    searchBarInput: {
        //color: colors.white,
        //backgroundColor: colors.greyDarken3,
        //backgroundColor: colors.white
        marginHorizontal: 0
    },
});
