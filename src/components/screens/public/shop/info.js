import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { getShopWithNewItems } from 'services/shops';
;

let ImageArray = ({ images }) => (images.map((image, index) =>
    
    <View key={index} style={{ padding: 15, paddingBottom: 0 }}>
        <Image width={Dimensions.get('window').width - 30} style={styles.image} source={{ uri: environments.IMAGE_URL + image }} />
    </View>
))

export default class InfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
        return (
            this.state.loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <ScrollView style={{ flex: 1 }}>
                        <ImageArray images={this.state.shop.information_images} />
                    </ScrollView>
                </View>)
        );
    }
    navigateToSearchItemBar = () => {
        this.props.navigation.navigate('AllItems');
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightenGrey
    },
    image: {
        resizeMode: 'stretch',
        // width: undefined,
        // height: undefined,
        width: '100%',
        borderRadius: 5
    }
});