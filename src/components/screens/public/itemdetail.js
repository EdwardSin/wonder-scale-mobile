import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { followItem, isFollowItem, unfollowItem } from 'services/auth-user/follow';
import { getItemWithSellerByItemId } from 'services/items';

class ItemdetailScreen extends React.Component {
  scroll;
  constructor(props) {
    super(props);
    this.state = {
      isfollow: false,
      loading: true,
      item: {},
      itemId: this.props.navigation.state.params.itemId
    }
  }
  componentDidMount() {
    this.getItem();
  }
  render() {
    let { loading, isfollow, item } = this.state;

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
            <Footer enterShopPress={() => this.enterShop(item.seller._id)} isfollow={isfollow} followPress={this.addFollowItem} unfollowPress={this.removeFollowItem} />
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

  isFollowItem = () => {
    isFollowItem(this.state.itemId, (result) => { 
      this.setState({ isfollow: result['follow'] }); 
    })
  }
  addFollowItem = () => {
    this.setState({ isfollow: true });
    return followItem(this.state.itemId, (result) => {
      this.setState({ isfollow: result['follow'] })
    }, (err) => {
      this.props.onToast(err);
      this.setState({ isfollow: false });
    })
  }
  removeFollowItem = () => {
    this.setState({ isfollow: false });
    return unfollowItem(this.state.itemId, (result) => {
      this.setState({ isfollow: result['follow'] });
    }, (err) => {
      this.props.onToast(err);
      this.setState({ isfollow: true });
    })
  }
  enterShop = (shopId) => {
    this.props.navigation.navigate("FrontShop", { shopId });
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
          <Image style={{ width: '100%', height: 300 }} source={{ uri: environments.IMAGE_URL + image }} />
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
const BackButton = ({ onPress }) => (<TouchableOpacity onPress={onPress} style={{ zIndex: 1 }}>
  <View style={{ position: 'absolute', top: Constants.statusBarHeight + 5, left: 10 }}>
    <Ionicons color={'rgba(255,255,255,.5)'} size={30} name={'ios-arrow-dropleft'} />
  </View>
</TouchableOpacity>)

const TopButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={styles.topButtonContainer}>
    <Entypo name="chevron-up" size={20} style={{ justifyContent: 'center', textAlign: 'center' }} />
    <Text style={{ fontSize: 10, textAlign: 'center', marginTop: -5 }}>Top</Text>
  </View>
</TouchableOpacity>);
const FollowButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="star-o" size={30} color={colors.white} />
    <Text style={{ fontSize: 10, color: colors.white }}>Save</Text>
  </View>
</TouchableOpacity>)

const UnfollowButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={styles.followButtonContainer}>
    <FontAwesome name="star" size={30} color={colors.gold} />
    <Text style={{ fontSize: 10, color: colors.gold }}>Save</Text>
  </View>
</TouchableOpacity>)

const EntershopButton = ({ onPress }) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
    <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary }}>
      <Text style={{ fontSize: 15, color: colors.white }}>Enter Shop</Text>
    </View>
  </TouchableOpacity>)

const ItemContent = ({ item }) => (
  <View style={{ padding: 10, marginBottom: 10, backgroundColor: colors.white }}>
    {/* <Text style={{ fontSize: 15, color: colors.main }}>{item.currency} {item.price}</Text> */}
    <Text style={{ fontSize: 15, paddingVertical: 5, paddingHorizontal: 10 }}>ID: {item.ref_id}</Text>
    <Text style={{ fontSize: 20, paddingVertical: 5, paddingHorizontal: 10 }}>{item.name}</Text>
    <NewTag />
  </View>
)

const ItemDescription = ({ item }) => (
  <View style={{ backgroundColor: colors.white, marginBottom: 60, height: '100%' }}>
    {item.description != '' ? 
      (<View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18 }}>Description</Text>
        <Text style={{ fontSize: 15, color: colors.grey }}>{item.description}</Text>
      </View>) : <EmptyList message={'No description'}/>
    }
    {item.description_images && item.description_images.map((description_image, index) => (
        <View key={index} style={{ width: '100%', height: 300, marginBottom: 10 }}>
          <Image style={{ width: '100%', height: 300 }} source={{ uri: environments.IMAGE_URL + description_image }} />
        </View>
      ))}
  </View>
)

const Footer = ({ isfollow, unfollowPress, followPress, enterShopPress }) => (
  <View style={styles.footerContaier}>
    <EntershopButton onPress={enterShopPress} />
    {isfollow ? <UnfollowButton onPress={unfollowPress} /> : <FollowButton onPress={followPress} />}
  </View>
)

const mapStateToProps = state => {
  return {
      message: state.toastReducer.message
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction }, dispatch);
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
    backgroundColor: colors.secondary, height: '100%', padding: 10, width: 100, alignItems: 'center', justifyContent: 'center'
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
    position: 'absolute', 
    height: 50, 
    width: 50, 
    borderRadius: 25, 
    paddingHorizontal: 5, 
    right: 10, 
    top: -10, 
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center'
  }
});