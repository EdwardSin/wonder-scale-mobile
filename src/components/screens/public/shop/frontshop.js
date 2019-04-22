import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import StatusHelper from 'components/helpers/statushelper';
import { EmptyList, LoadingSpinner, WsItemList, WsRefreshControl } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { Animated, Dimensions, Image, Linking, Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { followShop, isFollowShop, isLikeShop, likeShop, unfollowShop, unlikeShop } from 'services/auth-user/follow';
import { getPublicDiscountItemsByShopId, getPublicNewItemsByShopId } from 'services/items';
import { getPromotionsByShopId } from 'services/promotions';
import { getShopWithNewItems } from 'services/shops';

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
    this.getIsFollowShop();
  }


  render() {
    const HEADER_MAX_HEIGHT = 600;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    const TEXT_MAX_HEIGHT = 30;
    const TEXT_MIN_HEIGHT = 0;
    const TEXT_SCROLL_DISTANCE = TEXT_MAX_HEIGHT - TEXT_MIN_HEIGHT;

    const SEARCHBAR_MAX_WIDTH = 110;
    const SEARCHBAR_MIN_WIDTH = 35;
    const SEARCHBAR_SCROLL_DISTANCE = SEARCHBAR_MAX_WIDTH - SEARCHBAR_MIN_WIDTH;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, TEXT_SCROLL_DISTANCE / 2, TEXT_SCROLL_DISTANCE],
      outputRange: [1, .5, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    const searchbarWidth = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
      outputRange: [SEARCHBAR_MAX_WIDTH, SEARCHBAR_MIN_WIDTH],
      extrapolate: 'clamp',
    })

    const backgroundColorTransform = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: 'clamp'
    })
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <ScrollView stickyHeaderIndices={[1]} scrollEventThrottle={16}
            refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
            {this.renderProfileContainer()}
            <Navigator searchbarWidth={searchbarWidth}
              backgroundColorTransform={backgroundColorTransform}
              onPress={this.navigateToSearchItemBar}
              onHomePress={this.navigateToHome}
              onInfoPress={this.navigateToInfo}
              onAllItemsPress={this.navigateToAllItems}
            />
            {this.renderContentContainer()}
          </ScrollView>
        </View>)
    );
  }
  renderProfile = () => {
    return (<View>
      {this.state.shop.phone && this.state.shop.phone.map((tel, i) =>
        <TouchableOpacity style={{ paddingVertical: 15 }} key={i} onPress={() => { Linking.openURL(`telprompt:${tel}`) }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
            <FontAwesome style={{ paddingHorizontal: 10 }} name={'phone'} size={20} />
            <Text style={{ fontSize: 15 }}>{tel}</Text>
          </View>
        </TouchableOpacity>
      )}
      <Divider />
      {
        this.state.shop.website && this.state.shop.website.map((website, i) =>
          <TouchableOpacity style={{ paddingVertical: 15 }} key={i} onPress={() => { Linking.openURL(`${website}`) }}>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <FontAwesome style={{ paddingHorizontal: 10 }} name={'globe'} size={20} />
              { website != '' ? <Text style={{ fontSize: 15 }}>{website}</Text> : <Text>-</Text>}
            </View>
          </TouchableOpacity>
        )
      }
      <Divider />
      {
        this.state.shop.email && this.state.shop.email.map((email, i) =>
          <TouchableOpacity style={{ paddingVertical: 15 }} key={i} onPress={() => { Linking.openURL(`mailto:${email}`) }}>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <FontAwesome style={{ paddingHorizontal: 10 }} name={'envelope'} size={20} />
              <Text style={{ fontSize: 15 }}>{email}</Text>
            </View>
          </TouchableOpacity>
        )
      }
    </View>)
  }
  renderProfileContainer = () => {
    const HEADER_MAX_HEIGHT = height;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const backgroundColorTransform = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: 'clamp'
    })
    let isCurrentlyOpen = this.getOpeningInfo();

    return (
      <View>
        <BackgroundView opacity={imageOpacity} item={this.state.shop} />
        <Animated.View style={{ backgroundColor: backgroundColorTransform }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: Constants.statusBarHeight }}>
            <BackButton onPress={() => { this.props.navigation.goBack(null) }} />
            <ShareButton onPress={this.onSharePress.bind(this)} />
            {this.state.isfollow ? <UnfollowButton onPress={this.unfollowShop} /> : <FollowButton onPress={this.followShop} />}
          </View>
          <View style={{ marginTop: 200, alignItems: 'center' }}>
            <ProfileImage item={this.state.shop} onPress={() => { this.props.navigation.navigate('QRCode') }} />
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.shop.name}</Text>
              <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 5 }}>@{this.state.shop.username}</Text>
              <OpeningInfoTag label={isCurrentlyOpen ? 'Opening' : 'Closed'} isOpen={isCurrentlyOpen} />
            </View>
          </View>

          <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }} >
              {this.state.islike ? <UnlikeButton onPress={this.unlikeShop} /> : <LikeButton onPress={this.likeShop} />}
              <MarkerButton onPress={() => {
                Linking.openURL(`http://www.google.com/maps/place/${this.state.shop.location.coordinates[1]},${this.state.shop.location.coordinates[0]}`);
              }} />
              <InfoButton onPress={() => {
                this.setState({ infoModalVisible: true });
              }} />
              <QrcodeButton onPress={() => { this.props.navigation.navigate('QRCode') }} />
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
  renderContentContainer = () => (
    <View style={{ width: width }}>
      <View style={{ backgroundColor: colors.greyLighten3 }}>
        {this.state.loading && <LoadingSpinner />}
        {false && this.state.promotions && this.state.promotions.map((promotion, index) => (
          <View key={index}>
            <Text>{promotion.title}</Text>
            <TouchableOpacity>
              <Text>Claim</Text>
            </TouchableOpacity>
          </View>)
        )}
        {this.state.new_items.length > 0 && (
          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
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
            <View style={{ paddingTop: 10, paddingBottom: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Header>Discount</Header>
                <MoreButton onPress={this.navigateToDiscountItems} />
              </View>
              <ItemsList items={this.state.discount_items} navigation={this.props.navigation} />
            </View>
          )
        }
      </View>
      {!this.state.new_items.length && !this.state.discount_items.length && <EmptyList message={'Shop is new and updating!'} />}
      <Modal visible={this.state.infoModalVisible} transparent={true} animationType={'fade'}>
        <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ infoModalVisible: false }) }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, .6)', height: '100%' }}>
            <View style={{
              width: width - 60, borderRadius: 5, backgroundColor: colors.white,
              paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 30, marginVertical: (height - 350) / 2
            }}>
              {this.renderProfile()}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
  getShop = () => {
    this.setState({ loading: true });
    getShopWithNewItems(this.state.shop_id, (result) => {
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

  getIsLikeShop = () => {
    this.setState({ loading: true });
    isLikeShop(this.state.shop_id, (result) => {
      this.setState({ islike: result.like });
    }, (err) => { })
  }

  getIsFollowShop = () => {
    this.setState({ loading: true });
    isFollowShop(this.state.shop_id, (result) => {
      this.setState({ isfollow: result.follow });
    }, (err) => { })
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
        this.getIsLikeShop();
        this.getIsFollowShop();
      })
  }
  navigateToSearchItemBar = () => {
    this.props.navigation.navigate('AllItems');
  }
  navigateToHome = () => {
    this.props.navigation.navigate('Home');
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
  
  onSharePress(){
    Share.share({
        message: `${this.state.shop.description}`,
        url: `https://www.wonderscale.com/${this.state.shop.username}?ref=${this.state.shop_id}`,
        title: `Shared Shop: ${this.state.shop.name}`
    })
}    
unfollowShop = () => {
  unfollowShop(this.state.shop._id, (result) => {
    if (!result.follow) {
      this.setState({ isfollow: false })
    }
  }, (err) => {
    this.props.navigation.navigate("Login")
  })
}
followShop = () => {
  followShop(this.state.shop._id, (result) => {
    if (result.follow) {
      this.setState({ isfollow: true })
    }
  }, (err) => {
    this.props.navigation.navigate("Login")
  })
}
unlikeShop = () => {
  unlikeShop(this.state.shop._id, (result) => {
    if (!result.like) {
      this.setState({ islike: false })
    }
  })
}
likeShop = () => {
  likeShop(this.state.shop._id, (result) => {
    if (result.like) {
      this.setState({ islike: true });
    }
  })
}
  // #endregion
  getOpeningInfo = () => {
    let opening_info_type = this.state.shop.opening_info_type;
    let opening_info = this.state.shop.opening_info;
    let today = new Date().getDay();
    return StatusHelper.isCurrentlyOpen(opening_info_type, opening_info, today);
  }
}

const LikeButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5 }}>
    <FontAwesome name={'thumbs-o-up'} size={25} />
  </View>
