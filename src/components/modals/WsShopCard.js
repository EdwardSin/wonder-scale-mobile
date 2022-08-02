import { FontAwesome } from '@expo/vector-icons';
import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isLikeShop, likeShop, unlikeShop } from 'services/general/auth/follow';
import environments from '../../environments/environment';

const { width } = Dimensions.get('window');

class WsShopCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isfollow: false,
            islike: false
        }
    }
    componentDidMount() {
        this.isLike();
    }
    render() {
        let { shop } = this.props;
        return (
            <TouchableOpacity  {...this.props} activeOpacity={.8}
                style={{
                    width: 320, height: 225, marginHorizontal: 15, shadowOffset: { height: 1, width: 1 },
                    borderRadius: 5, shadowOpacity: 1, shadowColor: colors.greyLighten2,
                    borderWidth: 1, borderColor: colors.greyLighten2
                }}>
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <Image style={{ flex: 1, width: '100%' }} source={shop.profile_image} />
                    {/* shop.profile_image.indexOf('upload/') > -1 ? environments.IMAGE_URL + shop.profile_image : shop.profile_image */}
                    <Text style={{ alignSelf: 'center', paddingVertical: 5 }}>{shop.name}</Text>
                </View>
                <View style={{ borderBottomColor: '#eee', borderBottomWidth: 1, marginHorizontal: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <LikeTag like={this.state.islike} onLikePress={this.like} onUnlikePress={this.unlike} />
                </View>
            </TouchableOpacity>
        );
    }

    isLike = async () => {
        let result = await isLikeShop(this.props.shop._id);
        this.setState({ islike: result });
    }

    like = async () => {
        try {
            let result = await likeShop(this.props.shop._id);
            if (result) {
                this.setState({ islike: result });
            }
        }
        catch (err) {
            this.props.navigation.navigate('Login');
        }
    }
    unlike = async () => {
        try {
            let result = await unlikeShop(this.props.shop._id);
            if (!result) {
                this.setState({ islike: result });
            }
        }
        catch (err) {
            this.props.navigation.navigate('Login');
        }
    }
}

const LikeTag = ({ like, onLikePress, onUnlikePress }) => (
    <TouchableOpacity onPress={like ? onUnlikePress : onLikePress} style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row' }}>
        <FontAwesome name={'thumbs-o-up'} color={like ? colors.secondary : '#888'} size={20} />
        <Text style={{ color: like ? colors.secondary : '#888', fontSize: 12, marginLeft: 5 }}>888</Text>
    </TouchableOpacity>
)


const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WsShopCard);


const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: colors.greyLighten5,
        marginBottom: 10,
        width: width
    }
});