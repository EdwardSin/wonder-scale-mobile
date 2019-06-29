import Ionicons from '@expo/vector-icons/Ionicons';
import * as VoucherAction from 'actions/voucher-reducer.action';
import { LoadingSpinner, WsButton, WsStatusBar, WsTextInput } from 'components/modals/ws-modals';
import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVoucherWithPromotion, redeemVoucher } from 'services/http/auth-user/voucher';
import colors from './../../../../assets/variables/colors';
const { width, height } = Dimensions.get('window');

class VourchersScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRedeem: false,
            redeemLoading: false,
            secret_code: '',
            redeemModalVisible: false,
            termAndConditionModalVisible: false
        }
    }
    componentDidMount() {
        this.getVoucherWithPromotion(this.props.navigation.state.params.voucher_id);
    }

    getVoucherWithPromotion = (voucher_id) => {
        this.setState({ loading: true });
        getVoucherWithPromotion(voucher_id, (result) => {
            this.setState({
                item: result,
                searchVouchers: result,
                loading: false,
                refreshing: false
            });
        })
    }
    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <ScrollView style={{ flex: 1, paddingTop: 40 }}>
                <WsStatusBar />
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: 'https://assets.wonderscale.com/' + this.state.item.promotion.profile_image }} />
                <View style={styles.descriptionContainer}>
                    <Text>{this.state.item.promotion.title}</Text>
                    <Text style={{ marginBottom: 10 }}>{this.state.item.promotion.description}</Text>
                    <Text>Valid from{' '}
                        <Text style={{ color: colors.green, paddingHorizontal: 5 }}>{moment(this.state.item.valid_from).format('DD MMM YYYY')}</Text>
                        {' '}to{' '}
                        <Text style={{ color: colors.green, paddingHorizontal: 5 }}>{moment(this.state.item.valid_to).format('DD MMM YYYY')}</Text>
                    </Text>
                    {this.state.item.redemption_date && <Text>Used: {moment(this.state.item.redemption_date).format('DD MMM YYYY')}</Text>}
                    {!this.state.item.redemption_date && <Text>Status: <Text style={{ color: 'red' }}>Expired</Text></Text>}
                    {this.state.item.promotion && this.state.item.promotion.is_term_and_condition && <Text style={{ color: '#0000FF' }} onPress={() => { this.setState({ termAndConditionModalVisible: true }) }}>Term and Condition</Text>}
                    <View style={{ marginBottom: 20 }}></View>
                    {this.state.item.valid &&
                        <TouchableOpacity style={[styles.claimButton, { backgroundColor: '#282C35' }]} onPress={() => { this.onRedeemModalPressed() }}>
                            <Text style={styles.claimText}>{'Redeem'}</Text>
                        </TouchableOpacity>}
                    <WsButton backgroundColor={'red'} style={{ marginBottom: 10 }} onPress={() => { this.props.navigation.goBack() }}>Cancel</WsButton>
                </View>

                <Modal onRequestClose={() => { }} visible={this.state.redeemModalVisible} animationType={'fade'}>
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', padding: 20 }} enabled behavior={'padding'}>
                        <Text style={{ color: '#888', marginBottom: 30 }}>To redeem the voucher, please ask the seller to enter the security code.</Text>
                        <WsTextInput value={this.state.secret_code} textInput={{ placeholder: 'Security Code:', onChangeText: (text) => { this.setState({ secret_code: text }) } }} />
                        <WsButton style={{ marginBottom: 20 }} onPress={() => {
                            this.onRedeemVoucherPressed({
                                voucher_id: this.state.item._id,
                                promotion_id: this.state.item.promotion._id,
                                secret_code: this.state.secret_code
                            })
                        }}>{'Redeem'}</WsButton>
                        <WsButton style={{ marginBottom: 40 }} onPress={() => { this.setState({ redeemModalVisible: false }) }}>{'Cancel'}</WsButton>
                        <View style={{ backgroundColor: 'rgba(255,255,255,.8)', width, height, position: 'absolute', top: 0, left: 0, display: this.state.isRedeem ? 'flex' : 'none' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                {this.state.redeemLoading ? <ActivityIndicator size={'large'} color={'#222'} /> :
                                    (
                                        <TouchableOpacity onPress={this.onRedeemDonePressed}>
                                            <View>
                                                <Ionicons style={{ color: '#00cc00' }} size={80} name={'ios-checkmark-circle-outline'} />
                                                <Text style={{ color: '#00cc00', fontSize: 30 }}>Done</Text>
                                            </View>
                                        </TouchableOpacity>)
                                }
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
                <Modal onRequestClose={() => { }} visible={this.state.termAndConditionModalVisible} animationType={'fade'} >
                    <ScrollView style={{ flex: 1, padding: 30 }}>
                        <WsStatusBar />
                        <Text>
                            {this.state.promotion != undefined && this.state.item.promotion.term_and_condition}
                        </Text>
                        <WsButton style={{ marginBottom: 40 }} onPress={() => { this.setState({ termAndConditionModalVisible: false }) }}>{'Cancel'}</WsButton>
                    </ScrollView>
                </Modal>
            </ScrollView>
        );
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
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

    onDetailModalPressed = () => {
        this.setState({
            detailModalVisible: true
        })
    }
    onRedeemModalPressed = () => {
        this.setState({
            redeemModalVisible: true
        })
    }
    onRedeemVoucherPressed = (obj) => {
        this.setState({ isRedeem: true, redeemLoading: true })
        redeemVoucher(obj, (result) => {
            this.setState({ redeemLoading: false }, () => {
                this.props.onVoucherRedeemed();
                //this.props.navigation.goBack();
            });
        });
    }

    onRedeemDonePressed = (obj) => {
        this.setState({ isRedeem: false, redeemModalVisible: false }, () => {
            this.props.navigation.goBack();
        });
    }
}

const mapStateToProps = state => {
    return {
        refreshVoucher: state.voucherReducer.refresh
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...VoucherAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(VourchersScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    description: {
        marginVertical: 5
    },
    card: {
        backgroundColor: colors.greyLighten5
    },
    updateAt: {
        color: '#888'
    },
    descriptionContainer: {
        padding: 20
    },
    claimButton: {
        backgroundColor: '#282C35',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'center',
        marginBottom: 10
    },
    claimText: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center'
    }
});