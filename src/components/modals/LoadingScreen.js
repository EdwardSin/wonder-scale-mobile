import colors from 'assets/variables/colors';
import React from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native';

const { height, width } = Dimensions.get('window');
export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal {...this.props} visible={this.props.loading} transparent={true}
                onDismiss={this.props.onRequestClose} onRequestClose={() => { }}>
                <View style={styles.modalContainer}>
                    <View style={styles.container}>
                        <View style={[styles.innerContainer]}>
                            <ActivityIndicator size="small" /><Text style={styles.textLoading}>  {this.props.title}</Text>
                        </View>
                    </View>
                </View>
            </Modal>);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    innerContainer: {
        height: 120,
        width: 240,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width,
        zIndex: 3,
        backgroundColor: '#73737399'
    },
    textLoading: {
        textAlign: 'center',
        fontSize: 18
    }
});