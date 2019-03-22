import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from 'assets/variables/colors';
import StatusHelper from 'components/helpers/statushelper';
import { EmptyList, LoadingSpinner, ReviewCard, WsItemList, WsRefreshControl } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, Modal } from 'react-native';
import { followShop, isFollowShop, isLikeShop, likeShop, unfollowShop, unlikeShop } from 'services/auth/auth-user';
import { getShopWithNewItems } from 'services/shops';
import { getPromotionsByShopId } from 'services/promotion';

const { width, height } = Dimensions.get('window');

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

const FollowButton = ({ onPress }) => (
  <View style={{ position: 'absolute', top: Constants.statusBarHeight + 10, height: 25, right: 10, borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: 'rgba(255,255,255,.5)', justifyContent: 'center' }}>
    <TouchableOpacity onPress={onPress} >

      <Text style={{ paddingTop: 4, paddingLeft: 10, paddingRight: 10, textAlign: 'center' }}>Follow</Text>

    </TouchableOpacity>
  </View>
)

const UnfollowButton = ({ onPress }) => (
  <View style={{ position: 'absolute', top: Constants.statusBarHeight + 5, height: 25, right: 10, borderRadius: 15, borderColor: colors.main, backgroundColor: 'rgba(34,34,34,.8)', justifyContent: 'center' }}>
    <TouchableOpacity onPress={onPress}>
      <Text style={{ paddingTop: 4, paddingLeft: 10, paddingRight: 10, textAlign: 'center', color: colors.white }}>Following</Text>
    </TouchableOpacity>
  </View>)
const MarkerButton = ({ onPress }) => (
  <View style={{ paddingRight: 5, paddingLeft: 5 }}>
    <MaterialCommunityIcons name={'map-marker'} size={26} />
  </View>
)
const InfoButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingRight: 5, paddingLeft: 5 }}>
      <MaterialCommunityIcons name={'information-outline'} size={26} />
    </View>
  </TouchableOpacity>
)
const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons color={colors.black} containerStyle={{ position: 'absolute', top: Constants.statusBarHeight + 5, left: 10 }} size={30} name={'ios-arrow-dropleft'} />
  </TouchableOpacity>)

const OpeningInfoTag = ({ label, isOpen }) => (
  <View style={{ alignItems: 'center' }}>
    <View style={{ backgroundColor: isOpen ? colors.greenLighten1 : colors.red, borderRadius: 10, paddingLeft: 8, paddingRight: 8 }}>
      <Text style={{ fontSize: 16, color: colors.white }}>{label}</Text>
    </View>
  </View>
)
const BackgroundView = ({ opacity, item }) => (

  <Animated.View style={{ opacity: opacity }}>
    {
      item.information_images.length ?
        <View style={{ height: 250, position: 'absolute', top: 0, width: '100%' }}>
          <Image style={{ width: '100%', height: '100%' }} source={{ uri: environments.IMAGE_URL + item.information_images[0] }} />
        </View> : <View></View>}
  </Animated.View>
)
const ProfileImage = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: environments.IMAGE_URL + item.profile_image }} />
  </TouchableOpacity>
)

const NavItem = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>{label}</Text>
    </View>
  </TouchableOpacity>
)

const Navigator = ({ searchbarWidth, backgroundColorTransform, onPress, onHomePress, onInfoPress, onAllItemsPress, onReviewsPress }) => (
  <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: backgroundColorTransform, }}>
    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center',  alignItems: 'center', padding: 10, paddingTop: 20 }}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={{ width: 110, overflow: 'hidden', flexDirection: 'row', height: 35, 
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: '#88888822' }}>
          <Ionicons name='ios-search' size={18} />
          <Text style={{ width: 80, paddingTop: 5, paddingBottom: 5, textAlign: 'center' }}>Search...</Text>
        </Animated.View>
      </TouchableOpacity>
      <NavItem onPress={onHomePress} label={'Home'} />
      <NavItem onPress={onAllItemsPress} label={'All Items'} />
      <NavItem onPress={onInfoPress} label={'Info'} />
      <NavItem onPress={onReviewsPress} label={'Reviews'} />
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
const Header = ({ label }) => (
  <Text style={{ fontSize: 25, paddingLeft: 20, paddingRight: 20, fontWeight: 'bold' }}>{label}</Text>
)

