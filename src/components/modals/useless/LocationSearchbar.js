import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import environments from 'environments/environment';
import _ from 'lodash';
import React from 'react';
import { Animated, Button, Dimensions, Easing, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNearsShopByPoint } from 'services/shops';
import WsSearchbar from '../search/WsSearchbar';

const { height, width } = Dimensions.get('window');
const CancelButton = ({ onPress }) => (
    <View style={{ padding: 10, backgroundColor: colors.red }}>
        <Button color={colors.white} title="Cancel" onPress={onPress} />
    </View>
)
const SearchButton = ({ onPress }) => (
    <View style={{ padding: 10, flex: 1, backgroundColor: colors.secondary }}>
        <Button color={colors.white} title="Search" onPress={onPress} />
    </View>
)
class LocationSearchbar extends React.Component {
    searchbarControllerHeight = 150;
    valueChanged = _.debounce((text) => {this.getSearchingLocations(text)}, 500)
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(height - 80),
            searchingResults: []
        }
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
        this.getCurrentLocation();
    }
    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
    keyboardWillShow(e) {
        let buttonHeight = 85;
        let newSize = height - e.endCoordinates.height - this.searchbarControllerHeight - buttonHeight;
        let newValue = height - this.searchbarControllerHeight;

        this.setState({
            visibleHeight: newSize,
        })
        this.state.animation.setValue(newValue);
        Animated.timing(this.state.animation, { toValue: newSize, duration: 100, easing: Easing.ease }).start();
    }
    keyboardWillHide(e) {
        let newSize = height - this.searchbarControllerHeight - 140;
        let newValue = this.state.visibleHeight;
        this.setState({
            visibleHeight: newSize,
        })
        this.state.animation.setValue(newValue);
        Animated.timing(this.state.animation, { toValue: newSize, duration: 100, easing: Easing.ease }).start();
    }
    renderSearchLocationContainer = () => {
        const { latitudeDelta, longitudeDelta, radius } = this.props.mapSetting;
        const { animation, searchingResults } = this.state;
        return this.props.isSearchbarFocus &&
            (<Animated.View enabled style={{ position: 'absolute', top: 105, backgroundColor: colors.white, zIndex: 99, width: '100%' }}>
                <Animated.ScrollView style={{ paddingHorizontal: 10, height: animation }}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={'always'}>
                    {_.union([{ key: 'Current Location', name: 'Current Location', locationId: '1' }],
                        searchingResults.map((x, i) => { return { key: x.address + i, name: x.address, locationId: x.locationId } }))
                        .map(item => {
                            return (
                            <TouchableOpacity key={item.locationId} onPress={() => {
                                Keyboard.dismiss();
                                this.props.onLocationSearchbarPressed(item.name);
                                this.geocode(item.locationId, (res) => {
                                    if(res.Response.View.length){
                                        let latitude = res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
                                        let longitude = res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
                                        let coordinates = { latitude, longitude };
                                        this.props.onCoordinatesChanged({ ...coordinates, latitudeDelta, longitudeDelta });
                                        this.props.triggerRefresh();
                                        this.getNearestShops(longitude, latitude, radius);
                                    }
                                });
                                this.props.closeSearchbar();
                            }
                            }>
                                <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                                    <FontAwesome name={'map-marker'} size={25} color={colors.secondary} />
                                    <Text style={{ paddingHorizontal: 10, alignSelf:'center', fontSize: 17 }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>)
                        })
                    }
                </Animated.ScrollView>
                <View style={{ width: width, flexDirection: 'row' }}>
                    <SearchButton onPress={() => { this.props.closeSearchbar(); Keyboard.dismiss() }} />
                    <CancelButton onPress={() => { this.props.closeSearchbar(); Keyboard.dismiss() }} />
                </View>
            </Animated.View>)
    }
    render() {
        return (
            <View>
                <WsSearchbar
                    loading={this.props.loading} value={this.props.value}
                    onFocus={this.props.onLocationSearchbarFocused}
                    onChangeText={(text) => {
                        this.props.onLocationSearchbarChanged(text);
                        this.valueChanged(text);
                    }}
                />
                {/* //() => { this.setState({ orderDropDown: false, isSearchPlaceBarFocus: false, isSearchKeywordBarFocus: true }) }}
                        //value => { this.setState({ keyword: value }, () => { this.getItem(); }); } */}
                {this.renderSearchLocationContainer()}
            </View>
        )
    }
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { coordinate, routeCoordinates } = this.props;
            const { latitude, longitude } = position.coords;
            const newCoordinate = { latitude, longitude };

            this.props.onCoordinatesChanged({
                ...newCoordinate,
                latitudeDelta: this.props.mapSetting.latitudeDelta,
                longitudeDelta: this.props.mapSetting.longitudeDelta
            });
            this.getNearestShops(longitude, latitude, this.props.mapSetting.radius);
        },
            error => {
                alert(error);
            },
            { enableHighAccuracy: true, timeout: 20000 }
        );
    }
    getNearestShops = (lng, lat, radius) => {
        getNearsShopByPoint(lng, lat, radius, (result) => {
            this.props.onMarkersDisplayed({
                markers: result.result.map(x => {
                    return {
                        _id: x._id,
                        coordinate:
                            {
                                longitude: x.location.coordinates[0],
                                latitude: x.location.coordinates[1]
                            },
                        title: x.name,
                        description: x.description,
                        image: { uri: environments.IMAGE_URL + x.profile_image }
                    }
                })
            });
        })
    }
    getSearchingLocations = (query) => {
        fetch('https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json?' +
            `app_id=${environments.HERE_APP_API}` +
            `&app_code=${environments.HERE_APP_CODE}` +
            `&query=${query}` +
            '&pretty')
            .then(res => res.json())
            .then(result => {
                this.setState({ searchingResults: [] });
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
        value: state.mapReducer.locationSearchbar.value,
        loading: state.mapReducer.locationSearchbar.loading,
        isSearchbarFocus: state.mapReducer.locationSearchbar.focus,
        mapSetting: state.mapReducer.mapSetting
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchbar);

const styles = StyleSheet.create({

});
