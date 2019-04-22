import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { LoadingScreen, Title, WsTextInput } from 'components/modals/ws-modals';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from 'services/auth-user/auth-user';
import PasswordValidator from '../../../validators/password';

class SecurityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editLoading: false,
            isPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ onPressEdit: this.onPressEdit });
        this.getUser();
    }
    render() {
        return (
            this.state.loading ? <LoadingScreen loading={this.state.loading} title={'Loading...'} /> : (<View style={styles.container}>
                {this.state.editLoading && <LoadingScreen loading={this.state.editLoading} title={'Editing...'} />}
                <Title style={{paddingHorizontal: 20}}>Edit Password</Title>
                <ScrollView style={{ paddingHorizontal: 20, marginBottom: 50 }}>
                    {this.state.isPassword && <WsTextInput style={{ marginBottom: 20 }} title={'Old Password'}
                        textInput={{ onChangeText: this.onOldPasswordChanged, secureTextEntry: true, placeholder: 'Enter your old password', defaultValue: this.state.oldPassword }} />}
                    <WsTextInput style={{ marginBottom: 20 }} title={'New Password'}
                        textInput={{ onChangeText: this.onNewPasswordChanged, secureTextEntry: true, placeholder: 'Enter your new password', defaultValue: this.state.newPassword }}  />
                    <WsTextInput style={{ marginBottom: 20 }} title={'Confirm New Password'}
                        textInput={{ onChangeText: this.onConfirmNewPasswordChanged, secureTextEntry: true, placeholder: 'Enter your confirmation password', defaultValue: this.state.confirmNewPassword }}  />
                </ScrollView>
            </View>)
        );
    }
    // #region Events
    onOldPasswordChanged = (oldPassword) => {
        this.setState({ oldPassword });
    }
    onNewPasswordChanged = (newPassword) => {
        this.setState({ newPassword });
    }
    onConfirmNewPasswordChanged = (confirmNewPassword) => {
        this.setState({ confirmNewPassword });
    }
    onPressEdit = () => {
        let obj = {
            isPassword: this.state.isPassword,
            old_password: this.state.oldPassword,
            password: this.state.newPassword,
            confirm_password: this.state.confirmNewPassword
        }
        if (this.isValidated(obj)) {
            this.setState({editLoading: true});
            changePassword(obj, () => {
                this.setState({editLoading: false}, () => {
                    this.props.navigation.goBack();
                });
            }, (error) => {
                error = JSON.parse(error);
                this.props.onToast(error.message);
                this.setState({ editLoading: false});
            })
        }
    }
    // #endregion
    getUser(){
        this.setState({loading: true});
        let { user } = this.props;
        this.setState({
            loading: false,
            isPassword: user.exists_password
        })
    }
    isValidated(obj) {
        if (obj.isPassword && obj.old_password.trim() === '') {
            this.props.onToast('Old password is required!');
            return false;
        }
        else if (obj.password.trim() === '') {
            this.props.onToast('New password is required!');
            return false;
        }
        else if (!PasswordValidator.isMinLength(obj.password)) {
            this.props.onToast('Password should more than 7 characters!');
            return false;
        }
        else if (!PasswordValidator.isContainDigit(obj.password)) {
            this.props.onToast('Password should contain a digit!');
            return false;
        }
        else if (!PasswordValidator.isContainUppercase(obj.password)) {
            this.props.onToast('Password should contain an upper character!');
            return false;
        }
        else if (obj.confirm_password.trim() === '') {
            this.props.onToast('Confirm new password is required!');
            return false;
        }
        else if (obj.password !== obj.confirm_password) {
            this.props.onToast('Password is not matched!');
            return false;
        }
        return true;
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction, ...UserAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});