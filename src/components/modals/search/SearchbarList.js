import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import environments from 'environments/environment';
import { Constants } from 'expo';
import KeywordHelper from 'helpers/keyword.helper';
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
const LocationButton = ({ item, onPress, icon }) => <TouchableOpacity key={item.locationId} onPress={onPress}>
    <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
        {icon}
        <View>
            <Text style={{ paddingHorizontal: 10, fontSize: 17, color: colors.greyDarken2 }}>{item.address}</Text>
            {item.state != '' && item.state != undefined && <Text style={{ paddingHorizontal: 10, fontSize: 15, color: colors.grey }}>{item.state}</Text>}
        </View>
    </View>
</TouchableOpacity>

class SearchbarList extends React.Component {
    valueChanged = _.debounce((text) => { this.getSearchingLocations(text) }, 500)

    constructor(props) {
        super(props);
        this.state = {
            keywordLists: [],
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
                { label: 'All', value: 'all' },
                { label: 'Restaurant', value: 'restaurant' },
                { label: 'Shopping', value: 'shopping' },
                { label: 'Service', value: 'service' }]
        }
    }

    cancelButton = ({ onPress }) => (<Text style={{ alignSelf: 'center', paddingHorizontal: 10 }} onPress={onPress}>Cancel</Text>)

    renderKeywordContainer = () => {
        const { searchKeyword, onKeywordSearchbarChanged } = this.props;
        const { keywordFocused, keywordLists } = this.state;
        return (<Modal onRequestClose={() => { }} visible={keywordFocused} onShow={() => { this.keywordSearchbar.focus(); }}>
            <WsStatusBar />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3, flexDirection: 'row' }}>
                    <TextInput
                        ref={(input) => { this.keywordSearchbar = input }}
                        placeholder={'Keyword...'}
                        returnKeyType='search'
                        clearButtonMode="always"
                        onSubmitEditing={() => {
                            this.setState({ keywordFocused: false });
                        }}
                        onFocus={() => this.onSearchbarFocus()}
                        style={{ fontSize: 20, flex: 1 }} value={searchKeyword}
                        onChangeText={(text) => { onKeywordSearchbarChanged(text); this.onKeywordValueChanged(text); }} />
                    {this.cancelButton({ onPress: () => { this.setState({ keywordFocused: false }); this.keywordSearchbar.blur() } })}
                </View>
            </View>

            <View style={{ position: 'relative', flex: 1 }}>
                {this.renderKeywordModal()}
            </View>
            {/* <ScrollView style={{ flex: 1, padding: 20, zIndex: 9, width: '100%' }}
                keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                {keywordLists.map(item => {
                    return (<TouchableOpacity key={item.locationId} onPress={() => { }}>
                        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                            <Text style={{ paddingHorizontal: 10, alignSelf: 'center', fontSize: 17 }}>{item}</Text>
                        </View>
                    </TouchableOpacity>)
                })
                }
            </ScrollView> */}
        </Modal>)
    }
    renderLocationContainer = () => {
        const { locationKeyword, onLocationSearchbarChanged } = this.props;
        const item = { key: 'Current Location', address: 'Current Location', locationId: '1' };
        return (<Modal onRequestClose={() => { }} visible={this.state.locationFocused} onShow={() => { this.searchbar.focus(); }}>
            <View style={{ height: Constants.statusBarHeight }}></View>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3, flexDirection: 'row' }}>
                    <TextInput
                        ref={(input) => { this.searchbar = input }}
                        placeholder={'Location...'}
                        style={{ fontSize: 20, flex: 1 }} value={locationKeyword}
                        returnKeyType='search'
                        clearButtonMode="always"
                        onSubmitEditing={() => {
                            this.setState({ locationFocused: false });
                        }}
                        onChangeText={(text) => {
                            onLocationSearchbarChanged(text);
                            this.valueChanged(text);
                        }} />
                    {this.cancelButton({ onPress: () => { this.setState({ locationFocused: false }); this.searchbar.blur() } })}
                </View>
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 10, zIndex: 9, width: '100%' }}
                keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>
                <LocationButton item={item} onPress={() => this.onLocationPress(item)}
                    icon={<MaterialCommunityIcons name={'target'} size={25} color={'#ccc'} />} />
                {
                    locationKeyword == '' ? <View></View> :
                        this.state.locationLoading ? <LoadingSpinner /> :
                            this.state.searchingResults.length > 0 ? this.state.searchingResults.map((x, i) => { return { key: x.address + i, address: x.address, state: x.state, locationId: x.locationId } })
                                .map((item, index) => <LocationButton key={index} item={item} onPress={() => this.onLocationPress(item)}
                                    icon={<FontAwesome name={'map-marker'} size={25} color={colors.secondary} />} />)
                                : locationKeyword == '' ? <View></View> : <EmptyList message={'No location found!'} />
                }
            </ScrollView>
        </Modal>)
    }
    render() {
        const { loading, searchKeyword, locationKeyword, onOptionCurrentlyOpenPressed, onOptionTypePressed, onOptionOrderPressed } = this.props;
        const { type, order, currentlyOpen } = this.props.optionbar;

        return (
            <View style={styles.container}>
                <ScrollView style={{ height: '100%', paddingHorizontal: 20, backgroundColor: colors.greyLighten4 }} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'handled'}>

                    <WsSearchbar {...this.props} containerStyle={{ marginTop: 10, marginBottom: 5, backgroundColor: colors.white }} placeholder={'Keyword...'} loading={loading} value={searchKeyword} onFocus={() => { this.setState({ keywordFocused: true }); }} />
                    <WsSearchbar containerStyle={{ marginTop: 5, marginBottom: 10, backgroundColor: colors.white }} placeholder={'Location...'} loading={loading} value={locationKeyword} onFocus={() => { this.setState({ locationFocused: true }); }}
                        icon={<MaterialCommunityIcons name={'map-marker'} size={30} color={colors.greyDarken1} />} />

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
        this.props.onLocationSearchbarPressed(item.address);
        this.setState({ locationFocused: false });
        this.geocode(item.locationId, (res) => {
            if (res.Response.View.length) {
                let latitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                let longitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                let coordinates = { latitude, longitude };
                this.props.onSearchCoordinates({ latitude, longitude })
            }
        });
    }

    onOptionOrderPressed = (value) => {
        this.props.onOptionOrderPressed(value);
    }
    onKeywordValueChanged = (keyword) => {
        this.setState({
            keywordLists: []
        })
    }
    renderKeywordModal() {
        let { keywordLists } = this.state;

        return <View style={{ width: '100%', height: '100%', zIndex: 10, position: 'absolute', top: 0, padding: 10 }}>
            <ScrollView style={{ width: '100%', height: '100%' }} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'always'}>
                {keywordLists.map((value, index) => (
                    <TouchableOpacity key={index} onPress={() => this.onSearchingKeywordPress(value)} style={{ paddingLeft: 15, paddingVertical: 10, flex: 1, flexDirection: 'row' }} >
                        <Text style={{ flex: 1, fontSize: 17 }}>{value}</Text>
                        <TouchableOpacity onPress={async (event) => {
                            event.stopPropagation();
                            this.setState({ keywordLists: await KeywordHelper.removeKeywordFromHistory(value, keywordLists) })
                        }} style={{ width: 50, alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}>
                            <Ionicons name={'ios-close'} color={colors.grey} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>))}
            </ScrollView>
        </View>;
    }
    async onSearchbarFocus() {
        this.setState({ onSearchbarDisplayed: true });
        this.setState({ keywordLists: await KeywordHelper.getHistoryFromStorage() });
    }
    async onSearchingKeywordPress(value) {
        let { keywordLists } = this.state;
        this.setState({ searchKeyword: value });
        await KeywordHelper.addToHistory(value, keywordLists);
        //this.submitKeyword();
        Keyboard.dismiss();
    }
    submitKeyword = () => {
        let { searchKeyword, keywordLists } = this.state;
        this.setState({ onSearchbarDisplayed: false });
        this.props.setResultParams({ skip: 0 });
        this.props.onKeywordSearchbarChanged(searchKeyword);
        this.props.isSearchTriggered(true);
        this.keywordSearchbar.blur();
        KeywordHelper.addToHistory(searchKeyword, keywordLists);
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
                    this.displaySuggestions = this.suggestions.map(x => { return { address: this.getFormattedAddress(x), state: this.getFormattedState(x), locationId: x.locationId } });
                    this.displaySuggestions = _.uniqBy(this.displaySuggestions, 'address');
                    this.setState({ searchingResults: this.displaySuggestions.filter(x => x.address != '' && x.address != undefined) });
                }
                this.setState({ locationLoading: false });
            })
    }
    getFormattedAddress = (x) => {
        const street = x.address.street;
        return street;
    }
    getFormattedState = (x) => {
        const district = x.address.district ? x.address.district + ', ' : '';
        const city = x.address.city ? x.address.city + ', ' : '';
        const state = x.address.state ? x.address.state + ', ' : '';
        const country = x.address.country ? x.address.country : '';

        return district + state + country;
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
        mapSetting: state.searchbarReducer.mapSetting,
        optionbar: state.searchbarReducer.optionbar,
        // locationSearchbar: state.searchbarReducer.locationSearchbar,
        // keywordSearchbar: state.searchbarReducer.keywordSearchbar,        
        searchKeyword: state.searchbarReducer.keywordSearchbar.searchKeyword,
        locationKeyword: state.searchbarReducer.locationSearchbar.locationKeyword
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