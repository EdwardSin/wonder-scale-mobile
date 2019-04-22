import * as VoucherAction from 'actions/voucher-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, WsRefreshControl, WsSearchbar, WsVoucherCard } from 'components/modals/ws-modals';
import * as _ from 'lodash';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAvailableClaimedVouchers } from 'services/auth-user/voucher';


class AvailableClaimedVoucherScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            keyword: ''
        }
    }
    componentDidMount() {
        this.getUserAvailableClaimedVouchers();
    }
    componentDidUpdate(prevProps) {
        if (this.props.refreshVoucher !== prevProps.refreshVoucher) {
            this.getUserAvailableClaimedVouchers();
        }
    }
    getUserAvailableClaimedVouchers = () => {
        this.setState({ loading: true });
        getUserAvailableClaimedVouchers((result) => {
            this.props.onVoucherRefreshed();
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
                    <WsSearchbar placeholder={'Search shop name...'} loading={this.state.loading} onChangeText={this.onChangeText} />
                </View>
                <FlatList data={this.state.searchVouchers}
                    keyExtractor={(item, index) => item['_id']}
                    ListEmptyComponent={<EmptyList message={"No claimed voucher found!"} />}
                    refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />}
                    renderItem={({ item, index }) => (
                        <View key={index} style={{ width: '100%', padding: 10 }}>
                            <WsVoucherCard navigation={this.props.navigation} item={item}>{item.promotion.title}</WsVoucherCard>
                        </View>
                    )} />
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
            this.getUserAvailableClaimedVouchers();
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
    return bindActionCreators({ ...VoucherAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableClaimedVoucherScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    }
});