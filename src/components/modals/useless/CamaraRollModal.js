import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import colors from 'assets/variables/colors';
const { width } = Dimensions.get('window');

export default class CameraRollModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraRollPermission: null,
            imageIndex: 0,
            modalVisible: false,
            image: null
        };
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    }
    render() {
        let { image, hasCameraRollPermission } = this.state;
        let { visible } = this.props
        if (hasCameraRollPermission === null) {
            return <View />;
        } else if (hasCameraRollPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Modal {...this.props} visible={visible} animationType={'slide'} transparent={true}>
                    <View style={{ flex: 1, backgroundColor: colors.white }}>
                        <Text onPress={this.props.onPressModalClose} style={{ fontSize: 30 }}>Cancel</Text>
                        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
                </Modal>)
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: 'Images'
        });

        if (!result.cancelled) {
            this.setState({ image: result['uri'] });
        }
    };
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: colors.greyLighten5,
        marginBottom: 10
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        marginVertical: 5
    }
});
