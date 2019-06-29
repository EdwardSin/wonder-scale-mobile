import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ShopAction from 'actions/shop-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import { EmptyList, LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import * as ImageHelper from 'helpers/image.helper';
import _ from 'lodash';
import React from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { follow, isFollowing, unfollow } from 'services/http/auth-user/follow';
import { getItemWithSellerByItemId } from 'services/http/public/items';
const currency = new Currency();

class ItemdetailScreen extends React.Component {
  scroll;
  constructor(props) {
    super(props);
    this.state = {
      isfollow: false,
      islike: false,
      loading: true,
      item: {},
      itemId: this.props.navigation.state.params.itemId
    }
  }
  componentDidMount() {
    this.getItem();
  }
  render() {
    let { loading, isfollow, islike, item } = this.state;

    return (
      loading ? <LoadingSpinner /> :
        (
          <View style={styles.container}>
            <BackButton onPress={() => { this.props.navigation.goBack(); }} />
            <ScrollView ref={(c) => { this.scroll = c }}>
              <ImageViewer item={item} />
              <ItemContent item={item} />
              <ItemDescription item={item} />
            </ScrollView>
            <TopButton onPress={() => { this.scroll.scrollTo({ x: 0, y: 0, animated: true }) }} />
            <Footer enterShopPress={() => this.enterShop(item.shop._id)}
              islike={islike}
              likePress={this.likeItem}
              unlikePress={this.unlikeItem}
              onSharePress={this.onSharePress}
              isfollow={isfollow} followPress={this.follow} unfollowPress={this.unfollow} />
          </View>
        )
    );
  }
  getItem = () => {
    this.setState({ loading: true });
    getItemWithSellerByItemId(this.state.itemId, (result) => {
      if (result) {
        this.setState({ item: result });
      }
      this.setState({ loading: false });
    })
  }
  isFollowing = () => {
    isFollowing({ id: this.state.itemId, type: 'items' }, (result) => {
      this.setState({ isfollow: result['follow'] });
    })
  }
  isLikeItem = () => {

  }
  likeItem = () => {
    this.setState({ islike: true });
  }
  unlikeItem = () => {
    this.setState({ islike: false });
  }
  follow = () => {
    this.setState({ isfollow: true });
    return follow({ id: this.state.itemId, type: 'items' }, (result) => {
      this.setState({ isfollow: result['follow'] })
    }, (err) => {
      this.props.onToast(err);
      this.setState({ isfollow: false });
    })
  }
  unfollow = () => {
    this.setState({ isfollow: false });
    return unfollow({ id: this.state.itemId, type: 'items' }, (result) => {
      this.setState({ isfollow: result['follow'] });
    }, (err) => {
      this.props.onToast(err);
      this.setState({ isfollow: true });
    })
  }
  enterShop = (shopId) => {
    this.props.onSelectedShopId(shopId);
    this.props.navigation.navigate("FrontShop");
  }
  onSharePress() {
    Share.share({
      message: `${this.state.shop.description}`,
      url: `https://www.wonderscale.com/items/${this.state.item_id}`,
      title: `Shared Item: ${this.state.item.name}`
    })
  }
}
const ImageViewer = ({ item }) => (
  <View style={{ height: 300 }}>
    <Swiper
      activeDotColor={colors.main}
      loop={false}
      index={0}>
      {item.profile_images && item.profile_images.length > 0 ? item.profile_images.map((image, index) => {
        return (<View key={index} style={{ width: '100%', height: 300 }}>
          <Image style={{ width: '100%', height: 300 }} source={{ uri: ImageHelper.getProfileImage(item.profile_images, index) }} />
        </View>)
      }) :
        <View style={{ width: '100%', height: 300 }}>
          <Image style={{ width: '100%', height: 300 }} source={{ uri: environments.IMAGE_URL + 'upload/images/img_not_available.png' }} />
        </View>
      }
    </Swiper>
  </View>
)
const NewTag = () => (
  <View style={styles.newTagContainer}>
    <Text style={{ color: colors.white }}>NEW</Text>
  </View>
)
const BackButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress} style={{ zIndex: 1 }}>
  <View style={{ position: 'absolute', top: Constants.statusBarHeight + 5, left: 10 }}>
    <MaterialCommunityIcons color={colors.white} size={26} name={'chevron-left'} />
  </View>
</TouchableOpacity>)

const TopButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress}>
  <View style={styles.topButtonContainer}>
    <Entypo name="chevron-up" size={20} style={{ justifyContent: 'center', textAlign: 'center' }} />
    <Text style={{ fontSize: 10, textAlign: 'center', marginTop: -5 }}>Top</Text>
  </View>
