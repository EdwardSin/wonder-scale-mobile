import React from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import environments from 'environments/environment';
import { addFollowShop, removeFollowShop } from 'services/auth/follow';
import colors from 'assets/variables/colors';
import sizes from 'assets/variables/sizes';
const { width } = Dimensions.get('window');

export default class LatestCard extends React.Component {

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
                <Image style={{ width: 100, height: 100, marginRight: sizes.margin2 }}
                    source={{ uri: environments.IMAGE_URL + item.item_images[item.profile_image_index] }} />
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

    removeFollowShop = (shopId) => {
        removeFollowShop(shopId, (result) => {
            if (result['success']) {
                this.setState({ isFollow: result['follow'] });
            }
        });
    }
    addFollowShop = (shopId) => {
        addFollowShop(shopId, (result) => {
            if (result['success']) {
                this.setState({ isFollow: result['follow'] });
            }
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
            style={{ width: 50, height: 50, marginRight: sizes.margin2 }}
            source={{ uri: environments.IMAGE_URL + item.profile_image }} />
        </TouchableOpacity>
        <View>
            <Text style={{fontSize: 20}} onPress={onTitlePress}>{item.name}</Text>
        </View>

        {following ?
            <View style={{ marginLeft: 'auto' }}>
                <TouchableOpacity
                    onPress={removeFollowShop}>
                    <View style={{ backgroundColor: colors.main, borderColor: colors.main, borderWidth: 3, borderRadius: 3 }}>
                        <Text style={{ margin: sizes.margin1, color: colors.white }}>Following</Text>
                    </View>
                </TouchableOpacity>
            </View> :
            <View style={{ marginLeft: 'auto' }}>
                <TouchableOpacity
                    onPress={addFollowShop}>
                    <View style={{ borderColor: colors.main, borderWidth: 1, borderRadius: 3 }}>
                        <Text style={{ margin: sizes.margin1, color: colors.main }}>Follow</Text>
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
        <Modal visible={isVisible} transparent={true}>
            <ImageViewer backgroundColor="rgba(0,0,0,.8)" enableSwipeDown={true} onSwipeDown={onSwipeDown} index={imageIndex} imageUrls={images}
                renderFooter={(currentIndex) => {
                    let it = item.newItems[currentIndex || 0];
                    return (<View style={{ width, alignItems: 'center', justifyContent: 'center', paddingBottom: sizes.padding2, paddingTop: sizes.padding2 }}>
                        <TouchableOpacity onPress={onButtonPress}>
                            <View style={{ paddingTop: sizes.padding1, paddingBottom: sizes.padding1, paddingLeft: sizes.padding2, paddingRight: sizes.padding2, borderRadius: 20, backgroundColor: colors.main }}>
                                <Text style={{ color: colors.white }}>{it.currency + ' ' + it.price + ' | Details'}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: colors.white, fontSize: sizes.fontsize3 }}>{it.name}</Text>
                    </View>)
                }}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: sizes.padding2,
        backgroundColor: colors.lightenGrey,
        marginBottom: sizes.margin2
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        width: sizes.w100,
        height: sizes.h100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        marginTop: sizes.margin1,
        marginBottom: sizes.margin1
    }
});
