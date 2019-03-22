import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

export default class PictureSelect extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal {...this.props} visible={this.props.visible} transparent={true} onRequestClose={this.props.onRequestClose}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(153,153,153,.5)' }} >
                        {/* onPress={() => { this.props.onPressModalClose() }}> */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <View style={{ padding: 20, width: width }}>
                                <TouchableOpacity onPress={this.props.onPressUpload}
                                    style={[styles.buttonStyle, styles.buttonSeperator, { borderBottomEndRadius: 0, borderBottomLeftRadius: 0 }]}>
                                    <Text style={styles.textStyle}>Take Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.onPressCameraRoll}
                                    style={[styles.buttonStyle, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
                                    <Text style={styles.textStyle}>Choose Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.onPressModalClose}
                                    style={[styles.buttonStyle, { marginTop: 10 }]}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.white
    },
    buttonSeperator: {
        borderBottomWidth: 1,
        borderColor: 'rgba(153,153,153,.5)'
    },
    textStyle: {
        color: colors.blue,
        textAlign: 'center',
        fontSize: 20
    }
});
