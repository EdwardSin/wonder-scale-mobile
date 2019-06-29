import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner, WsItemList, WsRefreshControl } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import OpeningHelper from 'helpers/opening.helper';
import StatusHelper from 'helpers/statushelper';
import _ from 'lodash';
import React from 'react';
import { Animated, Dimensions, Image, Linking, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { followShop, isFollowingShop, isLikeShop, likeShop, unfollowShop, unlikeShop } from 'services/general/auth/follow';
import { getPublicDiscountItemsByShopId, getPublicNewItemsByShopId } from 'services/http/public/items';
import { getPromotionsByShopId } from 'services/http/public/promotions';
import { getShopById } from 'services/http/public/shops';

const { width, height } = Dimensions.get('window');


class FrontShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      new_loading: true,
      discount_loading: true,
      refreshing: false,
      islike: false,
      isfollow: false,
      infoModalVisible: false,
      scrollY: new Animated.Value(0),
      new_items: [],
      discount_items: [],
      shop: {},
      displayOperationHours: false,
      flip: false,
      shop_id: this.props.shop_id
    }
  }
  componentDidMount() {
    this.getShop();
    this.getPublicNewItemsByShopId();
    this.getPublicDiscountItemsByShopId();
    this.getPromotionsByShopId();
    this.getIsLikeShop();
    this.getIsFollowingShop();
  }


  render() {
    let { shop } = this.state;
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <ScrollView stickyHeaderIndices={[1]} scrollEventThrottle={16}
            refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
            {this.renderProfileContainer()}
            <Navigator
              onAboutPress={this.navigateToAbout}
              onReviewPress={this.navigateToReview}
              onPromotionPress={this.navigateToPromotion}
              onAllItemsPress={this.navigateToAllItems}
            />
            {this.renderContentContainer()}

            {this.renderAboutContainer(shop)}
          </ScrollView>
          {this.renderSideContainer()}
          {/* <MessengerButton onPress={() => { }} /> */}
        </View>)
    );
  }
  renderSideContainer = () => {
    let { shop, isfollow, islike } = this.state;

    return (<View style={{ position: 'absolute', right: 0, top: 90, alignItems: 'flex-end' }}>
      {shop.recruitments && shop.recruitments.length > 0 && <TouchableOpacity activeOpacity={.5} style={{
        paddingHorizontal: 15, paddingVertical: 10,
        borderBottomStartRadius: 20,
        borderTopStartRadius: 20, backgroundColor: colors.gold,
        shadowColor: colors.grey, alignItems: 'center',
        shadowOpacity: 1, shadowOffset: { width: 0, height: 2 }, flexDirection: 'row'
      }} onPress={() => { this.props.navigation.navigate('Recruitment') }}>
        <FontAwesome name={'suitcase'} style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 5 }} size={25} />
        <Text style={{ fontSize: 15 }}>{'Hiring'}</Text>
      </TouchableOpacity>}
      <FollowTag follow={isfollow} onFollowPress={this.follow} onUnfollowPress={this.unfollow} />
      <LikeTag like={islike} number_of_like={shop.like} onLikePress={this.like} onUnlikePress={this.unlike} />
    </View>)
  }
  renderProfileContainer = () => {
    const HEADER_MAX_HEIGHT = height;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    const { shop } = this.state;
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 3],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View>
        <BackgroundView opacity={imageOpacity} item={shop} />
        <Animated.View >
          <View style={{ flexDirection: 'row', width, paddingHorizontal: 10, paddingTop: Constants.statusBarHeight }}>
            <BackButton onPress={() => { this.props.navigation.goBack(null) }} />
            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
              <MarkerButton onPress={() => { this.linkToMap(shop) }} />
              <QrcodeButton onPress={() => { this.props.navigation.navigate('QRCode') }} />
              <ShareButton onPress={this.onSharePress.bind(this)} />
            </View>
          </View>
          <View style={{ marginVertical: 20, marginBottom: 40, alignItems: 'center', position: 'relative' }}>
            <ProfileImage item={shop} onPress={() => { this.props.navigation.navigate('QRCode') }} />
            <View style={{ paddingVertical: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white }}>{shop.name}</Text>
              <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 5, color: colors.white }}>@{shop.username}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
  renderContentContainer = () => (
    <View style={{ width }}>
      <View>
        {this.state.loading && <LoadingSpinner />}
        {this.state.new_items.length > 0 && (
          <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: colors.white }}>
            <View style={{ flexDirection: 'row' }}>
              <Header>New</Header>
              <MoreButton onPress={this.navigateToNewItems} />
            </View>
            <ItemsList items={this.state.new_items} navigation={this.props.navigation} />
          </View>)
        }
        {this.state.loading && <LoadingSpinner />}
        {
          this.state.discount_items.length > 0 && (
            <View style={{ paddingTop: 10, marginTop: 10, backgroundColor: colors.white }}>
              <View style={{ flexDirection: 'row' }}>
                <Header>Discount</Header>
                <MoreButton onPress={this.navigateToDiscountItems} />
              </View>
              <ItemsList items={this.state.discount_items} navigation={this.props.navigation} />
            </View>
          )
        }
      </View>
    </View>
  )
  renderAboutContainer = (shop) => {
    let isCurrentlyOpen = this.getOpeningInfo();
    return (<View style={{ marginVertical: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: colors.white }}>
      {
        !!shop && !!shop.opening_info_type && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
          <View style={{ width: 70 }}>
            <Text style={{ paddingRight: 10 }}>Hours:</Text>
          </View>
          <View style={{ flex: 1 }}>
            {shop.opening_info_type != 'selected_hours' && <Text style={{ paddingLeft: 10, flexWrap: 'wrap', flex: 1 }}>
              {OpeningHelper.getOpeningHour(shop)}</Text>}
            {shop.opening_info_type == 'selected_hours' &&
              OpeningHelper.getOpeningHour(shop).map((opening_hour, index) =>
                <Text key={index} style={{ paddingLeft: 10, flexWrap: 'wrap', flex: 1 }} onPress={() => { this.setState({ displayOperationHours: !this.state.displayOperationHours }) }}>
                  ({OpeningHelper.days[new Date().getDay()]}) {opening_hour.opening_hour} - {opening_hour.close_hour}
                </Text>)
            }
            <TouchableOpacity onPress={() => { shop.opening_info_type == 'selected_hours' && this.setState({ displayOperationHours: !this.state.displayOperationHours }) }}>
              <OpeningInfoTag label={isCurrentlyOpen ? 'Opening' : 'Closed'} isOpen={isCurrentlyOpen} />
            </TouchableOpacity>
            {this.state.displayOperationHours && <View style={{ marginTop: 5, paddingTop: 5, borderTopWidth: 1, borderTopColor: colors.greyLighten2 }}>
              {OpeningHelper.getShopOpeningHours(shop).map((openingHour, index) => <View key={index} style={{ flexDirection: 'row' }}>
                <View style={{ width: 100, marginRight: 10 }}>
                  <Text>{openingHour.day}</Text>
                </View>{openingHour.time.map((time, index) => <Text key={index}>{openingHour.selected ? `${time.opening_hour}-${time.close_hour}` : 'Closed'}</Text>)}
              </View>)}
            </View>}
          </View>
        </View>
      }
      {!!shop && !!shop.full_address && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
        <View style={{ width: 70 }}>
          <Text style={{ paddingRight: 10 }}>Address:</Text>
        </View>
        <Text onPress={() => { this.linkToMap(shop) }} style={{ paddingLeft: 10, flexWrap: 'wrap', flex: 1 }}>
          {shop.full_address.address} {shop.full_address.postcode} {shop.full_address.state} {shop.full_address.country}</Text>
      </View>
      }
      {!!shop && !!shop.email && shop.email.length > 0 && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
        <View style={{ width: 70 }}>
          <Text style={{ paddingRight: 10 }}>Email:</Text>
        </View>
        {shop.email.map((email, index) => (<Text onPress={() => { this.linkToEmail(email) }} key={index} style={{ paddingLeft: 10 }}>{email}</Text>))}
      </View>}
      {!!shop && !!shop.phone && shop.phone.length > 0 && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
        <View style={{ width: 70 }}>
          <Text style={{ paddingRight: 10 }}>Tel:</Text>
        </View>
        {shop.phone.map((phone, index) => (<Text onPress={() => { this.linkToTel(phone) }} key={index} style={{ paddingLeft: 10 }}>{phone}</Text>))}
      </View>}
      {!!shop && !!shop.website && shop.website.length > 0 && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
        <View style={{ width: 70 }}>
          <Text style={{ paddingRight: 10 }}>Website:</Text>
        </View>
        {shop.website.map((website, index) => (<Text onPress={() => { this.linkToUrl(website) }} key={index} style={{ paddingLeft: 10 }}>{website}</Text>))}
      </View>}
      {!!shop && !!shop.media && shop.media.length > 0 && <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10 }}>
        <View style={{ width: 70 }}>
          <Text style={{ paddingRight: 10, fontSize: 12 }}>Social Website:</Text>
        </View>
        {shop.media.map((media, index) => {
          return <View key={index}>
            {media.type == 'facebook' && <Text onPress={() => { this.linkToUrl(`https://www.facebook.com/${media.value}`) }} style={{ paddingLeft: 10 }}>Facebook: {media.value}</Text>}
            {media.type == 'instagram' && <Text onPress={() => { this.linkToUrl(`https://www.instagram.com/${media.value}`) }} style={{ paddingLeft: 10 }}>Instagram: {media.value}</Text>}
            {media.type == 'twitter' && <Text onPress={() => { this.linkToUrl(`https://www.twitter.com/${media.value}`) }} style={{ paddingLeft: 10 }}>Twitter: {media.value}</Text>}
            {media.type == 'whatsapp' && <Text onPress={() => { this.linkToUrl(`https://api.whatsapp.com/send?phone=${media.value}`) }} style={{ paddingLeft: 10 }}>Whatsapp: {media.value}</Text>}
            {media.type == 'wechat' && <Text onPress={() => { }} style={{ paddingLeft: 10 }}>Wechat: {media.value}</Text>}
            {media.type == 'weibo' && <Text onPress={() => { }} style={{ paddingLeft: 10 }}>Weibo: {media.value}</Text>}
          </View>
        })}
      </View>}
    </View>)
  }
  getShop = () => {
    this.setState({ loading: true });
    getShopById(this.state.shop_id, (result) => {
      this.setState({ shop: result, loading: false, refreshing: false });
    })
  }
  getPublicNewItemsByShopId = () => {
    this.setState({ loading: true, searchKeyword: '' });
    getPublicNewItemsByShopId(this.state.shop_id, (result) => {
      this.setState({
        new_items: _.slice(result['result'], 0, 4),
        new_loading: false
      });
    })
  }
  getPublicDiscountItemsByShopId = () => {
    this.setState({ loading: true, searchKeyword: '' });
    getPublicDiscountItemsByShopId(this.state.shop_id, (result) => {
      this.setState({
        discount_items: _.slice(result['result'], 0, 4),
        discount_loading: false
      });
    })
  }
  getPromotionsByShopId = () => {
    getPromotionsByShopId(this.state.shop_id, (result) => {
      this.setState({ promotions: result });
    })
  }
  // #region Events
  handleRefresh = () => {
    this.setState({ refreshing: true },
      () => {
        this.getShop();
        this.getPublicNewItemsByShopId();
        this.getPublicDiscountItemsByShopId();
        this.getPromotionsByShopId();
      })
  }
  linkToMap = (shop) => {
    Linking.openURL(`http://www.google.com/maps/place/${shop.location.coordinates[1]},${shop.location.coordinates[0]}`);
  }
  linkToTel = (tel) => {
    Linking.openURL(`telprompt:${tel}`)
  }
  linkToEmail = (email) => {
    Linking.openURL(`mailto:${email}`)
  }
  linkToUrl = (url) => {
    Linking.openURL(`${url}`)
  }
  navigateToPromotion = () => {
    this.props.navigation.navigate('Promotion');
  }
  navigateToAbout = () => {
    this.props.navigation.navigate('About');
  }
  navigateToReview = () => {
    this.props.navigation.navigate('Review');
  }
  navigateToInfo = () => {
    this.props.navigation.navigate('Info');
  }
  navigateToAllItems = () => {
    this.props.navigation.navigate('AllItems');
  }
  navigateToDiscountItems = () => {
    this.props.navigation.navigate('DiscountItems');
  }
  navigateToNewItems = () => {
    this.props.navigation.navigate('NewItems');
  }
  onSharePress() {
    Share.share({
      message: `${this.state.shop.description}`,
      url: `https://www.wonderscale.com/${this.state.shop.username}?ref=${this.state.shop_id}`,
      title: `Shared Shop: ${this.state.shop.name}`
    })
  }
  getIsLikeShop = async () => {
    let result = await isLikeShop(this.state.shop_id);
    this.setState({ islike: result });
  }
  getIsFollowingShop = async () => {
    let result = await isFollowingShop(this.state.shop_id);
    this.setState({ isfollow: result });
  }
  follow = async () => {
    let result = await followShop(this.state.shop_id);
    this.setState({ isfollow: result });
  }
  unfollow = async () => {
    let result = await unfollowShop(this.state.shop_id);
    this.setState({ isfollow: result });
  }
  like = async () => {
    let result = await likeShop(this.state.shop_id);
    if (result) {
      this.setState({ islike: result, shop: { ...this.state.shop, like: this.state.shop.like + 1 } });
    }
  }
  unlike = async () => {
    let result = await unlikeShop(this.state.shop_id);
    if (!result) {
      this.setState({ islike: result, shop: { ...this.state.shop, like: this.state.shop.like - 1 } });
    }
  }
  // #endregion
  getOpeningInfo = () => {
    let opening_info_type = this.state.shop.opening_info_type;
    let opening_info = this.state.shop.opening_info;
    let today = new Date().getDay();
    return StatusHelper.isCurrentlyOpen(opening_info_type, opening_info, today);
  }
}

