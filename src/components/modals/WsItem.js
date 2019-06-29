import { FontAwesome } from '@expo/vector-icons';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import * as ImageHelper from 'helpers/image.helper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followItem, unfollowItem } from 'services/general/auth/follow';

const FollowIcon = ({ isFavorite, onFavoritePress }) => (
    <TouchableOpacity style={[styles.heartOutline]} onPress={onFavoritePress}>
        <FontAwesome name={'heart'} style={{ shadowOpacity: 1, shadowOffset: { width: 0, height: 0 }, shadowColor: colors.grey, elevation: 2 }} color={isFavorite ? colors.main : colors.grey} size={20} />
    </TouchableOpacity>)

const currency = new Currency();

class WsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: false
        }
    }
    onFavoritePress = () => {
        let isFollowing = this.isFavoriteItem();
        this.setState({ follow: !isFollowing }, () => {
            isFollowing ? this.unfollow() : this.follow();
        });
    }
    follow = async () => {
        try {
            let { _id } = this.props.item;
            let result = await followItem(_id);
            if (result) {
                this.props.onAddFavoriteItemChange(this.props.item._id);
                this.setState({ follow: result });
            }
        }
        catch (err) {
            this.props.navigation.navigate('Login');
        }
    }
    unfollow = async () => {
        try {
            let { _id } = this.props.item;
            let result = await unfollowItem(_id);
            if (!result) {
                this.props.onRemoveFavoriteItemChange(this.props.item._id);
                this.setState({ follow: result });
            }
        }
        catch (err) {
            this.props.navigation.navigate('Login');
        }
    }
    isFavoriteItem = () => {
        return _.includes(this.props.favorite_items, this.props.item._id);
    }
    render() {
        const { profile_images, profile_image_index } = this.props.item;
        const { item } = this.props;
        return (
            <TouchableOpacity activeOpacity={.8} onPress={() => { this.navigateToItem(this.props.item._id) }}>
                <View {...this.props} style={[styles.item, this.props.style]}>
                    {this.props.showFollow && <FollowIcon isFavorite={this.isFavoriteItem()} onFavoritePress={this.onFavoritePress} />}
                    <View style={styles.image_view}>
                        <Image progressiveRenderingEnabled style={styles.image} source={{ uri: ImageHelper.getProfileImage(profile_images, profile_image_index) }} />
                    </View>
                    <View style={styles.card_footer}>
                        <Text style={styles.label} ellipsizeMode={'tail'} numberOfLines={2}>{item.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {this.props.showSeller && item.seller && <Text style={{ flex: 1 }}>{item.seller.name}</Text>}
                            <View style={{ flex: 1, height: 30, justifyContent: 'flex-end' }}>
                                {item.is_offer && <Text style={{ textDecorationLine: 'line-through', textAlign: 'right' }}>{currency.currencySymbols[item.currency]} {item.price.toFixed(2)}</Text>}
                                <Text style={{ color: item.is_offer ? 'red' : colors.secondary, textAlign: 'right' }}>{currency.currencySymbols[item.currency]} {item.priceAfterDiscount.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    navigateToItem = (itemId) => {
        this.props.navigation.navigate("ItemDetail", { itemId: itemId });
    }
}

const mapStateToProps = state => {
    return {
        favorite_items: state.userReducer.favorite_items
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction, ...UserAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WsItem);

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.greyLighten2,
        flex: 1,
    },
    image_view: {
        width: '100%',
        height: 200
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    label: {
        paddingBottom: 10,
        textAlign: 'center'
    },
    card_footer: {
        padding: 15,
    },
    heart: {
        position: 'absolute',
        right: 18,
        top: 15,
        zIndex: 1,
        opacity: .6
    },
    heartOutline: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
        opacity: .7,
    }
});
WsItem.defaultProps = {

}
WsItem.propTypes = {
    navigation: PropTypes.object,
    showFollow: PropTypes.bool,
    item: PropTypes.object
}