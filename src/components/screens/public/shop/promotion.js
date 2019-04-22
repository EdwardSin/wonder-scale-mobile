import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, Title, WsRefreshControl, WsStatusBar } from 'components/modals/ws-modals';
import environments from "environments/environment";
import moment from 'moment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getPromotionsByShopId } from 'services/promotions';


class ShopPromotionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            islike: false,
            isfollow: false,
            shop: {},
            promotions: [],
            shopId: this.props.shop_id
        }
    }
    componentDidMount() {
        this.getPromotionsByShopId();
    }
    render() {
        return this.state.loading ? <LoadingSpinner /> : (<View style={styles.container}>
            <WsStatusBar/>
            <Title style={{paddingHorizontal: 20}}>Promotion</Title>
            <ScrollView refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />}>
                {this.state.promotions.length > 0 ? this.state.promotions.map((promotion, index) => (
                    <View style={{ marginBottom: 5 }}>
                        <PromotionCard key={index} index={index} item={promotion} 
                        onClaimPress={this.onClaimPress}
                        onPress={() => this.navigateToPromotionDetail(promotion)} />
                    </View>
                )) :
                    <EmptyList message={'No Promotion!'} />
                }
            </ScrollView>
        </View>);
    }
    getPromotionsByShopId = () => {
        getPromotionsByShopId(this.state.shopId, (result) => {
            this.setState({ promotions: result.result, loading: false, refreshing: false });
        })
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getPromotionsByShopId();
        })
    }
    onClaimPress = () => {

    }
    navigateToPromotionDetail= (promotion) => {
        this.props.navigation.navigate('PromotionDetail', { promotion_id: promotion._id })
    }
}

const PromotionCard = ({ item, index, onPress, onClaimPress }) => 
(<TouchableOpacity onPress={onPress}>
    <View style={styles.item}>
        <Image style={styles.image} source={{ uri: environments.IMAGE_URL + item.profile_image }} />
        <View style={{ backgroundColor: colors.white, padding: 20, flexDirection: 'row' }}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>{item.title}</Text>
                <Text style={{ fontSize: 18 }}>
                    {moment(item.start_date).format('DD MMM YYYY')} - {moment(item.expiry_date).format('DD MMM YYYY')}</Text>
            </View>
            <TouchableOpacity style={{marginLeft: 'auto'}} onPress={onClaimPress}>
                <View style={{ padding: 20, backgroundColor: colors.secondary, borderRadius: 5 }}>
                    <Text style={{ color: colors.white }}>CLAIM</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
</TouchableOpacity>)

const mapStateToProps = state => {
    return {
        shop_id: state.shopReducer.shop_id
    }
  }

export default connect(mapStateToProps)(ShopPromotionScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.greyLighten2,
        flex: 1,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200
    },
});