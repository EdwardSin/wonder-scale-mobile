import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './../../assets/variables/colors';

const { width } = Dimensions.get('window');

export default class WsVoucherCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderShopProfile = () => (
        <TouchableOpacity activeOpacity={.7} onPress={this.navigateToRedeemScreen}>
            <View>
                <Image style={{ width: '100%', height: 200 }} source={{ uri: 'https://assets.wonderscale.com/' + this.props.item.promotion.profile_image }} />
                <View style={{ flexDirection: 'row', padding: 10, borderTopColor: colors.grey, borderTopWidth: 1 }}>
                    <View>
                        <Text style={[styles.text, { fontSize: 20 }]}>{this.props.children}</Text>
                        {/* <Text style={{ paddingVertical: 5, color: '#00c851' }}>Valid Until: {moment(new Date()).format('DD MMM YYYY')}</Text> */}
                        <Text style={[styles.text, { marginTop: 20 }]} onPress={() => { this.navigateToFrontShop(this.props.item.shop._id) }}>{this.props.item.shop.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <View {...this.props} style={[styles.card, {opacity: this.props.item.valid ? 1 : .4}]}>
                {this.renderShopProfile()}
            </View>
        );
    }
    navigateToFrontShop = (shop_id) => {
        this.props.navigation.navigate('FrontShop', { shopId: shop_id });
    }
    navigateToRedeemScreen = () => {
        this.props.navigation.navigate('Redeem', { voucher_id: this.props.item._id });
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        marginBottom: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: 5,
        overflow: 'hidden'
    },
    text: {
        
    }
});
