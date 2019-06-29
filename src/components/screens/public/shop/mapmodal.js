import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ItemAction from 'actions/item-reducer.action';
import * as MapAction from 'actions/map-reducer.action';
import * as SearchbarAction from 'actions/searchbar-reducer.action';
import * as ShopAction from 'actions/shop-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import Images from 'assets/images';
import colors from 'assets/variables/colors';
import { MapController } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { LinearGradient } from 'expo';
import * as ImageHelper from 'helpers/image.helper';
import _ from 'lodash';
import DistanceConverter from 'pipes/distance-converter.pipe';
import React from 'react';
import { Animated, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, MarkerAnimated } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { follow, getFollowIds, unfollow } from 'services/http/auth-user/follow';
import { getShopsBySearchItem, getShopsBySearchText } from 'services/http/public/shops';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 2 + 60;

class MapModal extends React.Component {
    scrollview;
    map;
    animation = new Animated.Value(0);
    constructor(props) {
        super(props);
        const { currentLatitude, currentLongitude, longitudeDelta, latitudeDelta, radius } = this.props.mapSetting;
        this.state = {
            searchShopsByItems: props.searchShopsByItems,
            searchShopsByName: props.searchShopsByName,
            searchMoreLoading: false,
            favoriteShops: [],
            selected_shop_id: '',
            shop_ids: [],
            selected_index: 0,
            skip: props.skip,
            limit: props.limit,
            region: {
                latitude: currentLatitude,
                longitude: currentLongitude,
                longitudeDelta,
                latitudeDelta
            }
        }
        // if (currentLongitude) {
        //     this.getNearestShops({ lng: currentLongitude, lat: currentLatitude, radius });
        // }
    }
    componentDidMount() {
        const { longitudeDelta, latitudeDelta } = this.props.mapSetting;
        const { searchShopsByItems, searchShopsByName } = this.props;
        this.setState({ searchShopsByItems, searchShopsByName });
        this.updateMarkers({ searchShopsByName, searchShopsByItems });
        //this.addMapchangeListener();
    }
    componentDidUpdate(prevProps, prevState) {
        const { searchTrigger, setResultParams, navigation } = this.props;
        const { searchShopsByItems, searchShopsByName } = this.state;
        const { triggerRefresh, currentLongitude, currentLatitude, radius, searchLatitude, searchLongitude, markers, latitudeDelta, longitudeDelta } = this.props.mapSetting;

        if (searchTrigger && !prevProps.searchTrigger) {
            this.setState({ searchShopsByItems: [], searchShopsByName: [], skip: 0 }, () => {
                this.retrieveShopsBySearchName();
                this.retrieveShopsBySearchItems();
                this.stopLoading();
                this.props.isSearchTriggered(false);
            });
            this.map.animateToRegion({
                latitude: searchLatitude,
                longitude: searchLongitude,
                latitudeDelta,
                longitudeDelta
            })
        }

        if (searchShopsByItems != prevState.searchShopsByItems || searchShopsByName != prevState.searchShopsByName) {
            this.props.onSearchShopsByName(searchShopsByName);
            this.props.onSearchShopsByItems(searchShopsByItems);
            this.updateMarkers({ searchShopsByName, searchShopsByItems });
        }
        if (navigation.state.params && navigation.state.params.selected_shop_id) {
            let index = _.findIndex(markers, (x) => x._id == navigation.state.params.selected_shop_id);
            this.onMarkerSelect(index);
            this.map.animateToRegion({
                latitude: markers[index].coordinate.latitude,
                longitude: markers[index].coordinate.longitude,
                latitudeDelta,
                longitudeDelta
            })
            navigation.state.params.selected_shop_id = '';
        }
    }
    componentWillMount() {
        this.index = 0;
        this.getFollowIds();
    }
    componentWillUnmount() {
        this.removeMapchangeListener();
    }
    async retrieveShopsBySearchItems() {
        let { searchShopsByItems, skip, limit } = this.state;
        let { searchKeyword, setResultParams } = this.props;
        let { searchLatitude, searchLongitude, radius, currentLatitude, currentLongitude } = this.props.mapSetting;
        this.setState({ searchMoreLoading: true });
        let result = await getShopsBySearchItem({ query: searchKeyword, limit: 5, skip, lat: searchLatitude, lng: searchLongitude, radius }, { current_lat: currentLatitude, current_lng: currentLongitude });
        if (result.result && !result.result.length) {
            this.setState({ refreshing: false, searchMoreLoading: false, hasMore: false });
            return;
        }
        setResultParams({ skip: skip + result.result.length });
        this.setState({ searchShopsByItems: [...searchShopsByItems, ...result.result] });
    }

