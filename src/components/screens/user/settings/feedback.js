import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import countries from 'assets/variables/countries';
import { LoadingScreen, Title, WsPicker, WsTextInput } from 'components/modals/ws-modals';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendEmail } from 'services/http/public/feature';

class FeedbackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            email: '',
            tel: '',
            country: '',
            comment: '',
            items: []
        };
    }
    componentDidMount() {
        let items = [{ label: 'Select Country', value: '' }];
        this.props.navigation.setParams({ onPressSubmit: this.onPressSubmit });
        for (let key of Object.keys(countries)) {
            items.push({ label: countries[key], value: key });
        }
        this.setState({ items: items });
    }
    render() {
        return (
            <View style={styles.container} >
                <LoadingScreen loading={this.state.loading} title={'Loading...'} onRequestClose={this.onRequestClose} />
                <Title style={{ paddingHorizontal: 20 }}>Give us feedback</Title>
                <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 20 }} extraHeight={75} >
                    <WsTextInput placeholder={'Enter your name'} onChangeText={this.onNameChanged} value={this.state.name} />
                    <WsTextInput placeholder={'Enter your email'} value={this.state.email} onChangeText={this.onEmailChanged} keyboardType={'email-address'} />
                    <WsTextInput placeholder={'Enter your tel'} value={this.state.tel} onChangeText={this.onTelChanged} />
                    <WsPicker style={{ marginBottom: 10 }} label={'Select Country'} onValueChange={this.onCountryChanged} value={this.state.country} items={this.state.items} />
                    <WsTextInput placeholder={'Enter your comment'} value={this.state.comment} onChangeText={this.onCommentChanged} multiline={true} />
                </KeyboardAwareScrollView>
            </View>);
    }

    onNameChanged = (name) => {
        this.setState({ name });
    }
    onEmailChanged = (email) => {
        this.setState({ email });
    }
    onTelChanged = (tel) => {
        this.setState({ tel });
    }
    onCountryChanged = (country) => {
        this.setState({ country });
    }
    onCommentChanged = (comment) => {
        this.setState({ comment });
    }
    onPressSubmit = () => {
        let obj = {
            name: this.state.name,
            email: this.state.email,
            tel: this.state.tel,
            country: this.state.country,
            comment: this.state.comment
        }
        this.setState({ loading: true });
        if (this.isValidated(obj)) {
            sendEmail(obj, (result) => {
                this.setState({ callbackMessage: result['message'] });
                if (result['success']) {
                    this.resetForm();
                    this.props.navigation.goBack(null);
                }
                this.setState({ loading: false });
            })
        }
        else {
            this.setState({ loading: false });
        }
    }
    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            tel: '',
            country: '',
            comment: ''
        })
    }
    onRequestClose = () => {
        if (this.state.callbackMessage && this.state.callbackMessage != '') {
            alert(this.state.callbackMessage);
        }
        this.setState({ callbackMessage: '' });
    }

    isValidated(obj) {
        if (obj.name.trim() === '') {
            this.props.onToast('Name is required!');
            return false;
        }
        else if (obj.email.trim() === '') {
            this.props.onToast('Email is required!');
            return false;
        }
        else if (obj.tel.trim() === '') {
            this.props.onToast('Tel is required!');
            return false;
        }
        else if (obj.country === 'Select Country') {
            this.props.onToast('Country is required!');
            return false;
        }
        else if (obj.comment === '') {
            this.props.onToast('Comment is required!');
            return false;
        }
        else if (obj.comment.length < 15) {
            this.props.onToast('At least 15 characters is required!');
            return false;
        }
        return true;
    }
}


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});