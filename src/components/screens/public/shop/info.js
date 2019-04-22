import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { getShopWithNewItems } from 'services/shops';

const { width } = Dimensions.get('window');

class InfoScreen extends React.Component {
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
        this.setState({ loading: true });
        getShopWithNewItems(this.state.shop_id, (result) => {
            this.setState({ shop: result, loading: false });
        })
    }
    render() {
        return (
            this.state.loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <ScrollView style={{ flex: 1 }}>
                        {this.state.shop.information_images && this.state.shop.information_images.length > 0 ?
                            <ImageArray images={this.state.shop.information_images} />
                            : <EmptyList message={'No information banner displayed!'} />
                        }
                    </ScrollView>
                </View>)
        );
    }
}

let ImageArray = ({ images }) => (images.map((image, index) =>
    <View key={index} style={{ padding: 15, paddingBottom: 0 }}>
        <Image width={width - 30} style={styles.image} source={{ uri: environments.IMAGE_URL + image }} />
    </View>
))

const mapStateToProps = state => {
    return {
        shop_id: state.shopReducer.shop_id
    }
}

export default connect(mapStateToProps)(InfoScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.greyLighten5
    },
    image: {
        resizeMode: 'stretch',
        borderRadius: 5
    }
});