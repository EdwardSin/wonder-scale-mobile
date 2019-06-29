import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import environments from 'environments/environment';
import React from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { follow, unfollow } from 'services/http/auth-user/follow';
const { width } = Dimensions.get('window');

class LatestCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
            modalVisible: false,
            isFollow: this.props.item.isFollow
        };
    }
    render() {
        let items = [];

        this.props.item.newItems.map((item, index) => items.push(
            <TouchableOpacity key={item._id} onPress={() => this.setModalVisible(true, index)}>
                {item.item_images != undefined && <Image style={{ width: 100, height: 100, marginRight: 10 }} source={{ uri: environments.IMAGE_URL + item.item_images[item.profile_image_index] }} />}
            </TouchableOpacity>
        ));

        return (
            <View {...this.props} style={styles.card}>
                <ShopProfileImage item={this.props.item}
                    following={this.state.isFollow}
                    onTitlePress={() => { this.navigateToShop(this.props.item._id) }}
                    addFollowShop={() => { this.addFollowShop(this.props.item._id) }}
                    removeFollowShop={() => { this.removeFollowShop(this.props.item._id) }} />
                <ShopDescription item={this.props.item} />
                <LatestItems items={items} />
                <ModalItem item={this.props.item}
                    isVisible={this.state.modalVisible}
                    imageIndex={this.state.imageIndex}
                    onButtonPress={() => { this.navigateToPublicItem(this.props.item._id) }}
                    onSwipeDown={() => { this.setModalVisible(false) }} />
            </View>
        );
    }

    setModalVisible = (visible, index) => {
        this.setState({ modalVisible: visible, imageIndex: index });
    }

    removeFollowShop = (id) => {
        unfollow({ id, type: 'shop' }, (result) => {
            if (result['success']) {
                this.setState({ isFollow: result['follow'] });
            }
        }, (err) => {
            this.props.onToast(err)
        });
    }
    addFollowShop = (id) => {
        follow({ id, type: 'shop' }, (result) => {
            if (result['success']) {
                this.setState({ isFollow: result['follow'] });
            }
        }, (err) => {
            this.props.onToast(err)
        });
    }
    navigateToShop = (shopId) => {
        this.props.navigation.navigate("FrontShop", { shopId: shopId });
    }
    navigateToPublicItem = (itemId) => {
        this.setModalVisible(false);
        this.props.navigation.navigate("ItemDetail", { itemId: itemId });
    }
}
const ShopProfileImage = ({ item, following, onTitlePress, removeFollowShop, addFollowShop }) => (
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onTitlePress}>
            <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: environments.IMAGE_URL + item.profile_image }} />
        </TouchableOpacity>
        <View>
            <Text style={{ fontSize: 20 }} onPress={onTitlePress}>{item.name}</Text>
        </View>

        {following ?
            <View style={{ marginLeft: 'auto' }}>
                <TouchableOpacity
                    onPress={removeFollowShop}>
                    <View style={{ backgroundColor: colors.main, borderColor: colors.main, borderWidth: 3, borderRadius: 3 }}>
                        <Text style={{ margin: 5, color: colors.white }}>Following</Text>
                    </View>
                </TouchableOpacity>
            </View> :
            <View style={{ marginLeft: 'auto' }}>
                <TouchableOpacity
                    onPress={addFollowShop}>
                    <View style={{ borderColor: colors.main, borderWidth: 1, borderRadius: 3 }}>
                        <Text style={{ margin: 5, color: colors.main }}>Follow</Text>
                    </View>
                </TouchableOpacity>
            </View>}
    </View>
);

const ShopDescription = ({ item }) => (
    <Text style={styles.description}>{item.latest.message}</Text>
);

const LatestItems = ({ items }) =>
    (<ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ flexDirection: 'row' }}>
        {items}
    </ScrollView>);

const ModalItem = ({ item, isVisible, onSwipeDown, onButtonPress, imageIndex }) => {
    let images = item.newItems.map(item => {
        return {
            url: environments.IMAGE_URL + item.item_images[item.profile_image_index],
            title: item.name, width, height: 300
        }
    }
    )
    return (
        <Modal visible={isVisible} transparent={true} onRequestClose={() => { }}>
            <ImageViewer backgroundColor="rgba(0,0,0,.8)" enableSwipeDown={true} onSwipeDown={onSwipeDown} index={imageIndex} imageUrls={images}
                renderFooter={(currentIndex) => {
                    let it = item.newItems[currentIndex || 0];
                    return (<View style={{ width, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                        <TouchableOpacity onPress={onButtonPress}>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, backgroundColor: colors.main }}>
                                <Text style={{ color: colors.white }}>{it.currency + ' ' + it.price + ' | Details'}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: colors.white, fontSize: 15 }}>{it.name}</Text>
                    </View>)
                }}
            />
        </Modal>
    )
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LatestCard);

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: colors.greyLighten5,
        marginBottom: 10
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        marginVertical: 5
    }
});