    async retrieveShopsBySearchName() {
        let { searchLatitude, searchLongitude, radius } = this.props.mapSetting;
        let { searchKeyword } = this.props;
        this.setState({ searchMoreLoading: true });
        let result = await getShopsBySearchText({ query: searchKeyword, limit: 3, lat: searchLatitude, lng: searchLongitude, radius });
        this.setState({ searchShopsByName: result.result });
    }
    stopLoading() {
        this.setState({ searchMoreLoading: false, refreshing: false, onSearchDisplayed: true })
    }
    render() {
        const { loading, searchLatitude, searchLongitude, radius, markers, visible } = this.props.mapSetting;
        const { region, searchMoreLoading } = this.state;
        const { navigation } = this.props;
        const interpolations = markers.map((marker, index) => {
            const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, ((index + 1) * CARD_WIDTH)];
            const cardInputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, ((index + 1) * CARD_WIDTH)];
            const scaleCard = this.animation.interpolate({
                inputRange: cardInputRange,
                outputRange: [.85, 1, .85],
                extrapolate: "clamp",
            })
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2, 1],
                extrapolate: "clamp",
            });
            const translateY = this.animation.interpolate({
                inputRange,
                outputRange: [0, -8, 0],
                extrapolate: 'clamp'
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: "clamp",
            });
            return { scale, opacity, translateY, scaleCard };
        });

        return (
            <View style={styles.container}>
                <BackButton onPress={() => { this.props.navigation.goBack(null) }} />
                <MapView
                    showsUserLocation
                    loadingEnabled
                    ref={map => this.map = map}
                    initialRegion={this.getInitialRegion()}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    style={{ height: height - CARD_HEIGHT }}>
                    <Circle zIndex={10} center={{ latitude: searchLatitude, longitude: searchLongitude }}
                        radius={radius}
                        fillColor={'rgba(112, 112, 112, .16)'} strokeWidth={.1}
                        onTouchStart={(event) => {
                            event.stopPropagation();
                            console.log('start1');
                        }}
                        onTouchMove={(event) => {
                            event.stopPropagation();
                            console.log('move1');
                        }}
                        onTouchEnd={(event) => {
                            event.stopPropagation();
                            console.log('release1');
                        }}
                        onPress={(event) => {
                            console.log('press1')
                        }}
                    />
                    {markers.map((marker, index) => <ShopMarker key={index} index={index} marker={marker} interpolations={interpolations} selected_index={this.state.selected_index} onPress={this.onMarkerSelect.bind(this, index)} />)}
                </MapView>

                {/* <View style={{ flexDirection: 'row', width: '100%', marginTop: -50, zIndex: 3, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <ItemListButton onPress={() => { navigation.navigate('ItemsDisplay', { shop_ids: this.state.shop_ids }) }} />
                    </View>
                </View> */}

                <View style={styles.mapcontrollerbar}>
                    <MapController navigation={this.props.navigation} />
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        ref={ref => { this.scrollview = ref }}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        decelerationRate={'fast'}
                        pagingEnabled
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.animation,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        style={styles.scrollView}
                        contentContainerStyle={markers.length > 0 ? styles.endPadding : ''} >
                        {
                            markers.length > 0 ? markers.map((marker, index) => {
                                const scaleStyle = {
                                    transform: [
                                        {
                                            scale: interpolations[index].scaleCard,
                                        },
                                    ],
                                };
                                return (<ShopCard key={index} marker={marker} isFavorite={this.isFollowShop(marker._id)}
                                    onUnfavoritePress={() => this.onUnfavoritePress(marker._id)}
                                    onFavoritePress={() => this.onFavoritePress(marker._id)}
                                    onItemsPress={() => this.onItemsPress(marker._id)}
                                    type={this.props.optionbar.type}
                                    style={scaleStyle} onPress={() => {
                                        this.props.onSelectedShopId(marker._id);
                                        this.props.navigation.navigate("FrontShop", { shopId: marker._id });
                                    }} />)
                            }) : <EmptyList message={'No result!'} />
                        }
                    </Animated.ScrollView>
                </View>
            </View>
        );
    }
    // #region Events
    onRegionChangeComplete = (region) => {
        const { radius, latitudeDelta } = this.props.mapSetting;
        this.props.onCoordinatesChanged(region);
        this.props.onRadiusChanged(radius / latitudeDelta * region.latitudeDelta);
    }
    addMapchangeListener = () => {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animationId = this.animation.addListener(({ value }) => {
            let { markers, latitudeDelta, longitudeDelta } = this.props.mapSetting;
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

            if (index >= markers.length) {
                index = markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = markers[index];
                    this.setState({
                        selected_index: index
                    });
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta,
                            longitudeDelta
                        },
                        300
                    );
                }
            }, 10);
        });
    }
    removeMapchangeListener = () => {
        this.animation.removeListener(this.animationId);
    }
    onUnfavoritePress(shop_id) {
        unfollow({ id: shop_id, type: 'shops' }, (result) => {
            if (result) {
                let array = this.state.favoriteShops;
                _.remove(array, x => x == shop_id);
                this.setState({ favoriteShops: array });
            }
        }, (err) => {
            this.props.onToast(err);
        })
    }
    onItemsPress(id) {
        this.props.onSelectedShopId(id);
        this.props.navigation.navigate("Categories", { shopId: id });
    }
    onFavoritePress(shop_id) {
        follow({ id: shop_id, type: 'shops' }, result => {
            if (result) {
                this.setState({ favoriteShops: _.union(this.state.favoriteShops, [shop_id]) });
            }
        }, (err) => {
            this.props.onToast(err);
        })
    }
    onMarkerSelect = (index) => {
        this.setState({ selected_index: index });
        this.scrollview.getNode().scrollTo({ x: index * CARD_WIDTH, y: 0, animated: false });
    }
    // #endregion

    // #region Private Methods
    getFollowIds() {
        getFollowIds({ type: 'shops' }, (result) => {
            if (result['result']) {
                this.setState({ favoriteShops: result['result'] });
            }
        }, (err) => { })
    }
    isFollowShop(shop_id) {
        return _.includes(this.state.favoriteShops, shop_id);
    }
    getInitialRegion = () => {
        const { searchLatitude, searchLongitude, longitudeDelta, latitudeDelta } = this.props.mapSetting;
        return {
            latitude: searchLatitude,
            longitude: searchLongitude,
            longitudeDelta,
            latitudeDelta
        }
    }
    updateMarkers = ({ searchShopsByItems, searchShopsByName }) => {
        let shops = [...searchShopsByItems, ...searchShopsByName];
        let markers = this.getMarkers(shops);
        this.props.onMarkersDisplayed({ markers });
        this.addMapchangeListener();
        this.props.setLoading(false);
        this.setState({ shop_ids: _.map(shops, x => x._id) });
    }
    getMarkers(shops) {
        return shops.map(x => {
            let url = ImageHelper.hasUploadedImage(x.profile_image) ? environments.IMAGE_URL + x.profile_image : x.profile_image
            return {
                _id: x._id,
                dist: x.dist,
                coordinate:
                {
                    longitude: x.location.coordinates[0],
                    latitude: x.location.coordinates[1]
                },
                title: x.name,
                description: x.description,
                image: { uri: url }
            }
        });
    }
    // #endregion
}
const BackButton = ({ onPress }) => (
    <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }} onPress={onPress}>
        <MaterialCommunityIcons color={colors.white} size={26} name={'chevron-left'} />
    </TouchableOpacity>)