const MoreButton = ({ onPress }) => (
  <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 15, borderRadius: 15, backgroundColor: '#eee', justifyContent: 'center' }} onPress={onPress} >
    <Text style={{ paddingVertical: 2, paddingHorizontal: 10, textAlign: 'center' }}>More</Text>
  </TouchableOpacity>
)
const ShareButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Entypo name={'share-alternative'} size={33} color={colors.white} />
  </TouchableOpacity>
)
const QrcodeButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 5 }}>
    <MaterialCommunityIcons size={35} color={'#fff'} name={`qrcode`} />
  </TouchableOpacity>
)
const MarkerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 5 }}>
    <MaterialCommunityIcons name={'map-marker'} size={35} color={colors.white} />
  </TouchableOpacity>
)
const FollowTag = ({ follow, onFollowPress, onUnfollowPress }) => (
  <TouchableOpacity onPress={() => { follow ? onUnfollowPress() : onFollowPress() }} style={{ marginVertical: 10, backgroundColor: colors.secondary, paddingVertical: 10, paddingLeft: 15, paddingRight: 5, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
    <Text style={{ color: follow ? colors.gold : colors.white }}>{follow ? 'Following' : 'Follow'}</Text>
  </TouchableOpacity>
)
const LikeTag = ({ like, number_of_like, onLikePress, onUnlikePress }) => (
  <TouchableOpacity onPress={() => { like ? onUnlikePress() : onLikePress() }} style={{ flexDirection: 'row', backgroundColor: colors.secondary, paddingVertical: 10, paddingLeft: 15, paddingRight: 5, borderTopStartRadius: 20, borderBottomStartRadius: 20 }}>
    <FontAwesome name={`thumbs-o-up`} size={18} color={like ? colors.gold : colors.white} style={{ marginRight: 8 }}>
    </FontAwesome>
    <Text style={{ color: like ? colors.gold : colors.white }}>{number_of_like}</Text>
  </TouchableOpacity>
)
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialCommunityIcons color={colors.white} size={26} name={'chevron-left'} />
  </TouchableOpacity>)

const OpeningInfoTag = ({ label, isOpen }) => (
  <View style={{ marginHorizontal: 10, marginVertical: 5, alignItems: 'flex-start' }}>
    <View style={{ backgroundColor: isOpen ? colors.greenLighten1 : colors.red, borderRadius: 10, paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 13, color: colors.white }}>{label}</Text>
    </View>
  </View>
)
const MessengerButton = ({ onPress }) => {
  return (<TouchableOpacity activeOpacity={.7} onPress={onPress} style={{
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    shadowOpacity: 1, shadowOffset: { width: 0, height: 2 },
    backgroundColor: colors.secondary, position: 'absolute', bottom: 20, right: 20
  }}>
    <Ionicons name={'md-chatbubbles'} size={30} color={colors.white} />
  </TouchableOpacity>)
}
const BackgroundView = ({ opacity, item }) => {
  let url = '';
  if (item && item.banner_image) {
    url = item.banner_image.indexOf('upload/') > -1 ? environments.IMAGE_URL + item.banner_image : item.banner_image;
  }
  return (<Animated.View style={{
    opacity, height: 300, position: 'absolute', top: 0, width: '100%',
    backgroundColor: colors.greyLighten2
  }}>
    {url != '' && <Image style={{ width: '100%', height: 300 }} defaultSource={environments.Image.Default_Banner} source={{ uri: url }} />}
  </Animated.View>
  )
}
const ProfileImage = ({ item, onPress }) => {
  let url = '';
  if (item && item.profile_image) {
    url = item.profile_image.indexOf('upload/') > -1 ? environments.IMAGE_URL + item.profile_image : item.profile_image;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      {url != '' && <Image style={{ width: 100, height: 100, borderRadius: 50 }} defaultSource={environments.Image.Default_Shop} source={{ uri: url }} />}
    </TouchableOpacity>
  )
}

const NavItem = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 13 }}>
    <Text style={{ fontSize: 16, textAlign: 'center' }}>{label}</Text>
  </TouchableOpacity>
)

