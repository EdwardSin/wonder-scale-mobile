import { FontAwesome } from '@expo/vector-icons';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import environments from 'environments/environment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followItem, unfollowItem } from 'services/auth-user/follow';

const FollowIcon = ({ isFavorite, onFavoritePress }) => (
    <TouchableOpacity style={styles.heartOutline} onPress={onFavoritePress}>
        <FontAwesome name={'heart'} color={isFavorite ? colors.main : colors.white} size={30} />
    </TouchableOpacity>)

const currency = new Currency();

class WsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: false
        }
    }
    componentDidMount() {
    }
    getProfileIndex = () => {
        let profile_index = this.props.item.profile_image_index;
        return !profile_index || profile_index === -1 ? 0 : profile_index;
    }
    onFavoritePress = () => {
        let isFollowing = this.isFavoriteItem();
        this.setState({ follow: !isFollowing }, () => {
            isFollowing ? this.unfollowItem() : this.followItem();
        });
    }

    followItem() {
        followItem(this.props.item._id, () => {
            this.props.onAddFavoriteItemChange(this.props.item._id);
        }, (err) => {
            this.props.onToast(err);
            this.setState({ follow: false });
        })
    }
    unfollowItem() {
        unfollowItem(this.props.item._id, () => {
            this.props.onRemoveFavoriteItemChange(this.props.item._id);
        }, (err) => {
            this.props.onToast(err);
            this.setState({ follow: true });
        })
    }
    isFavoriteItem = () => {
        return _.includes(this.props.favorite_items, this.props.item._id);
    }
    render() {
        const { profile_images, profile_image_index } = this.props.item;
        return (
            <TouchableOpacity activeOpacity={.8} onPress={() => { this.navigateToItem(this.props.item._id) }}>
                <View {...this.props} style={[styles.item, this.props.style]}>
                    {this.props.showFollow && <FollowIcon isFavorite={this.isFavoriteItem()} onFavoritePress={this.onFavoritePress} />}
                    <View >
                        <View style={styles.image_view}>
                            {profile_images && profile_images.length ?
                                <Image progressiveRenderingEnabled style={styles.image} source={{ uri: environments.IMAGE_URL + profile_images[profile_image_index] }} /> :
                                <Image progressiveRenderingEnabled style={styles.image} defaultSource={require('' + 'assets/uploads/img_not_available.png')} source={{ uri: environments.IMAGE_URL + 'upload/images/img_not_available.png' }} />}
                        </View>
                        <View style={styles.card_footer}>
                            <Text style={styles.label}>{this.props.item.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {this.props.showSeller && this.props.item.seller && <Text style={{ flex: 1 }}>{this.props.item.seller.name}</Text>}
                                <Text style={{ flex: 1, textAlign: 'right' }}>{currency.currencySymbols[this.props.item.currency]}{this.props.item.price}</Text>
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
        right: 10,
        top: 10,
        zIndex: 1,
        opacity: .7
    }
});
WsItem.defaultProps = {
    
}
WsItem.propTypes = {
    navigation: PropTypes.object,
    showFollow: PropTypes.bool,
    item: PropTypes.object
}