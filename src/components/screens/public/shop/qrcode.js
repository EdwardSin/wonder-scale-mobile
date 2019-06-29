import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from "environments/environment";
import React from 'react';
import { Button, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getShopWithNewItems } from 'services/http/public/shops';

class ShopQRCodeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shop: {},
      shop_id: this.props.shop_id
    }
  }

  componentDidMount() {
    this.getShop();
  }
  getShop = () => {
    getShopWithNewItems(this.state.shop_id, (result) => {
      this.setState({ shop: result.result, loading: false });
    })
  }
  render() {
    let { shop } = this.state;
    return this.state.loading ? <LoadingSpinner /> : (<View style={styles.container}>
      <ScrollView style={{ paddingTop: '30%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
          <QRCode ecl={"M"} logoSize={75} content={environments.URL + `/${shop.username}?ref=${shop._id}`}
            logo={require('' + 'assets/icons/icon-qrcode.png')} />
        </View>
        <Text style={{ textAlign: 'center' }}>Scan QR Code to access the shop</Text>
        <View style={{ paddingVertical: 20, width: 200, alignSelf: 'center' }} >
          <Button title={'Share'} onPress={() => { this.onSharePress() }} />
        </View>
      </ScrollView>
    </View>);
  }
  async onSharePress() {
    await Share.share({
      message: `${this.state.shop.description}`,
      url: `https://www.wonderscale.com/${this.state.shop.username}?ref=${this.state.shop_id}`,
      title: `Shared Shop: ${this.state.shop.name}`
    })
  }
}

const mapStateToProps = state => {
  return {
    shop_id: state.shopReducer.shop_id
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopQRCodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});