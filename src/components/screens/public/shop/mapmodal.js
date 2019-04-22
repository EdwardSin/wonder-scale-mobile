import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ItemAction from 'actions/item-reducer.action';
import * as MapAction from 'actions/map-reducer.action';
import * as ShopAction from 'actions/shop-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import Images from 'assets/images';
import colors from 'assets/variables/colors';
import { FilterController, MapController } from 'components/modals/ws-modals';
import { DistanceConverter } from 'components/pipes/distance-converter.pipe';
import environments from 'environments/environment';
import _ from 'lodash';
import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, MarkerAnimated } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followShop, getFollowShopsId, unfollowShop } from 'services/auth-user/follow';
import { getShopsThroughShopIds } from 'services/items';
import { getNearsShopByPoint } from 'services/shops';
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 2 + 60;

class MapModal extends React.Component {
    scrollview;
    constructor(props) {
        super(props);
        const { circleLatitude, circleLongitude, longitudeDelta, latitudeDelta, radius } = this.props.mapSetting;
        this.state = {
            favoriteShops: [],
            selected_shop_id: '',
            shop_ids: [],
            selected_index: 0,
            region: {
                latitude: circleLatitude, 
                longitude: circleLongitude, 
                longitudeDelta, 
                latitudeDelta
            }
        }
        if (circleLongitude) {
            this.getNearestShops(circleLongitude, circleLatitude, radius);
        }
    }
    componentDidMount() {
        const { currentPosition, longitudeDelta, latitudeDelta } = this.props.mapSetting;
        if (currentPosition.lat) {
            this.props.onCoordinatesChanged({
                longitudeDelta: longitudeDelta,
                latitudeDelta: latitudeDelta,
                latitude: currentPosition.lat,
                longitude: currentPosition.lng
            });
        }

        this.addMapchangeListener();
    }
    componentDidUpdate(prevProps) {
        const { triggerRefresh, circleLongitude, circleLatitude, radius, markers, latitudeDelta, longitudeDelta } = this.props.mapSetting;
        if (triggerRefresh) {
            this.props.setLoading(true);
            this.getNearestShops(circleLongitude, circleLatitude, radius);
            this.map.animateToRegion({
                latitude: circleLatitude,
                longitude: circleLongitude,
                latitudeDelta,
                longitudeDelta
            })
            this.addMapchangeListener();
            this.props.doneRefresh();
            this.props.refreshItem();
        }
        if (this.props.navigation.state.params && this.props.navigation.state.params.selected_shop_id) {
            let index = _.findIndex(markers, (x) => x._id == this.props.navigation.state.params.selected_shop_id);
            this.onMarkerSelect(index);
            this.map.animateToRegion({
                latitude: markers[index].coordinate.latitude,
                longitude: markers[index].coordinate.longitude,
                latitudeDelta,
                longitudeDelta
            })
            this.props.navigation.state.params.selected_shop_id = '';
        }
    }
    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
        this.getFollowShopsId();
    }
    componentWillUnmount() {
        this.removeMapchangeListener();
    }
    render() {
        const { loading, circleLatitude, circleLongitude, radius, longitudeDelta, latitudeDelta, markers, visible } = this.props.mapSetting;
        const { region } = this.state;
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
            <View style={styles.container} >
                <BackButton onPress={() => { navigation.goBack(); }} />
                <MapController loading={loading} />
                <MapView
                    showsUserLocation
                    loadingEnabled
                    ref={map => this.map = map}
                    initialRegion={this.getInitialRegion()}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    style={{ height: height * 2 / 3 - 20 }}>
                    <Circle center={{ latitude: circleLatitude, longitude: circleLongitude }} radius={radius} fillColor={'rgba(102, 204, 255, .5)'} />
                    {markers.map((marker, index) => <ShopMarker marker={marker} interpolations={interpolations} selected_index={this.state.selected_index} index={index} onPress={this.onMarkerSelect.bind(this, index)} />)}
                </MapView>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: -50, zIndex: 3, paddingHorizontal: 20 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ justifyContent: 'center' }}>
                        <FilterController navigation={navigation} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <ItemListButton onPress={() => { navigation.navigate('ItemsDisplay', { shop_ids: this.state.shop_ids}) }} />
                    </View>
                </View>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    ref={ref => { this.scrollview = ref }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    snapToAlignment={'start'}
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
                    {markers.length > 0 ? markers.map((marker, index) => {
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
                    }) : <EmptyList message={'No displayed shop!'} />
                    }
                </Animated.ScrollView>
            </View>
        );
    }
    // #region Events
    onRegionChangeComplete = (region) => {
        const { radius, latitudeDelta, circleLatitude, circleLongitude, longitudeDelta } = this.props.mapSetting;
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
        unfollowShop(shop_id, (result) => {
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
        followShop(shop_id, result => {
            if (result) {
                this.setState({ favoriteShops: _.union(this.state.favoriteShops, [shop_id]) });
            }
        }, (err) => {
            this.props.onToast(err);
        })
    }
    onMarkerSelect = (index) => {
        this.setState({selected_index: index});
        this.scrollview.getNode().scrollTo({ x: index * CARD_WIDTH, y: 0, animated: false });
    }
    // #endregion

    // #region Private Methods
    getFollowShopsId() {
        getFollowShopsId((result) => {
            if (result['result']) {
                this.setState({ favoriteShops: result['result'] });
            }
        }, (err) => { })
    }
    isFollowShop(shop_id) {
        return _.includes(this.state.favoriteShops, shop_id);
    }
    getNearestShops = (lng, lat, radius) => {
        const { currentPosition } = this.props.mapSetting;
        const { keyword_value } = this.props.keywordSearchbar;
        const { type } = this.props.optionbar;
        getNearsShopByPoint(lng, lat, radius, { ...currentPosition, type }, (result) => {
            keyword_value != '' ? this.filterShopsByKeyword(result.result.map(x => x._id)) : this.updateMarkers(result.result);
        })
    }
    filterShopsByKeyword = (shop_ids) => {
        const { currentPosition } = this.props.mapSetting;
        const { keyword_value } = this.props.keywordSearchbar;
        const { type } = this.props.optionbar;
        getShopsThroughShopIds({ keyword: keyword_value, shop_id: shop_ids, ...currentPosition }, (result) => {
            this.updateMarkers(result.result);
        }, (err) => { 
            this.props.onToast(err);
            this.props.setLoading(false);
        })
    }
    getInitialRegion = () => {
        const { circleLatitude, circleLongitude, longitudeDelta, latitudeDelta } = this.props.mapSetting;
        return {
                latitude: circleLatitude, 
                longitude: circleLongitude, 
                longitudeDelta, 
                latitudeDelta
        }
    }
    updateMarkers = (shops) => {
        let markers = this.getMarkers(shops);
        this.props.onMarkersDisplayed({ markers: markers });
        this.addMapchangeListener();
        this.props.setLoading(false);
        this.setState({ shop_ids: _.map(shops, x => x._id) });
    }
    getMarkers(shops) {
        return shops.map(x => {
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
                image: { uri: x.profile_image ? environments.IMAGE_URL + x.profile_image : environments.IMAGE_URL + 'upload/images/shop.png' }
            }
        });
    }
    // #endregion
}
const BackButton = ({ onPress }) => (
    <TouchableOpacity style={styles.backButtonContainer} onPress={onPress} >
        <Ionicons name={'ios-close-circle-outline'} size={35} color={colors.secondary} />
    </TouchableOpacity>
)
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
        
        switch(type){
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
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
            <Animated.View style={[styles.cardContainer, style]}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', flex: 3 }}>
                        <Image source={marker.image} style={styles.cardImage} />
                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={isFavorite ? onUnfavoritePress : onFavoritePress}>
                                <FontAwesome style={{ opacity: .8, paddingVertical: 15 }} underlayColor={'transparent'} name={'heart'} color={isFavorite ? colors.main : '#888'} size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onItemsPress} style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: colors.secondary }}>
                                <Text style={{ textAlign: 'center', color: colors.white }}>View {button_naming}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                        <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                        <View style={{ flexDirection: 'row', padding: 3, paddingHorizontal: 5 }}>
                            {_.times(rating, (i) => (<AntDesign key={i} style={{ width: 10 }} size={10} name={'star'} color={colors.main} />))}
                            {_.times(5 - rating, (i) => (<AntDesign key={i} style={{ width: 10 }} size={10} name={'staro'} color={colors.secondary} />))}
                            {marker.dist != 0 && <Text style={{ position: 'absolute', right: 5 }}>{DistanceConverter.transform(marker.dist)}</Text>}
                        </View>
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
        <MarkerAnimated key={index} coordinate={marker.coordinate} onPress={onPress} title={marker.name} zIndex={ index === selected_index ? 1 : 0 }>
            <Animated.View style={[styles.markerWrap, opacityStyle, scaleStyle]}>
                <Image style={{ height: 80, width: 30 }} resizeMode={'contain'} source={Images.mapMarker} />
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
        mapSetting: state.mapReducer.mapSetting,
        keywordSearchbar: state.mapReducer.keywordSearchbar,
        optionbar: state.mapReducer.optionbar
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction, ...ToastAction, ...ShopAction, ... ItemAction }, dispatch);
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
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10
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
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        elevation: 2
    },
    cardImage: {
        flex: 4,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0, .05)'
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
        paddingHorizontal: 5,
        paddingVertical: 2
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
        right: 20
    }
})