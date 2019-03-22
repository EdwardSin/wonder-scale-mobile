import { FontAwesome } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import environments from 'environments/environment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { isFollowItem, addFollowItem, removeFollowItem } from 'services/auth/follow';

export default class WsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: false
        }
    }
    componentDidMount() {
        this.isFavoriteItem();
    }
    getProfileIndex = () => {
        let profile_index = this.props.item.profile_image_index;
        return !profile_index || profile_index === -1 ? 0 : profile_index;
    }
    onFavoritePress = () => {
        let isAddFollow = this.state.follow;
        this.setState({ follow: !isAddFollow }, () => {
            isAddFollow? addFollowItem: removeFollowItem;
        });
    }

    addFollowItem(){
        addFollowItem(this.props.item._id, () => {
        }, (err) => {
            alert(err);
            this.setState({ follow: false });
        })
    }
    removeFollowItem(){
        removeFollowItem(this.props.item._id, () => {
        }, (err) => {
            alert(err);
            this.setState({ follow: true });
        })
    }

    isFavoriteItem = () => {
        isFollowItem(this.props.item._id, (result) => {
            this.setState({ follow: result.follow });
        }, err => { })
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { this.navigateToItem(this.props.item._id) }}>
                <View {...this.props} style={[styles.item, this.props.style]}>
                    {this.props.showFollow &&
                        <TouchableOpacity style={styles.heartOutline} onPress={this.onFavoritePress}>
                            <View>
                                <FontAwesome name={'heart'} color={this.state.follow ? colors.main : colors.white} size={30} />
                            </View>
                        </TouchableOpacity>}
                    <View >
                        <View style={styles.image_view}>
                            <Image style={styles.image} source={{ uri: environments.IMAGE_URL + this.props.item.item_images[this.props.item.profile_image_index] }} />
                        </View>
                        <View style={styles.card_footer}>
                            <Text style={styles.label}>{this.props.item.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {this.props.showSeller ? <Text style={{ flex: 1 }}>{this.props.item.seller.name}</Text> : (null)}
                                {/* <Text style={{ flex: 1, textAlign: 'right' }}>{this.props.item.currency}{this.props.item.price}</Text> */}
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