const Navigator = ({ onPromotionPress, onAboutPress, onReviewPress, onAllItemsPress }) => (
  <View style={{
    flexDirection: 'row', flex: 1, justifyContent: 'center',
    borderBottomWidth: 1, borderBottomColor: '#eee',
    backgroundColor: colors.white, alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15,
  }}>
    <NavItem onPress={onAboutPress} label={'About'} />
    <NavItem onPress={onAllItemsPress} label={'All Items'} />
    {/* <NavItem onPress={onPromotionPress} label={'Promotions'} /> */}
    <NavItem onPress={onReviewPress} label={'Reviews'} />
  </View>
)

const ItemsList = ({ items, navigation }) => (
  <ScrollView horizontal
    snapToInterval={width * 3 / 4}
    scrollEventThrottle={1}
    snapToAlignment={'start'}
    decelerationRate={'fast'}
    showsHorizontalScrollIndicator={false} style={{ paddingBottom: 10, paddingTop: 5 }}>
    <View style={{ flexDirection: 'row', paddingRight: 20 }}>
      {items.map((item, i) => (<WsItemList key={i} style={{ width: width * 3 / 4 }} item={item} navigation={navigation} />))}
    </View>
  </ScrollView>
)
const Header = ({ children }) => (
  <Text style={{ fontSize: 16, paddingHorizontal: 30, fontWeight: 'bold' }}>{children}</Text>
)

const mapStateToProps = state => {
  return {
    shop_id: state.shopReducer.shop_id
  }
}

export default connect(mapStateToProps)(FrontShopScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLighten4
  },
  description: {
    marginTop: 5,
    marginBottom: 5
  }
}); 