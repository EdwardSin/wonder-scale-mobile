import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';


export default class MapIcon extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View  {...this.props} style={[styles.mapIcon, this.props.style]}>
                <TouchableOpacity onPress={this.props.onPress} style={{ width: '100%', height: '100%' }} >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="map-marker" size={35} color={colors.secondary} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mapIcon: {
        position: 'absolute',
        backgroundColor: colors.white,
        borderRadius: 27.5,
        width: 55,
        height: 55,
        bottom: 20,
        right: 30,
        zIndex: 3,
        shadowColor: colors.greyLighten1,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        elevation: 3
    }
});