export default class FrontShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      islike: false,
      isfollow: false,
      infoModalVisible: false,
      scrollY: new Animated.Value(0),
      shopId: environments.shop_id,//this.props.navigation.state.params.shopId,
      //shopId: this.props.navigation.state.params.shopId,
      newItems: [],
      discountItems: [],
      shop: {},
      flip: false
    }
  }

  componentDidMount() {
    this.getShop();
    this.getPromotionsByShopId();
    // this.getIsLikeShop();
    // this.getIsFollowShop();
  }

  getShop = () => {
    this.setState({ loading: true });
    getShopWithNewItems(this.state.shopId, (result) => {
      this.setState({ shop: result, newItems: result.new_items, loading: false, refreshing: false });
    })
  }

  getIsLikeShop = () => {
    this.setState({ loading: true });
    isLikeShop(this.state.shopId, (result) => {
      this.setState({ islike: result.like });
    })
  }

  getIsFollowShop = () => {
    this.setState({ loading: true });
    isFollowShop(this.state.shopId, (result) => {
      this.setState({ isfollow: result.follow });
    })
  }
  getPromotionsByShopId = () => {
    getPromotionsByShopId(this.state.shopId, (result) => {
      this.setState({ promotions: result });
    })
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
              onReviewsPress={this.navigateToReviews}
            />
            {this.renderContentContainer()}
          </ScrollView>
        </View>)
    );
  }
  renderProfile = () => {
    return (<View>
      {this.state.shop.phone && this.state.shop.phone.map((tel, i) =>
        <TouchableOpacity key={i} onPress={() => { Linking.openURL(`telprompt:${tel}`) }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
            <FontAwesome style={{ paddingHorizontal: 10 }} name={'phone'} size={20} />
            <Text style={{ fontSize: 15 }}>{tel}</Text>
          </View>
        </TouchableOpacity>
      )}
      {
        this.state.shop.website && this.state.shop.website.map((website, i) =>
          <TouchableOpacity key={i} onPress={() => { Linking.openURL(`${website}`) }}>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <FontAwesome style={{ paddingHorizontal: 10 }} name={'globe'} size={20} />
              <Text style={{ fontSize: 15 }}>{website}</Text>
            </View>
          </TouchableOpacity>
        )
      }
      {
        this.state.shop.email && this.state.shop.email.map((email, i) =>
          <TouchableOpacity key={i} onPress={() => { Linking.openURL(`mailto:${email}`) }}>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <FontAwesome style={{ paddingHorizontal: 10 }} name={'envelope'} size={20} />
              <Text style={{ fontSize: 15 }}>{email}</Text>
            </View>
          </TouchableOpacity>
        )
      }
      {
        this.state.shop.opening_info
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
          <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: Constants.statusBarHeight }}>
            <BackButton onPress={() => { this.props.navigation.goBack() }} />
            {this.state.isfollow ? <UnfollowButton onPress={() => {
              unfollowShop(this.state.shop._id, (result) => {
                if (!result.follow) {
                  this.setState({ isfollow: false })
                }
              }, (err) => {
                this.props.navigation.navigate("Login")
              })
            }} /> : <FollowButton onPress={() => {
              followShop(this.state.shop._id, (result) => {
                if (result.follow) {
                  this.setState({ isfollow: true })
                }
              }, (err) => {
                this.props.navigation.navigate("Login")
              })
            }} />}
          </View>
          <View style={{ marginTop: 175, alignItems: 'center' }}>
            <ProfileImage item={this.state.shop} onPress={() => { this.props.navigation.navigate('QRCode') }} />
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.shop.name}</Text>
              <Text style={{ fontSize: 15, textAlign: 'center', marginBottom: 5 }}>@{this.state.shop.username}</Text>
              <OpeningInfoTag label={isCurrentlyOpen ? 'Opening' : 'Closed'} isOpen={isCurrentlyOpen} />
            </View>
          </View>

          <View style={{ width: '100%', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }} >
              {this.state.islike ? <UnlikeButton onPress={() => {
                unlikeShop(this.state.shop._id, (result) => {
                  if (!result.like) {
                    this.setState({ islike: false })
                  }
                })
              }} /> : <LikeButton onPress={() => {
                likeShop(this.state.shop._id, (result) => {
                  if (result.like) {
                    this.setState({ islike: true });
                  }
                })
              }} />}
              <MarkerButton onPress={() => { }} />
              <InfoButton onPress={() => {
                this.setState({ infoModalVisible: true });
              }} />
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
  renderContentContainer = () => (
    <View style={{ width: width }}>
      <View style={{ backgroundColor: colors.greyLighten4 }}>
        {this.state.loading && <LoadingSpinner />}
        { this.state.promotions && this.state.promotions.map((promotion, index) => (
          <View key={index}>
              <Text>{promotion.title}</Text>
              <TouchableOpacity>
                <Text>Claim</Text>
                </TouchableOpacity>
            </View>
          )
        )}
        {this.state.newItems.length > 0 && (
          <View style={{ paddingTop: 20, paddingBottom: 10 }}>
            <Header label={'New'} />
            <ItemsList items={this.state.newItems} navigation={this.props.navigation} />
          </View>)
        }
        {this.state.loading && <LoadingSpinner />}
        {
          this.state.newItems.length > 0 && (
            <View style={{ paddingTop: 10, paddingBottom: 20 }}>
              <Header label={'Discount'} />
              <ItemsList items={this.state.newItems} navigation={this.props.navigation} />
            </View>
          )
        }
      </View>
      {
        this.state.shop.reviews && this.state.shop.reviews.length > 0 &&
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Header label={'Review'} />
            {/* <View style={{ flexDirection: 'row' }}>
              {_.times(this.state.shop.reviews[0].reviews[0].rating, (i) => (<AntDesign key={i} style={{ width: 30 }} size={30} name={'star'} color={colors.main} />))}
              {_.times(5 - this.state.shop.reviews[0].reviews[0].rating, (i) => (<AntDesign key={i} style={{ width: 30 }} size={30} name={'staro'} color={colors.secondary} />))}
            </View> */}
          </View>
          <View>
            {
              this.state.shop.reviews.map((review, i) => <ReviewCard item={review} key={i}
                onPress={() => { this.setState({ flip: !this.state.flip }) }}
                onReportPress={() => { console.log('Open Modal'); }}
                flip={this.state.flip} />)}
          </View>
        </View>
      }
      {!this.state.newItems.length && <EmptyList message={'Shop is new and updating!'} />}

      <Modal visible={this.state.infoModalVisible} transparent={true} animationType={'fade'}>
        <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ infoModalVisible: false }) }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, .6)', height: '100%' }}>
            <View style={{ width: width - 60, borderRadius: 10, backgroundColor: colors.white,
              padding: 20, marginHorizontal: 30, marginVertical: (height - 350) / 2
            }}>
              {this.renderProfile()}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
  handleRefresh = () => {
    this.setState({ refreshing: true },
      () => { this.getShop(); })
  }
  getOpeningInfo = () => {
    let opening_info_type = this.state.shop.opening_info_type;
    let opening_info = this.state.shop.opening_info;
    let today = new Date().getDay();
    return StatusHelper.isCurrentlyOpen(opening_info_type, opening_info, today);
  }
  navigateToSearchItemBar = () => {
    this.props.navigation.navigate('AllItems');
  }
  navigateToHome = () => {
    this.props.navigation.navigate('Home', { shopId: this.state.shopId });
  }
  navigateToInfo = () => {
    this.props.navigation.navigate('Info', { shopId: this.state.shopId });
  }
  navigateToAllItems = () => {
    this.props.navigation.navigate('AllItems');
  }
  navigateToReviews = () => {
    this.props.navigation.navigate('PublicShopReview', { shopId: this.state.shopId });
  }
}
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