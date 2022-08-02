import { Ionicons } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import * as ShopAction from 'actions/shop-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { LoadingSpinner, WsItem, WsStatusBar } from 'components/modals/ws-modals';
import WsShopCard from 'components/modals/WsShopCard';
import environments from 'environments/environment';
import { BlurView } from 'expo';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRandomItems } from 'services/http/public/items';
import { getRandomShops } from 'services/http/public/shops';

const { width } = Dimensions.get('window');
let state = { items: [], scrollOffset: 0 };

class SearchMenuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceShops: [],
            restaurants: [],
            shopping: [],
            serviceItems: [],
            restaurantItems: [],
            shoppingItems: [],
            items: []
        }
    }
    componentDidMount() {
        const { searchLatitude, searchLongitude } = this.props.mapSetting;
        this.moveToMapCenterToCurrentPosition({ latitude: searchLatitude, longitude: searchLongitude });
        this.getRandomShops('service');
        this.getRandomShops('restaurant');
        this.getRandomShops('shopping');
        this.getRandomItems({ type: 'service', limit: 10 });
        this.getRandomItems({ type: 'restaurant', limit: 10 });
        this.getRandomItems({ type: 'shopping', limit: 10 });
        if (this.flatListRef) {
            this.flatListRef.scrollToOffset({ offset: state.scrollOffset, animated: false });
        }
        this.getItemsWithLazyLoad();
    }
    renderHeader() {
        let { navigate } = this.props.navigation;
        return <View style={{ width, backgroundColor: colors.secondary, opacity: .9 }}>
            <TouchableOpacity style={{ padding: 20, paddingVertical: 15 }} activeOpacity={.6} onPress={navigate.bind(this, 'SearchScreen')}>
                <BlurView tint={'light'} intensity={70} style={{
                    backgroundColor: colors.white, flexDirection: 'row', overflow: 'hidden', borderRadius: 30, paddingVertical: 10, width: '100%', maxWidth: 500,
                    alignSelf: 'center'
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, paddingLeft: 10 }}>
                        <Ionicons name={'ios-search'} size={25} color={'#ccc'} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '100', opacity: .7, color: colors.white }}>Searching Keyword...</Text>
                    </View>
                </BlurView>
            </TouchableOpacity>
        </View>
    }
    renderContentPage() {
        let { serviceShops, restaurants, shopping, serviceItems, restaurantItems, shoppingItems, items } = this.state;
        return <ScrollView style={{ width: '100%' }}>
            {this.renderCategories()}
            {this.renderShops({ shops: serviceShops, title: 'Service' })}
            {this.renderItems({ items: serviceItems, title: 'Services You Might Interested' })}
            {this.renderShops({ shops: restaurants, title: 'Restaurant' })}
            {this.renderItems({ items: restaurantItems, title: 'Foods You Might Interested' })}
            {this.renderShops({ shops: shopping, title: 'Shopping' })}
            {this.renderItems({ items: shoppingItems, title: 'Items You Might Interested' })}
            {this.renderItemsInList({ items })}
        </ScrollView>;
    }
    renderCategories() {
        let { navigation } = this.props;
        return <View style={{ paddingHorizontal: 20 }}>
            <View style={{
                backgroundColor: colors.white, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowColor: colors.greyLighten2,
                borderRadius: 5, paddingVertical: 10, paddingHorizontal: 10, flexWrap: 'wrap', flexDirection: 'row'
            }}>
                {this.renderCategory({
                    name: 'Food', color: '#A52A2A', icon: 'ios-restaurant', onPress: () => {
                        this.props.onOptionTypePressed('restaurant');
                        navigation.navigate('MapModal', { transition: 'forVertical' });
                    }
                })}
                {this.renderCategory({
                    name: 'Shopping', color: '#FF7F50', icon: 'ios-basket', onPress: () => {
                        this.props.onOptionTypePressed('shopping');
                        navigation.navigate('MapModal', { transition: 'forVertical' });
                    }
                })}
                {this.renderCategory({
                    name: 'Service', color: '#EFD31A', icon: 'ios-cog', onPress: () => {
                        this.props.onOptionTypePressed('services');
                        navigation.navigate('MapModal', { transition: 'forVertical' });
                    }
                })}
                {this.renderCategory({ name: 'Recruitment', color: '#46DCDC', icon: 'ios-person-add', onPress: () => { } })}
                {/* {this.renderCategory({ name: 'Promotion', color: '#D246DC', icon: 'md-pricetags', onPress: () => { } })} */}
            </View>
        </View>
    }
    renderCategory({ name, onPress, color, icon }) {
        return <TouchableOpacity onPress={onPress} activeOpacity={.7}
            style={{ width: (width - 70) / 4, paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center' }}>
            <View style={{
                borderRadius: 28, backgroundColor: color, height: 56, width: 56, shadowOffset: { width: 0, height: 1 }, shadowOpacity: .3,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Ionicons style={{ height: 30, width: 30, textAlign: 'center' }} name={icon} color={colors.white} size={30} />
            </View>
            <View style={{ paddingVertical: 5 }}>
                <Text style={{ alignSelf: 'center', fontSize: 11 }}>{name}</Text>
            </View>
        </TouchableOpacity>
    }
    renderShops({ shops = [], title }) {
        return shops.length > 0 && (
            <View style={{ backgroundColor: colors.white, marginTop: 15, marginBottom: 5 }}>
                <Text style={{ paddingHorizontal: 25, paddingVertical: 10, fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', paddingLeft: 5, paddingBottom: 15 }} horizontal
                    snapToInterval={300}
                    scrollEventThrottle={1}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}>
                    {shops.map((shop, index) => (<WsShopCard shop={shop} navigation={this.props.navigation} key={index} onPress={this.navigateToFrontShop.bind(this, shop)}
                        onLikePress={() => { }}
                    />))}
                </ScrollView>
            </View>
        )
    }
    renderItems({ items = [], title = '' } = {}) {
        let { navigation } = this.props;
        return items.length > 0 && (
            <View style={{ backgroundColor: colors.white, marginTop: 15, marginBottom: 5 }}>
                {title != '' && <Text style={{ paddingHorizontal: 25, paddingTop: 10, fontWeight: 'bold', fontSize: 16 }}>{title}</Text>}
                <ScrollView showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', paddingLeft: 5, paddingBottom: 15 }} horizontal
                    snapToInterval={225}
                    scrollEventThrottle={1}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}>
                    {items.map((item, index) =>
                        (<TouchableOpacity key={index} onPress={() => { navigation.navigate('Item'); }} activeOpacity={.8}
                            style={{
                                width: 225, height: 250, margin: 10, shadowOffset: { height: 1, width: 1 }, shadowOpacity: 1, shadowColor: colors.greyLighten2,
                                borderWidth: 1, borderColor: colors.greyLighten2
                            }}>
                            <View style={{ flex: 1, backgroundColor: colors.white, borderRadius: 5, overflow: 'hidden' }}>
                                <Image style={{ flex: 1 }} source={{
                                    uri: item.profile_images.length > 0 ?
                                        item.profile_images[0].indexOf('upload/') > -1 ? environments.IMAGE_URL + item.profile_images[0] : item.profile_images[0] :
                                        environments.IMAGE_URL + 'upload/images/img_not_available.png'
                                }} />
                                <Text style={{ alignSelf: 'center', paddingVertical: 5 }}>{'asdf'}</Text>
                            </View>
                        </TouchableOpacity>))}
                </ScrollView>
            </View>
        )
    }
    renderItemsInList({ items = [] }) {
        return <FlatList data={items}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ref={(ref) => this.flatListRef = ref}
            ListEmptyComponent={<View></View>}
            ListFooterComponent={this.state.more_loading && <LoadingSpinner style={{ paddingVertical: 40 }} />}
            extraData={this.state.items}
            initialNumToRender={10}
            getItemLayout={(data, index) => ({
                length: 10,
                offset: 10 * index,
                index
            })}
            onEndReached={() => { this.getItemsWithLazyLoad.bind(this) }}
            onEndReachedThreshold={0}
            onScrollEndDrag={(event) => {
                state.scrollOffset = event.nativeEvent.contentOffset.y;
                //this.props.scrollToItem({ scrollTo: event.nativeEvent.contentOffset.y });
            }}
            renderItem={({ item, index }) => (<ItemCard navigation={this.props.navigation} item={item} index={index} />)} />
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <WsStatusBar /> */}
                <View style={{ flex: 1, alignItems: 'center' }} >
                    {this.renderHeader()}
                    {this.renderContentPage()}
                </View>
            </View>
        );
    }
    navigateToFrontShop(shop) {
        this.props.onSelectedShopId(shop._id);
        this.props.navigation.navigate('FrontShop');
    }
    getItemsWithLazyLoad() {
        this.setState({ more_loading: true });
        getRandomItems({ limit: 3 }, (result) => {
            this.setState({ more_loading: false, items: [...this.state.items, ...result.result] });
        })
    }
    getRandomItems({ type, limit }) {
        getRandomItems({ type, limit }, (result) => {
            if (type == 'service') {
                this.setState({ serviceItems: result.result });
            }
            else if (type == 'restaurant') {
                this.setState({ restaurantItems: result.result });
            }
            else if (type == 'shopping') {
                this.setState({ shoppingItems: result.result });
            }
        })
    }
    
    getRandomShops(query) {
        this.setState({ serviceShops: [{
            _id: '1',
            name: 'Random Shop Name',
            profile_image: require('' + 'assets/immutable/craft-cafe.jpg')
        }], restaurants: [{
            _id: '1',
            name: 'Random Shop Name',
            profile_image: require('' + 'assets/immutable/img_not_available.png')
        }],  shopping: [{
            _id: '1',
            name: 'Random Shop Name',
            profile_image: require('' + 'assets/immutable/craft-cafe.jpg')
        }]});
        // getRandomShops({ type: query }, (result) => {
        //     if (query == 'service') {
        //         this.setState({ serviceShops: [{
        //             _id: '1',
        //             name: 'Random Shop Name'
        //         }] });
        //     }
        //     else if (query == 'restaurant') {
        //         this.setState({ restaurants: [{
        //             _id: '1',
        //             name: 'Random Shop Name'
        //         }] });
        //     }
        //     else if (query == 'shopping') {
        //         this.setState({ shopping: [{
        //             _id: '1',
        //             name: 'Random Shop Name'
        //         }] });
        //     }
        // });
    }
    moveToMapCenterToCurrentPosition({ latitude, longitude }) {
        this.props.onCoordinatesChanged({
            latitude, longitude,
            latitudeDelta: this.props.mapSetting.latitudeDelta,
            longitudeDelta: this.props.mapSetting.longitudeDelta
        })
    }
}
class ItemCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, index } = this.props;
        return (<View style={{ width: '50%', padding: 5 }}>
            <WsItem navigation={this.props.navigation} key={index} item={item}
                style={{ width: '100%', backgroundColor: colors.white, borderWidth: 0 }}></WsItem>
        </View>)
    }
}
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction, ...MapAction, ...UserAction, ...ShopAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMenuScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.greyLighten4
    }
});
