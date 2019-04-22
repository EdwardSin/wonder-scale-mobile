import colors from 'assets/variables/colors';
import { WsButton, WsTextInput } from 'components/modals/ws-modals';
import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';

export default class CreateShopScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopName: "",
            tel: "",
            language: '',
            telError: '',
            loading: false,
            shopNameError: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ borderRadius: 5, borderWidth: 1, borderColor: '#888', overflow: 'hidden', marginBottom: 10 }}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 40, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                        <Picker.Item label="Shopping" value="shopping" />
                        <Picker.Item label="Restaurant" value="restaurant" />
                        <Picker.Item label="Service" value="service" />
                    </Picker>
                </View>
                <WsTextInput placeholder="Shop Name" onChangeText={this.onShopNameChanged} value={this.state.shopName} />
                <Text style={styles.errorText}>{this.state.shopNameError}</Text>
                <WsTextInput placeholder="Tel" onChangeText={this.onTelChanged}
                    value={this.state.tel} />
                <Text style={styles.errorText}>{this.state.telError}</Text>
                <View style={{ width: 300, alignItems: 'flex-start', marginBottom: 5}}>
                    <Text >Read and agree the Wonder Scale's </Text>
                    <Text style={{ color: colors.main }} onPress={this.navigateToTermAndCondition}>Term and Conditions</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <WsButton disabled={this.state.loading} style={{ marginBotton: 10 }} onPress={this.onPressCreateShop}>Create</WsButton>
                    <WsButton onPress={this.navigateBack}>Back</WsButton>
                </View>
            </View>
        );
    }
    onShopNameChanged = (shopName) => {
        this.setState({ shopName: shopName });
        this.setState({ shopNameError: '' });
    }
    onTelChanged = (tel) => {
        this.setState({ tel: tel });
        this.setState({ telError: ''});
    }
    navigateBack = () => {
        this.props.navigation.goBack();
    }
    navigateToTermAndCondition = () =>{
        this.props.navigation.navigate('TermAndCondition');
    }
    onPressCreateShop = () => {
        if (this.state.shopName === "") {
            this.setState({ shopNameError: "Please enter a shop name!" });
        }
        else if (this.state.tel === '') {
            this.setState({ telError: "Please enter a contact tel!" });
        }
        else {
            this.setState({ loading: true });
            this.createShop();
            // onSignIn(this.state.email, this.state.password)
            // .then((result) => {
            //   if(result.success){
            //     //this.props.navigation.navigate("Latest")
            //   }
            //   else{
            //     this.setState({telError: result.message});
            //   }
            //   this.setState({createLoading: false});
            // }).catch(err => alert(err));
        }
    }

    createShop = () => {
        setTimeout(() => {
            this.setState({ loading: false});
        }, 3000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: colors.main,
        marginBottom: 5,
        fontSize: 15,
    },
    buttonContainer: {
        width: 300,
        borderRadius: 10
    }
});
