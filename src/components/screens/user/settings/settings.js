import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { Title } from 'components/modals/ws-modals';
import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { onSignOut } from 'services/auth';
export const WS_Currency = "ws-currency";

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selectedCurrency: ''
        };
    }
    componentDidMount(){
        this.getCurrency();
    }
    getCurrency = () => {
        AsyncStorage.getItem(WS_Currency)
            .then(res => {
                if (res) {
                    this.setState({
                        selectedCurrency: res,
                        list: [
                            { name: 'Currency - ' + res, icon: { name: 'logo-usd' }, onPress: this.onPressCurrency.bind(this) },
                            { name: 'Security', icon: {name: 'ios-lock'}, onPress: this.onPressSecurity.bind(this) },
                            { name: 'Give us feedback', icon: { name: 'ios-mail', type: 'ionicon' }, onPress: this.onFeedbackPress.bind(this) },
                            { name: 'Policy', icon: { name: 'ios-paper', type: 'ionicon' }, onPress: this.onPolicyPress.bind(this) },
                            { name: 'About Us', icon: { name: 'ios-help-circle-outline', type: 'ionicon' }, onPress: this.onAboutusPress.bind(this) },
                            { name: 'Log out', icon: { name: 'ios-log-out' }, onPress: this.onLogoutPress.bind(this) }]
                    });
                } else {
                    this.setState({
                        selectedCurrency: 'EUR', 
                        list: [{ name: 'Currency - ' + 'EUR', icon: { name: 'logo-usd' }, onPress: this.onPressCurrency.bind(this) },
                        { name: 'Security', icon: {name: 'ios-lock'}, onPress: this.onPressSecurity.bind(this) },
                        { name: 'Give us feedback', icon: { name: 'ios-mail', type: 'ionicon' }, onPress: this.onFeedbackPress.bind(this) },
                        { name: 'Policy', icon: { name: 'ios-paper', type: 'ionicon' }, onPress: this.onPolicyPress.bind(this) },
                        { name: 'About Us', icon: { name: 'ios-help-circle-outline', type: 'ionicon' }, onPress: this.onAboutusPress.bind(this) },
                        { name: 'Log out', icon: { name: 'ios-log-out' }, onPress: this.onLogoutPress.bind(this) }]
                    });
                }
            })
            .catch(err => err);
    }

    render() {
        return (<View style={styles.container}>
            <Title style={{ paddingHorizontal: 20}}>Settings</Title>
            <ScrollView>    
                {this.state.list.map((item, index) =>
                    (<ListItem key={index} title={item.name} rightIcon={
                        <Ionicons name={item.icon.name} color={colors.greyDarken2} size={35} />}
                        containerStyle={{paddingHorizontal: 20, paddingVertical: 15, borderBottomColor: colors.greyLighten2 }}
                        titleStyle={{ marginLeft: 0 }}
                        onPress={item.onPress}></ListItem>)
                )}
            </ScrollView>
            
        </View>);
    }

    onPressCurrency() {
        this.props.navigation.navigate('Currency', { getCurrency: () => this.getCurrency() });
    }
    onPressSecurity(){
        this.props.navigation.navigate('Security');
    }
    onFeedbackPress() {
        this.props.navigation.navigate('Feedback');
      }
      onPolicyPress() {
        this.props.navigation.navigate('Policy');
      }
      onAboutusPress() {
        this.props.navigation.navigate('Aboutus');
      }
    onLogoutPress = () => {
        onSignOut().then(() => {
            const resetActions = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: 'Main' })
                ],
            });
            this.props.navigation.dispatch(resetActions);
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});