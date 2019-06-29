import React from 'react';
import { Text, View } from 'react-native';

export default class EmptyList extends React.Component {
    render() {
        return (<View {...this.props} style={[{ alignItems: 'center', paddingVertical: 70, flex: 1 }, this.props.containerStyle]} >
            <Text style={[this.props.textStyle, { textAlign: 'center' }]}>{this.props.message || 'No item displayed!'}</Text>
        </View>)
    }
}