</TouchableOpacity>)

const UnlikeButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5 }}>
    <FontAwesome name={'thumbs-up'} color={colors.main} size={25} />
  </View>
</TouchableOpacity>)
const MoreButton = ({ onPress }) => (
  <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 20, marginTop: 3 }} onPress={onPress} >
    <View style={{ borderRadius: 15, backgroundColor: 'rgba(255,255,255, 1)', justifyContent: 'center' }}>
      <Text style={{ paddingVertical: 4, paddingHorizontal: 10, textAlign: 'center' }}>More</Text>
    </View>
  </TouchableOpacity>
)
const ShareButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: Constants.statusBarHeight + 5 , height: 25, right: 85, borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center' }}>
    <View>
      <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>Share</Text>
    </View>
  </TouchableOpacity>
)
const FollowButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: Constants.statusBarHeight + 5 , height: 25, right: 10, borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center' }}>
    <View>
      <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>Follow</Text>
    </View>
  </TouchableOpacity>
)

const UnfollowButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: Constants.statusBarHeight + 5, height: 25, right: 10, borderRadius: 15, borderColor: colors.main, backgroundColor: 'rgba(34,34,34,.8)', justifyContent: 'center' }}>
    <View>
      <Text style={{ paddingTop: 4, paddingHorizontal: 10, textAlign: 'center', color: colors.white }}>Following</Text>
    </View>
  </TouchableOpacity>)
const QrcodeButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingHorizontal: 5 }}>
      <MaterialCommunityIcons size={25} name={`qrcode`} />
    </View>
  </TouchableOpacity>
)
const MarkerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingHorizontal: 5 }}>
      <MaterialCommunityIcons name={'map-marker'} size={26} />
    </View>
  </TouchableOpacity>
)
const InfoButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingHorizontal: 5 }}>
      <MaterialCommunityIcons name={'information-outline'} size={26} />
    </View>
  </TouchableOpacity>
)
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons color={'rgba(255,255,255,.5)'} containerStyle={{ position: 'absolute', top: Constants.statusBarHeight + 5, left: 10 }} size={30} name={'ios-arrow-dropleft'} />
  </TouchableOpacity>)

const OpeningInfoTag = ({ label, isOpen }) => (
  <View style={{ alignItems: 'center' }}>
    <View style={{ backgroundColor: isOpen ? colors.greenLighten1 : colors.red, borderRadius: 10, paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 16, color: colors.white }}>{label}</Text>
    </View>
  </View>
)
const BackgroundView = ({ opacity, item }) => {
  return (<Animated.View style={{ opacity}}>
    <View style={{ height: 300, position: 'absolute', top: 0, width: '100%', backgroundColor: colors.greyLighten3 }}>
      {item.banner_image != '' && <Image style={{ width: '100%', height: '100%', }} source={{ uri: environments.IMAGE_URL + item.banner_image }} />}
    </View>
  </Animated.View>
)}
const ProfileImage = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: environments.IMAGE_URL + item.profile_image }} />
  </TouchableOpacity>
)

const NavItem = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingHorizontal: 15, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>{label}</Text>
    </View>
  </TouchableOpacity>
)

const Navigator = ({ searchbarWidth, backgroundColorTransform, onPress, onHomePress, onInfoPress, onAllItemsPress }) => (
  <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: backgroundColorTransform, }}>
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, paddingTop: 20 }}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={{
          width: 110, overflow: 'hidden', flexDirection: 'row', height: 35,
          justifyContent: 'center', alignItems: 'center',
          borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: '#88888822'
        }}>
          <Ionicons name='ios-search' size={18} />
          <Text style={{ width: 80, paddingVertical: 5, textAlign: 'center' }}>Search...</Text>
        </Animated.View>
      </TouchableOpacity>
      <NavItem onPress={onHomePress} label={'Home'} />
      <NavItem onPress={onAllItemsPress} label={'All Items'} />
      <NavItem onPress={onInfoPress} label={'Info'} />
    </View>
  </Animated.ScrollView>)

const ItemsList = ({ items, navigation }) => (
  <ScrollView horizontal
    snapToInterval={width * 3 / 4}
    scrollEventThrottle={1}
    snapToAlignment={'start'}
    decelerationRate={'fast'}
    showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
    <View style={{ flexDirection: 'row', paddingRight: 20 }}>
      {items.map((item, i) => (<WsItemList key={i} style={{ width: width * 3 / 4 }} item={item} navigation={navigation} />))}
    </View>
  </ScrollView>
)
const Header = ({ children }) => (
  <Text style={{ fontSize: 25, paddingHorizontal: 20, fontWeight: 'bold' }}>{children}</Text>
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
    backgroundColor: colors.white
  },
  description: {
    marginTop: 5,
    marginBottom: 5
  }
}); 