import colors from 'assets/variables/colors';
import { LoadingSpinner, WsItem, WsRefreshControl, EmptyList, WsVoucherCard, WsSearchbar } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import React from 'react';
import * as _ from 'lodash';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onVoucherRefreshed } from 'actions/voucher-reducer-action';
import { getUserAvailableClaimedVouchers, getUserUnavailableClaimedVouchers } from 'services/auth/voucher';

const { width } = Dimensions.get('window');


class UsedClaimedVoucherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            keyword: ''
        }
    }
    componentDidMount() {
        this.getUserUnavailableClaimedVouchers();
    }

    getUserUnavailableClaimedVouchers = () => {
        this.setState({ loading: true });

        getUserUnavailableClaimedVouchers((result) => {
            this.setState({
                vouchers: result['result'],
                searchVouchers: result['result'],
                loading: false,
                refreshing: false
            });
        })
    }
    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <View style={styles.container}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
                    <WsSearchbar
                        placeholder={'Search shop name...'}
                        loading={this.state.loading}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <FlatList data={this.state.searchVouchers}
                    keyExtractor={(item, index) => item['_id']}
                    ListEmptyComponent={<EmptyList message={"No claimed voucher found!"} />}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%', padding: 10 }}>
                                <WsVoucherCard navigation={this.props.navigation} item={item}>{item.promotion.title}</WsVoucherCard>
                            </View>
                        )
                    }}
                    refreshControl={<WsRefreshControl refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh.bind(this)} />
                    } />
            </View>
        );
    }
    onKeywordSearchbarChanged = (text) => {
        this.setState({ keyword: text });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getUserUnavailableClaimedVouchers();
        })
    }
    navigateToShop = (shopId) => {
        this.props.navigation.navigate("PublicShop", { shopId: shopId });
    }
    onChangeText = _.debounce((value) => {
        if (value === '') {
            this.setState({ searchVouchers: this.state.vouchers });
        }
        else {
            let searchVouchers = _.filter(this.state.vouchers, (voucher) => {
                if (voucher.shop) {
                    return voucher.shop.name.toLowerCase().match(value.toLowerCase())
                }
                else {
                    return;
                }
            }
            ) || []
            this.setState({ searchVouchers: searchVouchers });
        }
    }, 500);
}

const mapStateToProps = state => {
    return {
        refreshVoucher: state.voucherReducer.refreshVoucher
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ onVoucherRefreshed }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsedClaimedVoucherScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    description: {
        marginTop: 5,
        marginBottom: 5
    },
    card: {
        backgroundColor: '#f7f7f7'
    },
    updateAt: {
        color: '#888'
    }
});