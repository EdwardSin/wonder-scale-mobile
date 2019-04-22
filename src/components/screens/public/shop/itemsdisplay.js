import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ItemAction from 'actions/item-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, WsItem, WsSearchbar, WsStatusBar } from 'components/modals/ws-modals';
import _ from 'lodash';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followItem, unfollowItem } from 'services/auth-user/follow';
import { getSearchItemByText } from 'services/items';

let state = { items: [], scrollOffset: 0 };
class ItemsDisplayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            has_more: true,
            more_loading: false,
            items: state.items,
            searchKeyword: '',
            offset: 0,
            limit: 10,
            shop_ids: this.props.navigation.state.params.shop_ids
        }
    }
    componentDidMount() {
        const { isRefreshItem, items } = this.props;
        if (isRefreshItem) {
            this.setState({ loading: true });
            this.fetchResult();
        }
        else if (state.items && state.items.length) {
            this.flatListRef.scrollToOffset({ offset: state.scrollOffset, animated: false });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.items.length !== nextState.items.length) {
            return true;
        }
        if (this.state.more_loading !== nextState.more_loading) {
            return true;
        }
        return false;
    }
    isFavoriteItem = () => {
        return _.includes(this.props.favorite_items, this.props.item._id);
    }
    fetchResult = () => {
        const { offset, limit, items, shop_ids, searchKeyword, has_more, more_loading } = this.state;
        if (!more_loading && has_more) {
            this.setState({ more_loading: true }, () => {
                getSearchItemByText({ keyword: searchKeyword, limit: limit, offset: offset, shop_id: shop_ids }, (result) => {
                    if (!result.result.length) {
                        this.setState({ loading: false, has_more: false, more_loading: false });
                        return;
                    }
                    if (!result.result) return;
                    this.setState({
                        items: _.uniqBy([...items, ...result.result], '_id'),
                        offset: offset + 10,
                        limit: limit + 10,
                        loading: false,
                        more_loading: false,

                    }, () => {
                        state.items = this.state.items;
                        this.props.doneRefreshItem();
                    });
                }, err => {
                    this.setState({ more_loading: false })
                })
            });
        }
    };
    filterResult = () => {
        const { searchKeyword, limit, offset, shop_ids } = this.state;
        getSearchItemByText({ keyword: searchKeyword, limit: limit, offset: offset, shop_id: shop_ids }, (result) => {
            this.setState({
                items: _.uniqBy([...result.result], '_id'),
                loading: false
            }, () => { });
        })
    }
    render() {
        return <View style={styles.container}>
            <WsStatusBar />
            <View style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Item'} />
            </View>

            {!this.state.loading ?
                <FlatList data={this.state.items}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    ref={(ref) => this.flatListRef = ref}
                    ListEmptyComponent={<EmptyList />}
                    ListFooterComponent={this.state.more_loading && <LoadingSpinner style={{ paddingVertical: 40 }} />}
                    extraData={this.state.items}
                    initialNumToRender={10}
                    getItemLayout={(data, index) => ({
                        length: 200,
                        offset: 200 * index,
                        index
                      })}
                    onEndReached={() => { this.fetchResult() }}
                    onEndReachedThreshold={0}
                    onScrollEndDrag={(event) => {
                        state.scrollOffset = event.nativeEvent.contentOffset.y;
                        //this.props.scrollToItem({ scrollTo: event.nativeEvent.contentOffset.y });
                    }}
                    renderItem={this.renderItemCard} />
                : <LoadingSpinner />}
        </View>
    }

    renderItemCard = ({ item, index }) => (
        <ItemCard navigation={this.props.navigation} isFavorite={this.isFavoriteItem} followItem={() => this.followItem(item)}
                            unfollowItem={() => this.unfollowItem(item)} mapSetting={this.props.mapSetting} item={item} index={index} />
    )

    onChangeText = _.debounce((value) => {
        this.setState({
            searchKeyword: value, items: [],
            offset: 0,
            limit: 10,
            loading: true,
            more_loading: false,
            has_more: true
        }, () => { this.filterResult(); });
        // if (value === '') {
        //   this.setState({ searchItems: this.state.items, searchKeyword: value }, () => {this.fetchResult(); });
        // }
        // else {
        //   let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(value.toLowerCase())) || []
        //   this.setState({ searchItems: searchItems, searchKeyword: value }, () => {this.fetchResult(); });
        // }
    }, 500);
    followItem = (item) => {
        followItem(item._id, () => {
            this.props.onAddFavoriteItemChange(item._id);
        }, (err) => {
            this.props.onToast(err);
        })
    }
    unfollowItem = (item) => {
        unfollowItem(item._id, () => {
            this.props.onRemoveFavoriteItemChange(item._id);
        }, (err) => {
            this.props.onToast(err);
        })
    }
}
class ItemCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { item, index, isFavorite, followItem, unfollowItem } = this.props;
        const { longitudeDelta, latitudeDelta } = this.props.mapSetting;

        return (<View style={{ width: '50%' }}>
            <WsItem navigation={this.props.navigation} key={index} item={item} style={{ borderLeftWidth: index % 2 ? 0 : 1, borderTopWidth: index > 1 ? 0 : 1 }}></WsItem>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute', top: 15, right: 15 }}>
                <View style={[styles.button, { flexDirection: 'row', justifyContent: 'center', padding: 8, backgroundColor: colors.white, borderRadius: 15 }]}>
                    <TouchableOpacity style={{ paddingHorizontal: 4 }} {...this.props} onPress={() => { this.props.navigation.navigate('MapModal', { selected_shop_id: item.shop_id }) }}>
                        {/* <Text>{index}</Text> */}
                        <FontAwesome name={"crosshairs"} fontSize={30} />
                    </TouchableOpacity>
                    <Text style={{ height: 10 }}>|</Text>
                    {isFavorite ? <FollowButton onPress={followItem} /> : <UnfollowButton onPress={unfollowItem} />}
                </View>
            </View>
        </View>)
    }
}
const FollowButton = ({ onPress }) => (
    <TouchableOpacity style={{ paddingHorizontal: 4 }} {...this.props} onPress={onPress}>
        <FontAwesome name={"heart-o"} fontSize={28} />
    </TouchableOpacity>
)
const UnfollowButton = ({ onPress }) => (
    <TouchableOpacity style={{ paddingHorizontal: 4 }} {...this.props} onPress={onPress}>
        <FontAwesome name={"heart"} fontSize={28} />
    </TouchableOpacity>
)
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer.mapSetting,
        favorite_items: state.userReducer.favorite_items,
        isRefreshItem: state.itemReducer.isRefreshItem,
        items: state.itemReducer.items,
        scrollTo: state.itemReducer.scrollTo,
        visible: state.itemReducer.visible
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...UserAction, ...ToastAction, ...ItemAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsDisplayScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    button: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: .3
    }
});