const EmptyList = ({ message }) => (
    <View style={{ height: CARD_HEIGHT, width: width - 25, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>{message}</Text>
    </View>
)
const ShopCard = ({ marker, style, type, onPress, isFavorite, onUnfavoritePress, onFavoritePress, onItemsPress }) => {
    let rating = 0;
    if (marker.review && marker.review.score && marker.review.count) {
        rating = marker.review.score / marker.reviews.count;
    }
    const getButtonNaming = (type) => {
        switch (type) {
            case 'service':
                return 'Services';
            case 'restaurant':
                return 'Menu';
            case 'shopping':
                return 'Items';
            default:
                return 'Items';
        }
    }
    const button_naming = getButtonNaming(type);
    return (
        <TouchableOpacity activeOpacity={.9} onPress={onPress}>
            <Animated.View style={[styles.cardContainer, style]}>
                <View style={styles.card}>
                    <Image source={marker.image} style={styles.backgroundCardImage} />
                    <LinearGradient
                        colors={['#ffffff', '#000000']}
                        style={{ position: 'absolute', opacity: .2, top: 0, width: '100%', height: CARD_HEIGHT }}>

                    </LinearGradient>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image source={marker.image} style={styles.cardImage} />
                    </View>
                    {/* <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={isFavorite ? onUnfavoritePress : onFavoritePress}>
                                <FontAwesome style={{ opacity: .8, paddingVertical: 15 }} underlayColor={'transparent'} name={'heart'} color={isFavorite ? colors.main : '#888'} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onItemsPress} style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: colors.secondary }}>
                                <Text style={{ textAlign: 'center', color: colors.white }}>View {button_naming}</Text>
                            </TouchableOpacity>
                        </View> */}
                    <View style={styles.textContent}>
                        <View style={{ marginBottom: 3 }}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 3, paddingHorizontal: 5 }}>
                            {_.times(rating, (i) => (<AntDesign key={i} style={{ width: 15 }} size={15} name={'star'} color={colors.main} />))}
                            {_.times(5 - rating, (i) => (<AntDesign key={i} style={{ width: 15 }} size={15} name={'staro'} color={colors.white} />))}
                        </View>
                        {marker.dist != 0 &&
                            <TouchableOpacity activeOpacity={.8} style={{ backgroundColor: colors.secondary, position: 'absolute', right: 10, padding: 10, bottom: 10, borderRadius: 5, flexDirection: 'row' }}
                                onPress={() => { Linking.openURL(`http://www.google.com/maps/place/${marker.coordinate.latitude},${marker.coordinate.longitude}`) }}>
                                <Text style={{ color: colors.white }}>{DistanceConverter.transform(marker.dist)}</Text>
                                <MaterialCommunityIcons name={'map-marker'} size={15} color={colors.white} style={{ marginLeft: 5 }} />
                            </TouchableOpacity>}
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

const ShopMarker = ({ interpolations, index, selected_index, marker, onPress }) => {
    const scaleStyle = {
        transform: [
            { scale: interpolations[index].scale }
        ],
    };
    const opacityStyle = {
        opacity: interpolations[index].opacity,
    };
    return (
        <MarkerAnimated coordinate={marker.coordinate} onPress={onPress} title={marker.name} style={{ zIndex: index === selected_index ? 1 : 0 }}>
            <Animated.View style={[styles.markerWrap, opacityStyle, scaleStyle]}>
                <Image style={{ height: 80, width: 40 }} resizeMode={'contain'} source={Images.mapMarker} />
            </Animated.View>
        </MarkerAnimated>
    );
}
const ItemListButton = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 8, width: 40, backgroundColor: colors.white, borderRadius: 15 }}>
            <FontAwesome style={{ paddingHorizontal: 5, }} name={"th-list"} fontSize={20} />
        </View>
    </TouchableOpacity>
)
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer,
        keywordSearchbar: state.searchbarReducer.keywordSearchbar,
        optionbar: state.searchbarReducer.optionbar,
        limit: state.searchbarReducer.keywordSearchbar.limit,
        skip: state.searchbarReducer.keywordSearchbar.skip,
        searchKeyword: state.searchbarReducer.keywordSearchbar.searchKeyword,
        searchTrigger: state.searchbarReducer.searchTrigger,
        searchShopsByItems: state.shopReducer.searchShopsByItems,
        searchShopsByName: state.shopReducer.searchShopsByName
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction, ...SearchbarAction, ...ToastAction, ...ShopAction, ...ItemAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MapModal);

