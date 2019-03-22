import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';
import environments from "environments/environment";
import { getShopWithNewItems } from 'services/shops';
import colors from 'assets/variables/colors';
import { LoadingSpinner }from 'components/modals/ws-modals';


export default class ShopQRCodeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      islike: false,
      isfollow: false,
      shop: {},
      shopId: environments.shop_id//this.props.navigation.state.params.shopId;
    }
  }

  componentDidMount() {
    this.getShop();
  }

  getShop = () => {
    this.setState({ loading: true });
    getShopWithNewItems(this.state.shopId, (result) => {
      this.setState({ shop: result, loading: false });
    })
  }

  render() {
    return this.state.loading ? <LoadingSpinner /> : ( <View style={styles.container}>
    <ScrollView style={{ paddingTop: '30%' }}>
      {/* <Text style={{ textAlign: 'center', fontSize: 25 }}>{this.state.shop.name} - QR Code</Text> */}
      <View style={{justifyContent:'center', alignItems:'center', marginBottom: 15}}>
        <QRCode ecl={"M"} logoSize={75} content={environments.URL + '/' +this.state.shop.username + '?ref=5c0802f0f89c190004e49d39'} 
        logo={require(''+ 'assets/icons/icon-qrcode.png')} />
      </View>
      <Text style={{ textAlign: 'center' }}>Scan QR Code to access the shop</Text>
    </ScrollView>
    </View> );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});