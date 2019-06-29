import { Feather } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingScreen, PictureSelect, Title, WsDateTimePicker, WsPicker, WsTextInput } from 'components/modals/ws-modals';
import { ImagePicker, Permissions } from 'expo';
import Moment from 'moment';
import React from 'react';
import { Alert, Animated, Dimensions, Image, ImageEditor, Keyboard, Linking, Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { editGeneralUrl, getUser } from 'services/http/auth-user/auth-user';

export default class EditProfileScreen extends React.Component {
    genders = [{ label: 'Select Gender', value: '' }, { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editLoading: false,
            user: {},
            list: [],
            firstName: '',
            lastName: '',
            tel: '',
            dateOfBirth: '',
            gender: '',
            emailError: '',
            firstNameError: '',
            lastNameError: '',
            telError: '',
            genderError: '',
            dateOfBirthError: '',
            isUploadedImage: false,
            isGenderOpen: false,
            isBirthOpen: false,
            selectVisible: false,
            cameraRollModalVisible: false,
            uploadModalVisible: false,
            profileImage: '',
            callbackMessage: '',
            uploadImage: null,
            hasCameraPermission: null,
            hasCameraRollPermission: null,
            bounceValue: new Animated.Value(Dimensions.get('screen').height),
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ onPressEdit: this.onPressEdit });
        this.setState({ loading: true });
        getUser((result) => {
            let user = result;
            this.setState({
                loading: false, user: user,
                firstName: user.firstName,
                lastName: user.lastName,
                tel: user.tel,
                uploadImage: user.profile_image,
                gender: user.gender,
                isUploadedImage: false,
                dateOfBirth: Moment(user.date_of_birth).format('DD/MM/YYYY')
            })
        })
    }

    render() {
        return this.state.loading ? <LoadingScreen loading={this.state.loading} title={'Loading...'} /> : (<View style={styles.container}>
            <LoadingScreen loading={this.state.editLoading} title={'Loading...'} onRequestClose={this.onRequestClose} />
            <Animated.View style={{ height: this.state.bounceValue }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Title>Edit Profile</Title>
                </View>
                <KeyboardAwareScrollView extraHeight={150}>
                    <View style={{ position: 'relative', height: 300, flex: 1, backgroundColor: colors.greyLighten4 }}>
                        <Feather onPress={() => this.onPressSelect(!this.state.selectVisible)} style={styles.iconStyle} name="camera" size={35} color={colors.white} />
                        {this.state.uploadImage && <Image style={{ height: 300, width: 300, alignSelf: 'center', resizeMode: 'contain' }} source={{ uri: this.state.uploadImage }} />}

                    </View>
                    <View style={{ padding: 20, marginBottom: 50 }}>
                        <WsTextInput style={{ marginBottom: 20 }} placeholder={'Enter your email'} defaultValue={this.state.user.email} editable={false} selectTextOnFocus={false} errorText={this.state.emailError} />
                        <WsTextInput style={{ marginBottom: 20 }} onChangeText={this.onFirstNameChanged} placeholder={'Enter your first name'} defaultValue={this.state.firstName} errorText={this.state.firstNameError} />
                        <WsTextInput style={{ marginBottom: 20 }} onChangeText={this.onLastNameChanged} placeholder={'Enter your last name'} defaultValue={this.state.lastName} errorText={this.state.lastNameError} />
                        <WsTextInput style={{ marginBottom: 20 }} onChangeText={this.onTelChanged} placeholder={'Enter your tel'} defaultValue={this.state.tel} errorText={this.state.telError} />
                        <WsPicker style={{ marginBottom: 20 }} title={'Gender'} onValueChange={this.onGenderValueChange} value={this.state.gender} customStyles={{ btnCancel: { color: colors.main } }} items={this.genders} />
                        <WsDateTimePicker style={{ marginBottom: 20 }} date={this.state.dateOfBirth}
                            onDateChanged={this.onDateChanged} title={'Birthday'} errorText={this.state.dateOfBirthError} />
                    </View>
                </KeyboardAwareScrollView>
            </Animated.View>
            <PictureSelect visible={this.state.selectVisible}
                onRequestClose={() => { }}
                onPressUpload={this.onPressUpload}
                onPressCameraRoll={this.onPressCameraRoll}
                onPressModalClose={this.onPressSelectClose} />
        </View>);
    }
    cropImage = () => {
        return new Promise((resolve, reject) => ImageEditor.cropImage(this.state.profileImage,
            { offset: { x: 0, y: 0 }, size: { width: 300, height: 300 }, resizeMode: 'contain' }, (uri) => {
                resolve(uri);
            }, (err) => reject(err)));
    }
    onPressSelect = (value) => {
        this.setState({ selectVisible: value });
    }
    onPressUpload = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted', selectVisible: false });
        Permissions.getAsync(Permissions.CAMERA).then(async status => {
            if (status.status === 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true
                })
                if (!result.cancelled) {
                    this.setState({ uploadImage: `data:image;base64,${result['base64']}`, isUploadedImage: true });
                }
            }
            else {
                if (Platform.OS === 'ios') {
                    Alert.alert('Permission Required',
                        'Wonder Scale needs permission to access your device\' camera to take a photo.\nPlease go to Settings > Privacy > Camera, and enable Wonder Scale.',
                        [{ text: 'Not Now' }, {
                            text: 'Go to Settings', onPress: () => {
                                Linking.openURL('app-settings:');
                            }
                        }]);
                }
                else {

                }
            }
        })
    }
    onPressCameraRoll = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted', selectVisible: false });
        Permissions.getAsync(Permissions.CAMERA_ROLL).then(async status => {
            if (status.status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    mediaTypes: 'Images'
                });
                if (!result.cancelled) {
                    this.setState({ uploadImage: `data:image;base64,${result['base64']}`, isUploadedImage: true });
                }
            }
            else {
                if (Platform.OS === 'ios') {
                    Alert.alert('Permission Required',
                        'Wonder Scale needs permission to access your photo library to select a photo.\nPlease go to Settings > Privacy > Photos, and enable Wonder Scale.',
                        [{ text: 'Not Now' }, {
                            text: 'Go to Settings', onPress: () => {
                                Linking.openURL('app-settings:');
                            }
                        }]);
                }
                else {

                }
            }

        })
    }
    onPressSelectClose = () => {
        this.setState({ selectVisible: false });
    }
    onPressUploadClose = () => {
        this.setState({ uploadModalVisible: false });
    }
    onPressCameraRollClose = () => {
        this.setState({ cameraRollModalVisible: false });
    }
    onPressEdit = () => {
        let date = Moment(this.state.dateOfBirth, 'DD/MM/YYYY').toDate();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            tel: this.state.tel,
            gender: this.state.gender,
            date_of_birth: date,
            profile_image: this.state.profileImage,
            is_uploaded_image: this.state.isUploadedImage
        }
        Keyboard.dismiss();
        this.setState({ editLoading: true });
        if (this.isValidated(user)) {
            editGeneralUrl(user, (result) => {
                this.setState({ editLoading: false }, () => {
                    if (result && result.message) {
                        this.setState({ callbackMessage: result.message });
                    }
                    else {
                        this.props.navigation.goBack();
                    }
                });
            })
        }
        else {
            this.setState({ editLoading: false });
        }
    }
    onRequestClose = () => {
        if (this.state.callbackMessage && this.state.callbackMessage != '') {
            alert(this.state.callbackMessage);
        }
        this.setState({ callbackMessage: '' });
    }
    isValidated(user) {
        let firstName = user.firstName || '';
        let lastName = user.lastName || '';
        let tel = user.tel || '';
        let gender = user.gender || '';

        if (firstName.trim() === '') {
            this.setState({ firstNameError: "First name is required!" });
            return false;
        }
        else if (lastName.trim() === '') {
            this.setState({ lastNameError: "Last name is required!" });
            return false;
        }
        else if (tel.trim() === '') {
            this.setState({ telError: "Tel is required!" });
            return false;
        }
        else if (gender.trim() == '' || gender == 'Select Gender') {
            this.setState({ genderError: "Gender is required!" });
            return false;
        }
        return true;
    }
    onFirstNameChanged = (firstName) => {
        this.setState({ firstNameError: '', firstName: firstName });
    }
    onTelChanged = (tel) => {
        this.setState({ telError: '', tel: tel });
    }
    onLastNameChanged = (lastName) => {
        this.setState({ lastNameError: '', lastName: lastName });
    }
    onDateChanged = (birthday) => {
        this.setState({ dateOfBirthError: '', dateOfBirth: birthday });
    }
    onGenderValueChange = (gender) => {
        this.setState({ genderError: '', gender: gender });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    iconStyle: {
        position: 'absolute',
        zIndex: 3,
        right: 20,
        bottom: 15
    }
});