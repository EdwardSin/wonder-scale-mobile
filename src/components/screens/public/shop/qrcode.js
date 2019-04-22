import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from "environments/environment";
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import { connect } from 'react-redux';
import { getShopWithNewItems } from 'services/shops';

class ShopQRCodeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shop: {},
      shopId: this.props.shop_id
    }
  }

  componentDidMount() {
    this.getShop();
  }

  getShop = () => {
    getShopWithNewItems(this.state.shopId, (result) => {
      this.setState({ shop: result, loading: false });
    })
  }

  render() {
    return this.state.loading ? <LoadingSpinner /> : (<View style={styles.container}>
      <ScrollView style={{ paddingTop: '30%' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
          <QRCode ecl={"M"} logoSize={75} content={environments.URL + '/' + this.state.shop.username + '?ref=' + this.state.shop._id}
            logo={require('' + 'assets/icons/icon-qrcode.png')} />
        </View>
        <Text style={{ textAlign: 'center' }}>Scan QR Code to access the shop</Text>
      </ScrollView>
    </View>);
  }
}

const mapStateToProps = state => {
  return {
      shop_id: state.shopReducer.shop_id
  }
}

export default connect(mapStateToProps)(ShopQRCodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});