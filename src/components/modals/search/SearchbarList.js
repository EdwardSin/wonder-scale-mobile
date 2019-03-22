import React from 'react';
import { StyleSheet, View, ScrollView, Switch, Text, StatusBar, TextInput, Button, TouchableOpacity, Dimensions, Keyboard, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import colors from 'assets/variables/colors';
import { bindActionCreators } from 'redux';
import WsSearchbar from './WsSearchbar';
import WsDropDown from '../WsDropdown';
import ListSelectionItem from './ListSelectionItem';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import environments from 'environments/environment';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
    onKeywordSearchbarChanged, onKeywordSearchbarServicePressed, onKeywordSearchbarTypePressed,
    onKeywordSearchbarFocused, onOptionOrderPressed, onOptionTypePressed, onOptionCurrentlyOpenPressed,
    onLocationSearchbarChanged, onLocationSearchbarPressed, onCoordinatesChanged, onMarkersDisplayed
} from 'actions/map-reducer-action';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const TypeButton = ({ onPress, list, title }) => (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: colors.greyDarken2 }}>{title}</Text>
            <Text style={{ paddingVertical: 5, fontSize: 13, color: colors.greyDarken2 }}>Select type.</Text>

            <RadioForm radioStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
                selectedButtonColor={colors.secondary}
                buttonColor={colors.secondary}
                labelColor={colors.greyDarken2}
                animation={false}
                radio_props={list}
                initial={0}
                onPress={onPress}
            />
        </View>
    </View>
)
const OrderButton = ({ onPress, list, title }) => (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, color: colors.greyDarken2 }}>{title}</Text>
            <Text style={{ paddingVertical: 5, fontSize: 13, color: colors.greyDarken2 }}>Select ordering method.</Text>

            <RadioForm radioStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
                selectedButtonColor={colors.secondary}
                buttonColor={colors.secondary}
                labelColor={colors.greyDarken2}
                animation={false}
                radio_props={list}
                initial={0}
                onPress={onPress}
            />
        </View>
        {/* <View style={{marginLeft: 'auto', flexDirection: 'row'}} >
                <Text style={{fontSize: 18, color: colors.greyDarken2, paddingHorizontal: 5}}>{value}</Text>
                <FontAwesome name="sort" size={25} />
            </View> */}
    </View>
    // <TouchableOpacity onPress={onPress} >
    // </TouchableOpacity>
)

const CurrentlyOpenSwitch = ({ currentlyOpen, onValueChange }) => (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Text style={{ fontSize: 18, color: colors.greyDarken2 }}>Currently Open</Text>
            <Text style={{ paddingVertical: 5, fontSize: 13, color: colors.greyDarken2 }}>Only the currenly open shops will be displayed.</Text>
        </View>
        <Switch style={{ marginLeft: 'auto' }} thumbColor={colors.secondary} trackColor={{ true: colors.greyLighten1 }}
            value={currentlyOpen} onValueChange={onValueChange} />
    </View>
)

const DisplayButton = ({ onPress, name }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ justifyContent: 'center', marginLeft: 'auto', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }} >
            <FontAwesome color={colors.greyDarken2} name={name} size={24} />
        </View>
    </TouchableOpacity>
)

class SearchbarList extends React.Component {
    valueChanged = _.debounce((text) => { this.getSearchingLocations(text) }, 500)

    constructor(props) {
        super(props);
        this.state = {
            keywordSearchingResults: [],
            searchingResults: [],
            keywordFocused: false,
            locationFocused: false,
            locationLoading: false,
            orderList: [{ label: 'The Best', value: 'thebest' },
            { label: 'Relevance', value: 'relevance' },
            { label: 'A - Z', value: 'alphabet' },
            { label: 'Price', value: 'price' },
            { label: 'Review', value: 'review' }],
            typeList: [{ label: 'Restaurant', value: 'restaurant' },
            { label: 'Shopping', value: 'shopping' },
            { label: 'Service', value: 'service' }
            ]
        }
    }

