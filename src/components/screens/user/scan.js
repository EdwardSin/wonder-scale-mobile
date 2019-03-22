import colors from 'assets/variables/colors';
import { BarCodeScanner, Permissions } from 'expo';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WsDropdown, ListSelectionItem } from 'components/modals/ws-modals';
import { claimVoucher } from 'services/auth/voucher';
import * as _ from 'lodash';

const { width, height } = Dimensions.get('window');
const Banner = () => (
    <View style={styles.captureView}>
        <Text style={styles.captureText}>Scan QR code
        </Text>
    </View>
)

const DropdownItem = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.dropdownItemView}>
        <Text style={styles.dropdownItemText}>{title}</Text>
    </TouchableOpacity>
    // <TouchableOpacity activeOpacity={.9} onPress={onPress} >
    //     <View style={styles.dropdownItemView}>
    //         <Text style={styles.dropdownItemText}>{title}</Text>
    //     </View>
    // </TouchableOpacity>
)
const EnterShopConfirmation = ({ onEnterPress, onCancelPress, onWifiPress }) => (
    <View style={styles.confirmationContainer}>
        <TouchableOpacity activeOpacity={.9} onPress={onEnterPress}>
            <View style={styles.confirmButton}>
                <Text style={styles.buttonText}>Enter Shop</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.9} onPress={onWifiPress}>
            <View style={styles.wirelessButton}>
                <Text style={styles.buttonText}>Connect Network</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.9} onPress={onCancelPress}>
            <View style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
            </View>
        </TouchableOpacity>
    </View>
)

export default class ScanScreen extends React.Component {
    timer = 0;
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
            shopId: '',
            voucherId: ''
        };
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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

                <BarCodeScanner
                    torchMode={this.state.torchMode}
                    onBarCodeScanned={this.barcodeReceived}
                    style={StyleSheet.absoluteFill}>
                    <Banner />
                    <View style={styles.layerTop} />
                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft} />
                        <View style={[styles.focused, styles.captureImage, { borderColor: this.state.isScanned ? '#33cc33' : '#ffffff77' }]}></View>
                        <View style={styles.layerRight} />
                    </View>
                    <View style={styles.layerBottom} />
                    <WsDropdown visible={this.state.isShopRefConfirm}>
                        <DropdownItem style={styles.borderBottom} title={'Enter Shop'} onPress={this.onEnterShopPressed} />
                        <DropdownItem style={styles.borderBottom} title={'Connect Network'} onPress={this.onConnectNetworkPressed} />
                        <DropdownItem style={styles.borderBottom} title={'Cancel'} onPress={this.onCancelPressed} />
                    </WsDropdown>
                    <WsDropdown visible={this.state.isVoucherClaim}>
                        <DropdownItem style={styles.borderBottom} title={'Claim Voucher'} onPress={this.onClaimVoucherPressed} />
                        <DropdownItem style={styles.borderBottom} title={'Cancel'} onPress={this.onCancelPressed} />
                    </WsDropdown>
                </BarCodeScanner>
            </View>
        );
    }

    onEnterShopPressed = () => {
        this.props.navigation.navigate("PublicShop", { shopId: this.state.shopId });
        setTimeout(() => {
            this.setState({ isScanned: false, isShopRefConfirm: false });
        }, 300);
    }
    onConnectNetworkPressed = () => {

    }
    onClaimVoucherPressed = () => {
        claimVoucher(this.state.voucherId, (result) => {
            this.setState({
                isVoucherClaim: false
            })
        })
    }
    onCancelPressed = () => {
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
const opacity = 'rgba(0, 0, 0, .3)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    captureView: {
        backgroundColor: 'transparent',
        padding: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        top: '10%',
        zIndex: 1,
        justifyContent: 'flex-end'
    },
    captureText: {
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
    // buttonText: {
    //     color: colors.secondary,
    //     fontSize: 18
    // },
    // confirmButton: {
    //     backgroundColor: 'rgba(255, 255, 255, .7)',
    //     padding: 20,
    //     borderBottomWidth: 1,
    //     borderBottomColor: 'rgba(0, 0,  0, .3)',
    //     flex: 1,
    //     alignItems: 'center'
    // },
    // wirelessButton: {
    //     backgroundColor: 'rgba(255, 255, 255, .7)',
    //     padding: 20,
    //     borderBottomWidth: 1,
    //     borderBottomColor: 'rgba(0, 0, 0, .3)',
    //     flex: 1,
    //     alignItems: 'center'
    // },
    // cancelButton: {
    //     backgroundColor: 'rgba(255, 255, 255, .7)',
    //     padding: 20,
    //     flex: 1,
    //     alignItems: 'center'
    // },
    dropdownItemView: {
        alignItems: 'center',
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(255, 255, 255, .7)'
    },
    dropdownItemText: {
        color: colors.greyDarken2,
        fontSize: 18
    }
});
