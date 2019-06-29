import * as MapAction from 'actions/map-reducer.action';
import { Location, Permissions } from 'expo';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from 'services/http/auth-user/auth-user';

class PermissionScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getLocationAsync();
        this.getUser();
    }
    getUser = () => {
        getUser((result) => {
            this.props.updateUser(result);
            this.setState({ user: result, loading: false });
        }, (err) => {
        })
    };
    async getLocationAsync() {
        let locationStatus, cameraStatus, cameraRollStatus;
        do {
            let permission = await Permissions.askAsync(Permissions.LOCATION);
            locationStatus = permission.status;
            if (locationStatus === 'denied') {
                await AsyncAlert('You must allow the location permission to use the app.');
            }
        }
        while (locationStatus === 'denied');
        do {
            let cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
            cameraStatus = cameraPermission.status;
            if (cameraStatus === 'denied') {
                await AsyncAlert('You must allow the camera permission to use the app.');
            }
        }
        while (cameraStatus === 'denied')
        do {
            let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            cameraRollStatus = cameraRollPermission.status;
            if (cameraRollStatus === 'denied') {
                await AsyncAlert('You must allow the camera roll permission to use the app.');
            }
        }
        while (cameraRollStatus === 'denied')
        if (locationStatus === 'granted') {
            let { coords } = await Location.getCurrentPositionAsync({ accuracy: 4 });
            let { latitude, longitude } = coords;
            this.props.onCurrentPosition({ latitude, longitude });
            this.props.onSearchCoordinates({ latitude, longitude });
        }
    }
    render() {
        return <View></View>
    }
}
const AsyncAlert = (message) => {
    return new Promise((resolve, reject) => {
        Alert.alert(
            'Message',
            message,
            [
                { text: "OK", onPress: () => { resolve('OK') } },
            ],
            { cancelable: false }
        )
    })
}
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PermissionScreen);

let styles = StyleSheet.create({

})