{/* 
  // @ts-ignore */}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%'
    },
    scrollView: {
        height: height / 3,
        padding: 10,
    },
    mapcontrollerbar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    endPadding: {
        paddingRight: width - (CARD_WIDTH),
    },
    card: {
        backgroundColor: "#FFF",
        height: '100%',
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden'
    },
    cardContainer: {
        padding: 5,
        height: '100%',
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 2, height: -2 },
        elevation: 2
    },
    backgroundCardImage: {
        width: '100%',
        height: CARD_HEIGHT,
        position: 'absolute',
        top: 0
    },
    cardImage: {
        width: CARD_HEIGHT / 3,
        height: CARD_HEIGHT / 3,
        alignSelf: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        borderWidth: 5,
        borderColor: colors.white
    },
    textContent: {
        flex: 1,
        padding: 10
    },
    cardtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
        paddingHorizontal: 5
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        //width: 24,
        //height: 24,
        //borderRadius: 12,
        //backgroundColor: "rgba(44, 44, 44, 0.9)",
        marginTop: -15
    },
    ring: {
        width: 12,
        height: 12,
        borderRadius: 6,
        //backgroundColor: "rgba(44, 44, 44, 0.3)",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        position: "absolute"
    },
    button: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: .3
    },
    backButtonContainer: {
        zIndex: 3,
        position: 'absolute',
        top: 30,
        left: 20
    }
})