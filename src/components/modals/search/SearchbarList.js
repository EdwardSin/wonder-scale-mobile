import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import environments from 'environments/environment';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EmptyList, LoadingSpinner, WsStatusBar } from '../ws-modals';
import WsSearchbar from './WsSearchbar';

const { height } = Dimensions.get('window');

const TypeButton = ({ onPress, list, selected_type, title }) => (
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
                initial={_.findIndex(list, (item) => item.value == selected_type)}
                onPress={(index) => { onPress(index) }}
            />
        </View>
    </View>
)
const OrderButton = ({ onPress, list, selected_order, title }) => (
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
                initial={_.findIndex(list, (item) => item.value == selected_order)}
                onPress={(index) => { onPress(index) }}
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
        <Switch style={{ marginLeft: 'auto' }} thumbColor={colors.secondary} trackColor={{ true: colors.greyLighten1, false: '' }} value={currentlyOpen} onValueChange={onValueChange} />
    </View>
)

const DisplayButton = ({ onPress, name }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ justifyContent: 'center', marginLeft: 'auto', alignItems: 'center', paddingHorizontal: 20 }} >
            <FontAwesome color={colors.greyDarken2} name={name} size={24} />
        </View>
    </TouchableOpacity>
)
const LocationButton = ({ item, onPress }) => <TouchableOpacity key={item.locationId} onPress={onPress}>
    <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
        <FontAwesome name={'map-marker'} size={25} color={colors.secondary} />
        <Text style={{ paddingHorizontal: 10, alignSelf: 'center', fontSize: 17 }}>{item.name}</Text>
    </View>
</TouchableOpacity>

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
            orderList: [
                { label: 'The Best', value: 'thebest' },
                { label: 'Relevance', value: 'relevance' },
                { label: 'A - Z', value: 'alphabet' },
                // { label: 'Price', value: 'price' },
                { label: 'Review', value: 'review' }],
            typeList: [
                { label: 'Restaurant', value: 'restaurant' },
                { label: 'Shopping', value: 'shopping' },
                { label: 'Service', value: 'service' }]
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
        const { value } = this.props.keywordSearchbar;
        return (<Modal visible={this.state.keywordFocused} onShow={() => { this.keywordSearchbar.focus(); }}>
            <WsStatusBar />
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                <TextInput
                    ref={(input) => { this.keywordSearchbar = input }}
                    placeholder={'Keyword...'}
                    returnKeyType='search'
                    onSubmitEditing={() => {
                        this.setState({ keywordFocused: false });
                    }}
                    style={{ fontSize: 20 }} value={value}
                    onChangeText={(text) => { this.props.onKeywordSearchbarChanged(text); this.onKeywordValueChanged(text); }} />
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
        const { value } = this.props.locationSearchbar;
        const item = { key: 'Current Location', name: 'Current Location', locationId: '1' };
        return (<Modal visible={this.state.locationFocused} onShow={() => { this.searchbar.focus(); }}>
            <View style={{ height: Constants.statusBarHeight }}></View>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                <TextInput
                    ref={(input) => { this.searchbar = input }}
                    placeholder={'Location...'}
                    style={{ fontSize: 20 }} value={value}
                    returnKeyType='search'
                    onSubmitEditing={() => {
                        this.setState({ locationFocused: false });
                    }}
                    onChangeText={(text) => {
                        this.props.onLocationSearchbarChanged(text);
                        this.valueChanged(text);
                    }} />

            </View>
            {this.cancelButton()}
            <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, zIndex: 9, width: '100%' }}
                keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                <LocationButton item={item} onPress={() => this.onLocationPress(item)} />
                {
                    value == '' ? <View></View> :
                        this.state.locationLoading ? <LoadingSpinner /> :
                            this.state.searchingResults.length > 0 ? this.state.searchingResults.map((x, i) => { return { key: x.address + i, name: x.address, locationId: x.locationId } })
                                .map(item => <LocationButton item={item} onPress={() => this.onLocationPress(item)} />)
                                : <EmptyList />
                }
            </ScrollView>
        </Modal>)
    }
    render() {
        const { loading, onOptionCurrentlyOpenPressed, onOptionTypePressed, onOptionOrderPressed } = this.props;
        const { keyword_value } = this.props.keywordSearchbar;
        const { type, order, currentlyOpen } = this.props.optionbar;
        const { location_value } = this.props.locationSearchbar;

        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%', paddingHorizontal: 20 }} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <WsSearchbar {...this.props} placeholder={'Keyword...'} loading={loading} value={keyword_value}
                            onFocus={() => { this.setState({ keywordFocused: true }); }}
                        />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <WsSearchbar placeholder={'Location...'} loading={loading} value={location_value}
                            onFocus={() => { this.setState({ locationFocused: true }); }} />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <CurrentlyOpenSwitch currentlyOpen={currentlyOpen} onValueChange={onOptionCurrentlyOpenPressed} />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <TypeButton onPress={onOptionTypePressed}
                            list={this.state.typeList}
                            selected_type={type}
                            title={'Type'}
                        />
                    </View>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                        <OrderButton onPress={onOptionOrderPressed}
                            list={this.state.orderList}
                            selected_order={order}
                            title={'Order By'}
                        />
                    </View>
                </ScrollView>
                {this.renderKeywordContainer()}
                {this.renderLocationContainer()}
            </View>
        )
    }
    onLocationPress = (item) => {
        Keyboard.dismiss();
        this.props.onLocationSearchbarPressed(item.name);
        this.setState({ locationFocused: false });
        this.geocode(item.locationId, (res) => {
            if (res.Response.View.length) {
                let latitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                let longitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                let coordinates = { latitude, longitude };

                this.props.onSearchedLocationChanged({
                    latitude: latitude,
                    longitude: longitude
                })
            }
        });
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
        else {
            this.setState({ locationLoading: true });
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
                    this.displaySuggestions = _.uniqBy(this.displaySuggestions, 'address');
                    this.setState({ searchingResults: this.displaySuggestions });
                }
                this.setState({ locationLoading: false });
            })
    }
    getFormattedAddress = (x) => {
        const houseNumber = x.address.houseNumber ? x.address.houseNumber + ', ' : '';
        const street = x.address.street ? x.address.street + ', ' : '';
        const district = x.address.district ? x.address.district + ', ' : '';
        const city = x.address.city ? x.address.city + ', ' : '';
        const state = x.address.state ? x.address.state + ', ' : '';
        const country = x.address.country ? x.address.country : '';
        //const address = houseNumber + street + district + city + state + country;
        const address = district + city + country;
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
        optionbar: state.mapReducer.optionbar,
        locationSearchbar: state.mapReducer.locationSearchbar,
        keywordSearchbar: state.mapReducer.keywordSearchbar
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchbarList);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});