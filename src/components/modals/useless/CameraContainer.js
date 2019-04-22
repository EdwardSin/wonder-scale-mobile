import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'assets/variables/colors';
import LoadingScreen from 'components/modals/LoadingScreen';
import { Camera, ImageManipulator, Permissions } from 'expo';
import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

export default class CameraContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
            modalVisible: false,
            innermodalVisible: false,
            imageLoading: false,
            photo: {},
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        };
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                
                <Modal {...this.props} visible={this.props.visible} animationType={'slide'} >
                    {this.state.imageLoading && <LoadingScreen title={'Loading'}/>}
                    <View style={{ flex: 1, backgroundColor: '#000' }}>
                        <View style={{ flex: .7, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Camera ref={cam => this.camera = cam} autoFocus={Camera.Constants.AutoFocus.on} style={{ width: width, height: width }} 
                            whiteBalance={Camera.Constants.WhiteBalance.auto}
                            type={this.state.type}></Camera>
                        </View>
                        <View style={{
                                flex: .3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 3
                            }}>
                            <Text style={{ color: colors.white, position: 'absolute', left: 20, bottom: 45, fontSize: 20 }} onPress={this.props.onPressModalClose}>Cancel</Text>
                            <View style={{ alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    borderRadius: 50,
                                    padding: 8,
                                    borderWidth: 3,
                                    borderColor: 'rgba(255,255,255, .8)',
                                    marginBottom: 20}}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'rgba(255,255,255, .7)',
                                        height: 60,
                                        width: 60,
                                        borderRadius: 50
                                    }}
                                    onPress={this.takePhoto}
                                >
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: 'flex-end', position: 'absolute', right: 25, bottom: 25 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Ionicons name={'ios-reverse-camera'} size={50} color={'rgb(255,255,255)'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Modal visible={this.state.innermodalVisible} animationType={'slide'}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.black }}>
                            <Image source={{ uri: `data:image;base64,${this.state.photo.base64}`}} style={styles.preview} />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 25, backgroundColor: colors.black }}>
                            <Text onPress={this.cancelInnerModal} style={{ flex: 1, fontSize: 20, color: colors.white }}>Cancel</Text>
                            <Text onPress={this.confirmPhoto} style={{ flex: 1, fontSize: 20, textAlign: 'right', color: colors.white }}>Confirm</Text>
                        </View>
                    </Modal>
                </Modal>
            );
        }
    }
    takePhoto = async () => {
        this.setState({imageLoading: true});
        await this.camera.takePictureAsync({
            base64: true,
            exif: false
        }).then(async photo => {
            let action = this.state.type === Camera.Constants.Type.front ? {flip: { horizontal: true }} :  {};
            const manipResult = await ImageManipulator.manipulateAsync(photo.uri,  [action], {base64: true});
            this.setState({imageLoading: false , photo: manipResult}, () => {
                this.setState({innermodalVisible: true});
            });
        })
        .catch(err => {alert(err); });
    }
    confirmPhoto = () => {

    }
    cancelInnerModal = () => {
        this.setState({ innermodalVisible: false, photo: {} });
    }
}

const styles = StyleSheet.create({
    preview: {
        height: width,
        width: width
    }
});
