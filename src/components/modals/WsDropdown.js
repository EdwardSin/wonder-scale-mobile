import React from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Dimensions } from 'react-native';
import colors from 'assets/variables/colors';

const { height } = Dimensions.get('window');

export default class WsDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal {...this.props} transparent={true} visible={this.props.visible}>
                <TouchableOpacity style={styles.wrapper} activeOpacity={1} onPress={this.props.onPress}>
                    <View style={styles.buttonContainer}>
                        {this.props.children}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,.3)',
        zIndex: 1, 
        flex: 1, 
        width: '100%', 
        height: height, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: 1
    },
    buttonContainer: {
        backgroundColor: 'rgba(255, 255, 255, .7)',
        width: 200, 
        borderBottomColor: colors.lightGrey,
        borderRadius: 5, 
        overflow: 'hidden'
    }
})