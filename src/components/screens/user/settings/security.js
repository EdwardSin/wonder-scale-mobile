import colors from 'assets/variables/colors';
import { LoadingScreen, Title, WsTextInput } from 'components/modals/ws-modals';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { changePassword, getUser } from 'services/auth/auth-user';
import PasswordValidator from '../../../validators/password';

export default class SecurityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editLoading: false,
            isPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            oldPasswordError: '',
            newPasswordError: '',
            confirmNewPasswordError: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ onPressEdit: this.onPressEdit });
        this.setState({loading: true});
        getUser((result) => {
            let user = result;
            this.setState({
                loading: false,
                isPassword: user.existsPassword
            })
        })
    }
    render() {
        return (
            this.state.loading ? <LoadingScreen loading={this.state.loading} title={'Loading...'} /> : (<View style={styles.container}>
                {this.state.editLoading && <LoadingScreen loading={this.state.editLoading} title={'Editing...'} />}
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Title>Edit Password</Title>
                </View>
                <ScrollView style={{ padding: 20, marginBottom: 50 }}>
                    {this.state.isPassword && <WsTextInput style={{ marginBottom: 20 }} title={'Old Password'}
                        textInput={{ onChangeText: this.onOldPasswordChanged, secureTextEntry: true, placeholder: 'Enter your old password', defaultValue: this.state.oldPassword }}
                        errorText={this.state.oldPasswordError} />}
                    <WsTextInput style={{ marginBottom: 20 }} title={'New Password'}
                        textInput={{ onChangeText: this.onNewPasswordChanged, secureTextEntry: true, placeholder: 'Enter your new password', defaultValue: this.state.newPassword }}
                        errorText={this.state.newPasswordError} />
                    <WsTextInput style={{ marginBottom: 20 }} title={'Confirm New Password'}
                        textInput={{ onChangeText: this.onConfirmNewPasswordChanged, secureTextEntry: true, placeholder: 'Enter your confirmation password', defaultValue: this.state.confirmNewPassword }}
                        errorText={this.state.confirmNewPasswordError} />
                </ScrollView>
            </View>)
        );
    }
    onOldPasswordChanged = (oldPassword) => {
        this.setState({ oldPasswordError: '', oldPassword: oldPassword });
    }
    onNewPasswordChanged = (newPassword) => {
        this.setState({ newPasswordError: '', newPassword: newPassword });
    }
    onConfirmNewPasswordChanged = (confirmNewPassword) => {
        this.setState({ confirmNewPasswordError: '', confirmNewPassword: confirmNewPassword });
    }
    onPressEdit = () => {
        let input = {
            isPassword: this.state.isPassword,
            oldPassword: this.state.oldPassword,
            password: this.state.newPassword,
            confirmPassword: this.state.confirmNewPassword
        }
        if (this.isValidated(input)) {
            this.setState({editLoading: true});
            changePassword(input, () => {
                this.setState({editLoading: false}, () => {
                    this.props.navigation.goBack();
                });
            })
        }
        // if (this.isValidated(user)) {
        //     editUserInfo(user, (result) => {
        //         this.setState({ editLoading: false }, () => {
        //             if (result && result.message) {
        //                 this.setState({ callbackMessage: result.message });
        //             }
        //             else {
        //                 this.props.navigation.goBack();
        //             }
        //         });
        //     })
        // }
        // else {
        //     this.setState({ editLoading: false });
        // }
    }
    isValidated(obj) {
        if (obj.isPassword && obj.oldPassword.trim() === '') {
            this.setState({ oldPasswordError: 'Old password is required!' });
            return false;
        }
        else if (obj.password.trim() === '') {
            this.setState({ newPasswordError: 'New password is required!' });
            return false;
        }
        else if (!PasswordValidator.isMinLength(obj.password)) {
            this.setState({ newPasswordError: "Password should more than 7 characters!" });
            return false;
        }
        else if (!PasswordValidator.isContainDigit(obj.password)) {
            this.setState({ newPasswordError: "Password should contain a digit!" });
            return false;
        }
        else if (!PasswordValidator.isContainUppercase(obj.password)) {
            this.setState({ newPasswordError: "Password should contain an upper character!" });
            return false;
        }
        else if (obj.confirmPassword.trim() === '') {
            this.setState({ confirmNewPasswordError: 'Confirm new password is required!' });
            return false;
        }
        else if (obj.password !== obj.confirmPassword) {
            this.setState({ confirmNewPasswordError: "Password is not matched!" });
            return false;
        }
        return true;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});