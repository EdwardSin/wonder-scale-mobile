import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { addFollowItem, isFollowItem, removeFollowItem } from 'services/auth/follow';
import { getItemWithSellerByItemId } from 'services/items';

const ImageViewer = ({ item }) => (
  <View style={{ height: 300 }}>
    <Swiper
      activeDotColor={colors.main}
      loop={false}
      index={0}>
      {item.item_images && item.item_images.map((image, index) => {
        return (<View key={index} style={{ width: '100%', height: 300 }}>
          <Image style={{ width: '100%', height: 300 }} source={{ uri: environments.IMAGE_URL + image }} />
        </View>)
      })}
    </Swiper>
  </View>
)
const NewTag = () => (
  <View style={{ position: 'absolute', borderRadius: 5, paddingLeft: 5, paddingRight: 5, right: 10, top: 10, backgroundColor: colors.main }}>
    <Text style={{ color: colors.white }}>NEW</Text>
  </View>
)
const BackButton = ({ onPress, style }) => (<TouchableOpacity onPress={onPress}>
  <View style={style}>
    <Ionicons color={'rgba(255,255,255,.5)'} size={30} name={'ios-arrow-dropleft'} />
  </View>
</TouchableOpacity>)


const TopButton = ({ onPress, style }) => (<TouchableOpacity onPress={onPress}>
  <View style={style}>
    <Entypo name="chevron-up" />
    <Text style={{ fontSize: 10, textAlign: 'center', marginTop: -10 }}>Top</Text>
  </View>
</TouchableOpacity>);
const FollowButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingLeft: 10, width: 100, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
    <FontAwesome name="star-o" type="font-awesome" color={colors.black} />
    <Text style={{ fontSize: 10 }}>Save</Text>
  </View>
</TouchableOpacity>)

const UnfollowButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingLeft: 10, width: 100, alignItems: 'center', paddingRight: 20, justifyContent: 'center' }}>
    <FontAwesome name="star" type="font-awesome" color={colors.gold} />
    <Text style={{ fontSize: 10 }}>Save</Text>
  </View>
</TouchableOpacity>)

const EntershopButton = ({ onPress }) => (<TouchableOpacity style={{ backgroundColor: 'transparent' }}>
  <View style={{ paddingLeft: 20, paddingRight: 20, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(128, 0, 0, .9)' }}>
    <Text onPress={onPress} style={{ fontSize: 15, color: colors.white }}>Enter Shop</Text>
  </View>
</TouchableOpacity>)

const ItemContent = ({ item }) => (
  <View style={{ padding: 10, marginBottom: 10, backgroundColor: colors.white }}>
    <Text style={{ fontSize: 15, color: colors.main }}>{item.currency} {item.price}</Text>
    <Text style={{ fontSize: 15 }}>ID: {item.customId}</Text>
    <Text style={{ fontSize: 18 }}>{item.name}</Text>
    <NewTag />
  </View>
)

const ItemDescription = ({ item }) => (
  <View style={{ backgroundColor: colors.white, marginBottom: 60 }}>
    {item.description != undefined && item.description.trim() != '' &&
      (<View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18 }}>Description</Text>
        <Text style={{ fontSize: 15, color: colors.grey }}>{item.description}</Text>
      </View>)}
    {item.description_images && item.description_images.map((description_image, index) => {
      return (
        <View key={index} style={{ width: '100%', height: 300, marginBottom: 10 }}>
          <Image style={{ width: '100%', height: 300 }} source={{ uri: environments.IMAGE_URL + description_image }} />
        </View>
      )
    }
    )}
  </View>
)

const Footer = ({ isfollow, unfollowPress, followPress, enterShopPress }) => (
  <View style={{ width: '100%', flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, height: 60, backgroundColor: 'rgba(255, 255, 255, .75)' }}>
    <EntershopButton onPress={enterShopPress} />
    {isfollow ? <UnfollowButton onPress={unfollowPress} /> :
      <FollowButton onPress={followPress} />}
  </View>
)

export default class ItemdetailScreen extends React.Component {
  scroll;
  constructor(props) {
    super(props);
    this.state = {
      isfollow: false,
      loading: true,
      item: {},
      itemId: ''
    }

  }

  componentDidMount() {
    this.getItem();
  }

  getItem = () => {
    this.setState({ loading: true });
    getItemWithSellerByItemId(this.props.navigation.state.params.itemId, (result) => {
      if (result) {
        this.setState({ item: result });
        //this.isFollowItem();
      }
      this.setState({ loading: false });
    })
  }

  isFollowItem = () => {
    isFollowItem(this.state.itemId, (result) => { this.setState({ isfollow: result['follow'] }); })
  }

  render() {
    
    let { isfollow } = this.state;
    let { item } = this.state;

    return (
      this.state.loading ? <LoadingSpinner /> :
        (
          <View style={styles.container}>
            <BackButton style={styles.backButton} onPress={() => { this.props.navigation.goBack(); }} />
            <ScrollView ref={(c) => { this.scroll = c }}>
              <ImageViewer item={this.state.item} />
              <ItemContent item={this.state.item} />
              <ItemDescription item={this.state.item} />
            </ScrollView>
            <TopButton style={styles.topButton} onPress={() => { this.scroll.scrollTo({ x: 0, y: 0, animated: true }) }} />
            <Footer
              enterShopPress={() => this.enterShop(item.seller._id)}
              isfollow={this.state.isfollow}
              followPress={this.addFollowItem}
              unfollowPress={this.removeFollowItem}
            />
          </View>
        )
    );
  }

  addFollowItem = () => {
    this.setState({ isfollow: true });
    return addFollowItem(this.state.itemId, (result) => {
      this.setState({ isfollow: result['follow'] })
    })
  }
  removeFollowItem = () => {
    this.setState({ isfollow: false });
    return removeFollowItem(this.state.itemId, (result) => {
      this.setState({ isfollow: result['follow'] });
    })
  }
  enterShop = (shopId) => {
    this.props.navigation.navigate("FrontShop", { shopId: shopId });
  }
  viewStyle() {
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey
  },
  backButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + 5,
    left: 10,
    zIndex: 1,
  },
  topButton: {
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
  }
});