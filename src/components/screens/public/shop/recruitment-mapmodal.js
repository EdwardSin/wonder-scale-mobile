import Ionicons from '@expo/vector-icons/Ionicons';
import * as ItemAction from 'actions/item-reducer.action';
import * as MapAction from 'actions/map-reducer.action';
import * as ShopAction from 'actions/shop-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import Images from 'assets/images';
import colors from 'assets/variables/colors';
import { MapController } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import _ from 'lodash';
import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, MarkerAnimated } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecruitmentsFromNearestShop } from 'services/recruitment';
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 2 + 60;

class RecruitmentMapModal extends React.Component {
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
            this.getRecruitmentsFromNearestShop(circleLongitude, circleLatitude, radius);
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
            this.getRecruitmentsFromNearestShop(circleLongitude, circleLatitude, radius);
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
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: "clamp",
            });
            return { scale, opacity, scaleCard };
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
                    {markers.map((marker, index) => {
                    return (<RecruitmentMarker marker={marker} interpolations={interpolations} selected_index={this.state.selected_index} 
                    index={index} onPress={this.onMarkerSelect.bind(this, index)} />)})}
                </MapView>
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
                        return (<RecruitmentCard key={index} marker={marker}
                            style={scaleStyle} onPress={() => {
                                this.props.onSelectedShopId(marker.shop_id);
                                this.props.navigation.navigate("RecruitmentDetail", { recruitment_id: marker._id });
                            }} />)
                    }) : <EmptyList message={'No recruitment in this area!'} />
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
        this.removeMapchangeListener();
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
    onMarkerSelect = (index) => {
        this.setState({selected_index: index});
        this.scrollview.getNode().scrollTo({ x: index * CARD_WIDTH, y: 0, animated: false });
    }
    // #endregion

    // #region Private Methods
    getRecruitmentsFromNearestShop = (lng, lat, radius) => {
        getRecruitmentsFromNearestShop(lng, lat, radius, (result) => {
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
    updateMarkers = (recruitments) => {
        this.setState({ shop_ids: _.map(recruitments, x => x.shop_id) }, () => {
            let markers = this.getMarkers(recruitments);
            this.props.onMarkersDisplayed({ markers: markers });
            this.addMapchangeListener();
            this.props.setLoading(false);
        });
    }
    getMarkers(recruitments) {
        return recruitments.map(x => {
            return {
                ...x,
                profile_image: environments.IMAGE_URL + x.shop_id.profile_image,
                name: x.shop_id.name,
                coordinate: {
                    longitude: x.shop_id.location.coordinates[0],
                    latitude: x.shop_id.location.coordinates[1]
                }
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
        <Text style={{ textAlign: 'center', fontSize: 15 }}>{message}</Text>
    </View>
)
const RecruitmentCard = ({ marker, style, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
        <Animated.View style={[styles.cardContainer, style]}>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                        <Image source={{uri: marker.profile_image}} style={styles.cardImage} resizeMode={"contain"}/>
                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: colors.greyDarken2 }}>{marker.name}</Text>
                        </View>
                </View>
                <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.job_title}</Text>
                    <View style={{ marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten2 }}></View>
                    <Text numberOfLines={3} style={styles.cardDescription}>{marker.job_description}</Text>
                </View>
            </View>
        </Animated.View>
    </TouchableOpacity>)
}
const RecruitmentMarker = ({ interpolations, index, selected_index, marker, onPress }) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentMapModal);

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
        width: 100,
        height: 100,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0, .05)'
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 20,
        color: colors.grey,
        marginTop: 5,
        padding: 10
    },
    cardDescription: {
        fontSize: 15,
        color: colors.greyDarken2,
        padding: 10
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