</TouchableOpacity>);
const FollowButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="star-o" size={25} color={colors.white} />
    <Text style={{ fontSize: 10, color: colors.white }}>Save</Text>
  </View>
</TouchableOpacity>)

const UnfollowButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="star" size={25} color={colors.gold} />
    <Text style={{ fontSize: 10, color: colors.gold }}>Save</Text>
  </View>
</TouchableOpacity>)
const UnlikeButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="thumbs-up" size={25} color={colors.blue} />
    <Text style={{ fontSize: 10, color: colors.blue }}>Like</Text>
  </View>
</TouchableOpacity>)
const LikeButton = ({ onPress }) => (<TouchableOpacity activeOpacity={.7} onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="thumbs-up" size={25} color={colors.white} />
    <Text style={{ fontSize: 10, color: colors.white }}>Like</Text>
  </View>
</TouchableOpacity>)

const ShareButton = ({ onPress }) => (
  <TouchableOpacity activeOpacity={.7} onPress={onPress}>
    <View style={styles.followButtonContainer}>
      <Entypo name={'share-alternative'} size={25} color={colors.white} />
      <Text style={{ fontSize: 10, color: colors.white }}>Share</Text>
    </View>
  </TouchableOpacity>
)
const EntershopButton = ({ onPress }) => (
  <TouchableOpacity activeOpacity={.7} style={{ flex: 1 }} onPress={onPress}>
    <View style={{
      paddingHorizontal: 20, flex: 1, justifyContent: 'center', alignItems: 'center',
      backgroundColor: colors.secondary, flexDirection: 'row'
    }}>
      <Ionicons name={`ios-home`} size={25} color={colors.white} />
      <Text style={{ fontSize: 15, color: colors.white, marginHorizontal: 10 }}>Enter Shop</Text>
    </View>
  </TouchableOpacity>)

const ItemContent = ({ item }) => (
  <View style={{ padding: 10, marginBottom: 10, backgroundColor: colors.white, paddingHorizontal: 20 }}>
    <View style={{ paddingVertical: 5 }}>
      <Text style={{ fontSize: 25, textTransform: 'capitalize' }}>{item.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ alignSelf: 'center', fontSize: 11 }}>({item.ref_id})</Text>
        <NewTag />
      </View>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 2 }}>
      {_.times(2, (i) => (<AntDesign key={i} style={{ width: 20 }} size={20} name={'star'} color={colors.gold} />))}
      {_.times(5 - 2, (i) => (<AntDesign key={i} style={{ width: 20 }} size={20} name={'staro'} color={colors.secondary} />))}
    </View>

    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      <Text>Price: </Text>
      <View style={{ paddingHorizontal: 10 }}>
        {item.is_offer && <Text style={{ color: colors.secondary, textDecorationLine: 'line-through' }}>{currency.currencySymbols[item.currency]} {item.price.toFixed(2)}</Text>}
        <Text style={{ color: item.is_offer ? 'red' : colors.secondary }}>{currency.currencySymbols[item.currency]} {item.priceAfterDiscount.toFixed(2)}</Text>
      </View>
    </View>
  </View>)

const ItemDescription = ({ item }) => (
  <View style={{ backgroundColor: colors.white, marginBottom: 60, height: '100%' }}>
    {item.description != '' ?
      (<View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18 }}>Description</Text>
        <Text style={{ fontSize: 15, color: colors.grey }}>{item.description}</Text>
      </View>) : <EmptyList message={'No description'} />
    }
    {item.description_images && item.description_images.map((description_image, index) => (
      <View key={index} style={{ width: '100%', height: 300, marginBottom: 10 }}>
        <Image style={{ width: '100%', height: 300 }} source={{ uri: ImageHelper.getProfileImage(item.description_images, index) }} />
      </View>
    ))}
  </View>)

const Footer = ({ islike, isfollow, unlikePress, likePress, onSharePress, unfollowPress, followPress, enterShopPress }) => (
  <View style={styles.footerContaier}>
    <EntershopButton onPress={enterShopPress} />
    <ShareButton onPress={onSharePress} />
    {islike ? <UnlikeButton onPress={unlikePress} /> : <LikeButton onPress={likePress} />}
    {isfollow ? <UnfollowButton onPress={unfollowPress} /> : <FollowButton onPress={followPress} />}
  </View>
)

const mapStateToProps = state => {
  return {
    message: state.toastReducer.message
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction, ...ShopAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemdetailScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey
  },
  footerContaier: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, .75)'
  },
  followButtonContainer: {
    backgroundColor: colors.secondary, height: '100%',
    padding: 10, width: 75, alignItems: 'center', justifyContent: 'center'
  },
  topButtonContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    padding: 5,
    paddingTop: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255, .5)'
  },
  newTagContainer: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: colors.main
  }
});