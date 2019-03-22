import colors from 'assets/variables/colors';
import countries from 'assets/variables/countries';
import { BottomButton, LoadingScreen, Title, WsPicker, WsTextInput } from 'components/modals/ws-modals';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sendEmail } from 'services/feature';


export default class FeedbackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            email: '',
            tel: '',
            country: '',
            comment: '',
            nameError: '',
            emailError: '',
            telError: '',
            countryError: '',
            commentError: '',
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
                <View style={{ padding: 20}}>
                    <Title>Give us feedback</Title>
                </View>
                <KeyboardAwareScrollView  style={{flex: 1, paddingHorizontal: 20}} extraHeight={75} >
                    <WsTextInput title={''} textInput={{ value: this.state.name, onChangeText: this.onNameChanged, placeholder: 'Enter your name' }} errorText={this.state.nameError} />
                    <WsTextInput title={''} textInput={{ value: this.state.email, onChangeText: this.onEmailChanged, keyboardType: 'email-address', placeholder: 'Enter your email' }} errorText={this.state.emailError} />
                    <WsTextInput title={''} textInput={{ value: this.state.tel, onChangeText: this.onTelChanged, placeholder: 'Enter your tel' }} errorText={this.state.telError} />
                    <WsPicker label={'Select Country'} onValueChange={ this.onCountryChanged} value={this.state.country} items={this.state.items} errorText={this.state.countryError} />
                    <WsTextInput title={''} textInput={{ value: this.state.comment, onChangeText: this.onCommentChanged, multiline: true, placeholder: 'Enter your comment' }} errorText={this.state.commentError} />
                </KeyboardAwareScrollView>
                
                <BottomButton>Submit</BottomButton>
            </View>);
    }

    onNameChanged = (name) => {
        this.setState({ name: name, nameError: '' });
    }
    onEmailChanged = (email) => {
        this.setState({ email: email, emailError: '' });
    }
    onTelChanged = (tel) => {
        this.setState({ tel: tel, telError: '' });
    }
    onCountryChanged = (country) => {
        this.setState({ country: country, countryError: '' });
    }
    onCommentChanged = (comment) => {
        this.setState({ comment: comment, commentError: '' });
    }
    onPressSubmit = () => {
        let obj = {
            name: this.state.name,
            email: this.state.email,
            tel: this.state.tel,
            country: this.state.country,
            comment: this.state.comment
        }
        this.setState({loading: true});
        if (this.isValidated(obj)) {
            sendEmail(obj, (result) => {
                this.setState({callbackMessage: result['message']});
                if(result['success']){
                    this.setState({
                        name: '',
                        email: '',
                        tel: '',
                        country: '',
                        comment: '',
                        nameError: '',
                        emailError: '',
                        telError: '',
                        countryError: '',
                        commentError: '',
                    })
                    this.props.navigation.goBack(null);
                    // const resetActions = StackActions.back({
                    //     index: 0,
                    //     key: null,
                    //     actions: [
                    //       NavigationActions.navigate({ routeName: 'Main' })
                    //     ],
                    //   });
                    //   this.props.navigation.dispatch(resetActions);
                }
                this.setState({loading: false});
            })
        }
    }
    onRequestClose = () => {
        if (this.state.callbackMessage && this.state.callbackMessage != '') {
            alert(this.state.callbackMessage);
        }
        this.setState({ callbackMessage: '' });
    }

    isValidated(obj) {
        if (obj.name.trim() === '') {
            this.setState({ nameError: 'Name is required!' });
            return false;
        }
        else if (obj.email.trim() === '') {
            this.setState({ emailError: 'Email is required!' });
            return false;
        }
        else if (obj.tel.trim() === '') {
            this.setState({ telError: 'Tel is required!' });
            return false;
        }
        else if (obj.country === 'Select Country') {
            this.setState({ countryError: 'Country is required!' });
            return false;
        }
        else if (obj.comment === '') {
            this.setState({ commentError: 'Comment is required!' });
            return false;
        }
        else if (obj.comment.length < 15) {
            this.setState({ commentError: 'At least 15 characters is required!' });
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