import React from 'react';
import { Modal, StyleSheet, Dimensions, Animated, View, Image, Text, TouchableOpacity, StatusBar } from 'react-native';
import { MapController, FilterController } from 'components/modals/ws-modals';
import MapView, { Circle, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import colors from 'assets/variables/colors';
import { bindActionCreators } from 'redux';
import { onMapModalPressed, onMapChanged, onCoordinatesChanged } from 'actions/map-reducer-action';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import _ from 'lodash';
import { NavigationActions, StackActions } from 'react-navigation';
import { getNearShopByPoint } from 'services/users';
import { getFollowShopsId, addFollowShop, removeFollowShop } from 'services/auth/follow';
import environments from 'environments/environment';

const ShopCard = ({ marker, style, onPress, isFavorite, onUnfavoritePress, onFavoritePress }) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
            <Animated.View style={[styles.cardContainer, style]}>
                <View style={styles.card}>
                    <FontAwesome style={{ position: 'absolute', right: 10, top: 10, zIndex: 1, opacity: .8 }} underlayColor={'transparent'} name={'heart'} color={isFavorite ? colors.main : 'rgb(255, 255, 255)'} size={30}
                        onPress={isFavorite ? onUnfavoritePress : onFavoritePress} />
                    <Image source={marker.image} style={styles.cardImage} resizeMode="contain" />

                    <View style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                        <Text numberOfLines={1} style={styles.cardDescription}>
                            {marker.description}
                        </Text>
                        <View style={{ flexDirection: 'row', padding: 3, paddingHorizontal: 5 }}>
                            {_.times(3, (i) => (<AntDesign key={i} style={{ width: 10 }} size={10} name={'star'} color={colors.main} />))}
                            {_.times(5 - 3, (i) => (<AntDesign key={i} style={{ width: 10 }} size={10} name={'staro'} color={colors.secondary} />))}
                        </View>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 2 + 30;

class MapModal extends React.Component {
    scrollview;
    constructor(props) {
        super(props);
        this.state = {
            favoriteShops: []
        }
    }
    componentDidMount() {
        this.addMapchangeListener();
    }
    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
        this.getFollowShopsId();
    }
    componentWillUnmount() {
        this.removeMapchangeListener();
    }
    getFollowShopsId() {
        getFollowShopsId((result) => {
            if (result['result']) {
                this.setState({ favoriteShops: result['result'] });
            }
        }, (err) => {})
    }
    isFollowShop(shop_id) {
        return _.includes(this.state.favoriteShops, shop_id);
    }
    onUnfavoritePress(shop_id) {
        removeFollowShop(shop_id, (result) => {
            if(result){
                let array = this.state.favoriteShops;
                _.remove(array, x => x == shop_id);
                this.setState({ favoriteShops: array });
            }
        })
    }
    onFavoritePress(shop_id) {
        addFollowShop(shop_id, result => {
            if(result){
                this.setState({ favoriteShops: _.union(this.state.favoriteShops, [shop_id]) });
            }
        })
    }
    addMapchangeListener = () => {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here

        this.animationId = this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

            if (index >= this.props.mapSetting.markers.length) {
                index = this.props.mapSetting.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.props.mapSetting.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.props.mapSetting.latitudeDelta,
                            longitudeDelta: this.props.mapSetting.longitudeDelta
                        },
                        300
                    );
                }
            }, 10);
        });
    }
    selectMarker = (index) => {
        this.scrollview.getNode().scrollTo({ x: index * CARD_WIDTH, y: 0, animated: false });
    }
    removeMapchangeListener = () => {
        this.animation.removeListener(this.animationId);
    }
    getNearestShops = (lng, lat, radius) => {
        getNearShopByPoint(lng, lat, radius, (result) => {
            this.setState({
                shops: result.result,
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
            }, () => {
                this.addMapchangeListener();
            });
        })
    }
    render() {
        const interpolations = this.props.mapSetting.markers.map((marker, index) => {
            const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, ((index + 1) * CARD_WIDTH)];
            const cardInputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, ((index + 1) * CARD_WIDTH)];
            const scaleCard = this.animation.interpolate({
                inputRange: cardInputRange,
                outputRange: [.85, 1, .85],
                extrapolate: "clamp",
            })
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 8, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: "clamp",
            });
            return { scale, opacity, scaleCard };
        });
        return (
            <View {...this.props} style={styles.container} visible={this.props.visible} animationType="slide" >
                <TouchableOpacity style={{ zIndex: 3, position: 'absolute', top: 30, right: 20 }} onPress={() => {
                    this.props.navigation.goBack();
                }} >
                    <Ionicons name={'ios-close-circle-outline'} size={35} color={'rgba(0, 0, 0, .4)'} />
                </TouchableOpacity>
                <MapController
                    loading={this.props.mapSetting.loading}
                    addMapchangeListener={() => { this.addMapchangeListener.bind(this)() }}
                    onSearchPress={() => { this.getNearestShops(this.props.mapSetting.longitude, this.props.mapSetting.latitude, this.props.mapSetting.radius) }}
                />
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.props.mapSetting}
                    region={this.props.mapSetting}
                    showsUserLocation
                    loadingEnabled
                    onRegionChangeComplete={(region) => {
                        this.props.onCoordinatesChanged(region);

                    }}
                    style={{ height: height * 2 / 3 - 20 }}
                >
                    <Circle center={{ latitude: this.props.mapSetting.latitude, longitude: this.props.mapSetting.longitude }}
                        radius={this.props.mapSetting.radius} fillColor={'rgba(102, 204, 255, .5)'} />

                    {this.props.mapSetting.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={() => {
                                this.selectMarker(index);
                            }}>

                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <View style={{ alignItems: 'center', marginTop: -50, zIndex: 3 }}>
                    <FilterController navigation={this.props.navigation} />
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
                    contentContainerStyle={this.props.mapSetting.markers.length > 0 ? styles.endPadding : ''}
                >
                    {this.props.mapSetting.markers.length > 0 ? this.props.mapSetting.markers.map((marker, index) => {
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
                            style={scaleStyle} onPress={() => { this.props.navigation.navigate("FrontShop", { shopId: marker._id }); }} />)
                    }) : <View style={{ height: CARD_HEIGHT, width: width - 25, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>No displayed shop!</Text>
                        </View>
                    }
                </Animated.ScrollView>
            </View>
        );
    }

    getMapRegion = () => ({
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        latitudeDelta: this.props.latitudeDelta,
        longitudeDelta: this.props.longitudeDelta
    });

}

const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer.mapSetting,
        visible: state.mapReducer.mapSetting.showMap
        // visible: state.mapReducer.mapSetting.showMap,
        // loading: state.mapReducer.mapSetting.loading,
        // radius: state.mapReducer.mapSetting.radius,
        // centerLatitude: state.mapReducer.mapSetting.centerLatitude,
        // centerLongitude: state.mapReducer.mapSetting.centerLongitude,
        // latitude: state.mapReducer.mapSetting.latitude,
        // longitude: state.mapReducer.mapSetting.longitude,
        // longitudeDelta: state.mapReducer.mapSetting.longitudeDelta,
        // latitudeDelta: state.mapReducer.mapSetting.latitudeDelta
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ onMapModalPressed, onMapChanged, onCoordinatesChanged }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MapModal);

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
        flex: 3,
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
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(44, 44, 44, 0.9)",
    },

    ring: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "rgba(44, 44, 44, 0.3)",
        position: "absolute"
    },
})