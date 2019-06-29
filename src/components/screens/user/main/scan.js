import * as ShopAction from 'actions/shop-reducer.action';
import colors from 'assets/variables/colors';
import { WsDropdown } from 'components/modals/ws-modals';
import { BarCodeScanner, Permissions } from 'expo';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { claimVoucher } from 'services/http/auth-user/voucher';

const { width, height } = Dimensions.get('window');

class ScanScreen extends React.Component {
    timer = 0;
    subs;
    clearScanning;

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            torchMode: 'on',
            cameraType: 'front',
            isShopRefConfirm: false,
            isScanned: false,
            isVoucherClaim: false,
            isOnFocused: true,
            shopId: '',
            voucherId: ''
        };
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ];
    }
    componentDidFocus(payload) {
        this.setState({ isOnFocused: true });
    }
    componentWillUnMount() {
        this.subs.forEach(sub => sub.remove());
    }
    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text></Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                {/* 
                // @ts-ignore */}
                {this.state.isOnFocused && <BarCodeScanner torchMode={this.state.torchMode} onBarCodeScanned={this.barcodeReceived} style={StyleSheet.absoluteFill}>
                    <Caption>Scan QR code</Caption>
                    <ScanArea isScanned={this.state.isScanned} />
                    <WsDropdown visible={this.state.isShopRefConfirm}>
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'Enter Shop'} onPress={this.onEnterShopPress} />
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'View Items'} onPress={this.onViewItemsPress} />
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'Job Recruitment'} onPress={this.onJobRecruitmentPress} />
                        {/* 
  // @ts-ignore */}
                        {/* <DropdownItem style={styles.borderBottom} title={'Connect Network'} onPress={this.onConnectNetworkPress} /> */}
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'Cancel'} onPress={this.onCancelPress} />
                    </WsDropdown>
                    <WsDropdown visible={this.state.isVoucherClaim}>
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'Claim Voucher'} onPress={this.onClaimVoucherPress} />
                        {/* 
  // @ts-ignore */}
                        <DropdownItem style={styles.borderBottom} title={'Cancel'} onPress={this.onCancelPress} />
                    </WsDropdown>
                </BarCodeScanner>}
            </View>
        );
    }
    // #region Event
    onViewItemsPress = () => {
        let { shopId } = this.state;
        this.props.onSelectedShopId(shopId);
        this.props.navigation.navigate("Categories");
        this.setState({ isOnFocused: false });
        setTimeout(() => {
            this.setState({ isScanned: false, isShopRefConfirm: false });
        }, 300);
    }
    onEnterShopPress = () => {
        let { shopId } = this.state;
        this.props.onSelectedShopId(shopId);
        this.props.navigation.navigate("PublicShop");
        this.setState({ isOnFocused: false });
        setTimeout(() => {
            this.setState({ isScanned: false, isShopRefConfirm: false });
        }, 300);
    }
    onJobRecruitmentPress = () => {
        let { shopId } = this.state;
        this.props.onSelectedShopId(shopId);
        this.props.navigation.navigate("Recruitment");
        this.setState({ isOnFocused: false });
        setTimeout(() => {
            this.setState({ isScanned: false, isShopRefConfirm: false });
        }, 300);
    }
    onConnectNetworkPress = () => {

    }
    onClaimVoucherPress = () => {
        let { voucherId } = this.state;
        claimVoucher(voucherId, (result) => {
            this.setState({
                isVoucherClaim: false
            })
        })
    }
    onCancelPress = () => {
        this.setState({ isShopRefConfirm: false, isScanned: false, isVoucherClaim: false })
    }
    barcodeReceived = (e) => {
        if (e) {
            let ref_index = e.data.indexOf('ref=');
            let voucher_index = e.data.indexOf('https://www.wonderscale.com/auth-vouchers/redeem/');
            if (ref_index > -1) {
                this.determineShopReference(e);
            }
            else if (voucher_index > -1) {
                this.determineClaimVoucher(e)
            }

        }
    }
    // #endregion
    determineShopReference = (e) => {
        let _id = e.data.substring(e.data.indexOf('ref=') + 4);
        if (_id.length === 24) {
            this.setState({ isScanned: true, isShopRefConfirm: true, shopId: _id });
            this.timer = 0;
            clearInterval(this.clearScanning);
            this.clearScanning = setInterval(() => {
                this.timer++;
                if (this.timer == 1) {
                    this.timer = 0;
                    this.setState({ isScanned: false, isShopRefConfirm: false, shopId: '' });
                    clearInterval(this.clearScanning);
                }
            }, 800);
        }
    }
    determineClaimVoucher = (e) => {
        let url = 'https://www.wonderscale.com/auth-vouchers/redeem/';
        let _id = e.data.substring(e.data.indexOf(url) + url.length);
        if (_id.length === 24) {
            this.setState({ isScanned: true, isVoucherClaim: true, voucherId: _id });
            this.timer = 0;
            clearInterval(this.clearScanning);
            this.clearScanning = setInterval(() => {
                this.timer++;
                if (this.timer == 1) {
                    this.timer = 0;
                    this.setState({ isScanned: false, isVoucherClaim: false, voucherId: '' });
                    clearInterval(this.clearScanning);
                }
            }, 800);
        }
    }
}
const Caption = ({ children }) => (
    <View style={styles.captionView}>
        <Text style={styles.captionText}>{children}</Text>
    </View>
)

const DropdownItem = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.dropdownItemView}>
        <Text style={styles.dropdownItemText}>{title}</Text>
    </TouchableOpacity>
)

const ScanArea = ({ isScanned }) => (
    <View>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={[styles.focused, styles.captureImage, { borderColor: isScanned ? '#33cc33' : '#ffffff77' }]}></View>
            <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
    </View>
)

const mapStateToProps = state => {
    return {};
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ShopAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);

const opacity = 'rgba(0, 0, 0, .3)';

const styles = StyleSheet.create({
    layerTop: {
        width: '100%',
        height: ((height - 300) / 2 - 45),
        backgroundColor: opacity
    },
    layerCenter: {
        height: 300,
        flexDirection: 'row'
    },
    layerLeft: {
        width: ((width - 300) / 2),
        backgroundColor: opacity
    },
    focused: {
        height: 300,
        width: 300
    },
    layerRight: {
        width: ((width - 300) / 2),
        backgroundColor: opacity
    },
    layerBottom: {
        height: ((height - 300) / 2),
        width: '100%',
        backgroundColor: opacity
    },
    captionView: {
        backgroundColor: 'transparent',
        padding: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        top: '10%',
        zIndex: 1,
        justifyContent: 'flex-end'
    },
    captionText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.white
    },
    captureImage: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        borderWidth: 1
    },
    confirmationContainer: {
        position: 'absolute',
        top: height / 2 - 100,
        left: width / 2 - 130,
        width: 260,
        borderRadius: 5,
        overflow: 'hidden'
    },
    dropdownItemView: {
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, .7)'
    },
    dropdownItemText: {
        color: colors.greyDarken2,
        fontSize: 18
    }
});