    cancelButton = () => {
        return (<TouchableOpacity style={{ position: 'absolute', right: 20, top: 35 }} onPress={() => {
            this.setState({
                keywordFocused: false,
                locationFocused: false
            })
        }}>
            <Ionicons name={'ios-close-circle-outline'} size={30} color={'rgba(0,0,0,.7)'} />
        </TouchableOpacity>)
    }
    renderKeywordContainer = () => {
        return (<Modal visible={this.state.keywordFocused} onShow={() => { this.keywordSearchbar.focus(); }}>
            <View style={{ height: Constants.statusBarHeight }}></View>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                <TextInput
                    ref={(input) => { this.keywordSearchbar = input }}
                    placeholder={'Keyword...'}
                    style={{ fontSize: 20 }}
                    loading={this.props.loading} value={this.props.locationValue}
                    onChangeText={(text) => {
                        this.props.onKeywordSearchbarChanged(text);
                        this.onKeywordValueChanged(text);
                    }} />
            </View>
            {this.cancelButton()}
            <ScrollView style={{ flex: 1, padding: 20, zIndex: 9, width: '100%' }}
                keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                {this.state.keywordSearchingResults.map(item => {
                        return (<TouchableOpacity key={item.locationId} onPress={() => { }}>
                            <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <FontAwesome name={'map-marker'} size={25} color={colors.secondary} />
                                <Text style={{ paddingHorizontal: 10, alignSelf: 'center', fontSize: 17 }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>)
                    })
                }
            </ScrollView>
        </Modal>)
    }
    renderLocationContainer = () => {
        return (<Modal visible={this.state.locationFocused} onShow={() => { this.searchbar.focus(); }}>
            <View style={{ height: Constants.statusBarHeight }}></View>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                <TextInput
                    ref={(input) => { this.searchbar = input }}
                    placeholder={'Location...'}
                    style={{ fontSize: 20 }}
                    loading={this.props.loading} value={this.props.locationValue}
                    onChangeText={(text) => {
                        this.props.onLocationSearchbarChanged(text);
                        this.valueChanged(text);
                    }} />
            </View>
            {this.cancelButton()}
            <ScrollView style={{ flex: 1, padding: 20, zIndex: 9, width: '100%' }}
                keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>

                {_.union([{ key: 'Current Location', name: 'Current Location', locationId: '1' }],
                    this.state.searchingResults.map((x, i) => { return { key: x.address + i, name: x.address, locationId: x.locationId } }))
                    .map(item => {
                        return (<TouchableOpacity key={item.locationId} onPress={() => {
                            Keyboard.dismiss();
                            this.props.onLocationSearchbarPressed(item.name);
                            this.setState({ locationFocused: false });
                            this.geocode(item.locationId, (res) => {
                                if (res.Response.View.length) {
                                    let latitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                                    let longitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                                    let coordinates = { latitude, longitude };
                                    this.props.onCoordinatesChanged(
                                        {
                                            ...coordinates,
                                            latitudeDelta: this.props.mapSetting.latitudeDelta,
                                            longitudeDelta: this.props.mapSetting.longitudeDelta
                                        }
                                    );
                                    this.getNearestShops(longitude, latitude, this.props.mapSetting.radius);
                                }
                            });
                        }
                        }>
                            <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <FontAwesome name={'map-marker'} size={25} color={colors.secondary} />
                                <Text style={{ paddingHorizontal: 10, alignSelf: 'center', fontSize: 17 }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>)
                    })
                }
            </ScrollView>
        </Modal>)
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%', paddingHorizontal: 20 }} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <WsSearchbar {...this.props}
                            placeholder={'Keyword...'}
                            loading={this.props.loading} value={this.props.value}
                            onFocus={() => {
                                this.setState({ keywordFocused: true});
                            }}
                            onChangeText={this.props.onKeywordSearchbarChanged}
                        />
                    </View>

                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <WsSearchbar
                            placeholder={'Location...'}
                            loading={this.props.loading} value={this.props.locationValue}
                            onFocus={() => {
                                this.setState({ locationFocused: true });
                            }} />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <CurrentlyOpenSwitch currentlyOpen={this.props.currentlyOpen} onValueChange={this.props.onOptionCurrentlyOpenPressed} />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <TypeButton onPress={() => this.props.onOptionTypePressed(this.props.order)}
                            list={this.state.typeList}
                            title={'Type'}
                        />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <OrderButton onPress={() => this.props.onOptionOrderPressed(this.props.order)}
                            list={this.state.orderList}
                            title={'Order By'}
                        />
                    </View>
                </ScrollView>
                {this.renderKeywordContainer()}
                {this.renderLocationContainer()}
            </View>
        )
    }

    getOrderAsString(variable) {
        switch (variable) {
            case 'thebest': return 'The Best';
            case 'relevance': return 'Relevance';
            case 'alphabet': return 'A - Z';
            case 'price': return 'Price';
            case 'review': return 'Review';
            default: return '';
        }
    }

    getTypeAsString(variable) {
        switch (variable) {
            case 'all': return 'All';
            case 'restaurant': return 'Restaurant';
            case 'service': return 'Service';
            case 'shopping': return 'Shopping';
            default: return '';
        }
    }
    onOptionOrderPressed = (value) => {
        this.props.onOptionOrderPressed(value);
    }
    onKeywordValueChanged = (keyword) => {
        this.setState({
            keywordSearchingResults: []
        })
    }
    getSearchingLocations = (query) => {
        if (query == '') {
            this.setState({ searchingResults: [] });
        }

        fetch('https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json?' +
            `app_id=${environments.HERE_APP_API}` +
            `&app_code=${environments.HERE_APP_CODE}` +
            `&query=${query}` +
            '&maxresults=10' +
            '&pretty')
            .then(res => res.json())
            .then(result => {
                if (result && result['suggestions']) {
                    this.suggestions = result['suggestions'];
                    this.displaySuggestions = this.suggestions.map(x => { return { address: this.getFormattedAddress(x), locationId: x.locationId } });
                    this.setState({ searchingResults: this.displaySuggestions });
                }
            })
    }
    getFormattedAddress = (x) => {
        const houseNumber = x.address.houseNumber ? x.address.houseNumber + ', ' : '';
        const street = x.address.street ? x.address.street + ', ' : '';
        const district = x.address.district ? x.address.district + ', ' : '';
        const city = x.address.city ? x.address.city + ', ' : '';
        const state = x.address.state ? x.address.state + ', ' : '';
        const country = x.address.country ? x.address.country : '';
        const address = houseNumber + street + district + city + state + country;
        return address;
    }
    geocode(locationId, callback) {
        fetch('https://geocoder.api.here.com/6.2/geocode.json' +
            `?locationid=${locationId}` +
            `&gen=8` +
            `&app_id=${environments.HERE_APP_API}` +
            `&app_code=${environments.HERE_APP_CODE}`)
            .then(res => res.json())
            .then(result => {
                callback(result);
            })
    }
}

const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer.mapSetting,
        order: state.mapReducer.optionbar.order,
        currentlyOpen: state.mapReducer.optionbar.currentlyOpen,
        locationValue: state.mapReducer.locationSearchbar.value,
        value: state.mapReducer.keywordSearchbar.value,
        loading: state.mapReducer.keywordSearchbar.loading,
        service: state.mapReducer.keywordSearchbar.service,
        type: state.mapReducer.keywordSearchbar.type,
        isSearchbarFocus: state.mapReducer.keywordSearchbar.focus
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onKeywordSearchbarChanged, onKeywordSearchbarServicePressed, onKeywordSearchbarTypePressed,
        onKeywordSearchbarFocused, onOptionOrderPressed, onOptionTypePressed, onOptionCurrentlyOpenPressed,
        onLocationSearchbarChanged, onLocationSearchbarPressed, onCoordinatesChanged, onMarkersDisplayed
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchbarList);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});