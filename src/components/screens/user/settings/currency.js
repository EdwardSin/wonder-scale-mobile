import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import { Title } from 'components/modals/ws-modals';
import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements';

export const WS_Currency = "ws-currency";

export default class CurrencyScreen extends React.Component {

    currency = new Currency();

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            index: 0,
            selectedCurrency: '',
            list: this.currency.displayedCurrencies
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ saveCurrency: () => this.saveCurrency() });
        AsyncStorage.getItem(WS_Currency)
        .then(res => {
            if (res != null) {
                this.setState({selectedCurrency: res});
            } else {
                this.setState({selectedCurrency: 'EUR'});
            }
        })
        .catch(err => err);
    }

    render() {
        return (<View style={styles.container}>
            <ScrollView>
                <View style={{paddingLeft:20, paddingRight: 20}}>
                    <Title>Currency</Title>
                </View>
                {this.state.list.map((item, index) => (
                <ListItem key={index}
                    title={this.currency.currencyFullName[item] + ' - ' + this.currency.currencySymbols[item]} 
                    rightIcon={<Ionicons size={35} color={ colors.secondary} name={item === this.state.selectedCurrency? 'ios-checkmark-circle' :'ios-radio-button-off'} />}
                    containerStyle={{ paddingHorizontal: 40, paddingVertical: 15, borderBottomColor: colors.greyLighten2}}
                    // underlayColor={colors.greyLighten4}
                    // wrapperStyle={{marginLeft: 0}}
                    titleStyle={{marginLeft: 0}}
                    onPress={() => this.selectCurrency(item)}></ListItem>))}
            </ScrollView>
        </View>);
    }
    selectCurrency = (item) => {
        this.setState({selectedCurrency: item});
    }
    saveCurrency = () => {
        AsyncStorage.setItem(WS_Currency, this.state.selectedCurrency);
        this.props.navigation.goBack();
        this.props.navigation.state.params.getCurrency();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});