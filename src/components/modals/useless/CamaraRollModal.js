import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, View, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import colors from 'assets/variables/colors';
import sizes from 'assets/variables/sizes';
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
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
        padding: sizes.padding2,
        backgroundColor: colors.lightenGrey,
        marginBottom: sizes.margin2
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        width: sizes.w100,
        height: sizes.h100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        marginTop: sizes.margin1,
        marginBottom: sizes.margin1
    }
});
