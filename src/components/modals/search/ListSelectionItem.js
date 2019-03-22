import React from 'react';
import colors from 'assets/variables/colors';
import { TouchableOpacity, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class ListSelectionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<TouchableOpacity {...this.props} style={{ backgroundColor: colors.white, flexDirection: 'row', padding: 15 }}>
            <Text style={{ fontSize: 18, color: colors.greyDarken2, fontWeight: this.props.checked ? 'bold' : 'normal' }}>
                {this.props.label}
            </Text>
            <View style={{ marginLeft: 'auto' }}>
                {this.props.checked && <FontAwesome color={colors.secondary} name="check" size={18} />}
            </View>
        </TouchableOpacity>)
    }
}