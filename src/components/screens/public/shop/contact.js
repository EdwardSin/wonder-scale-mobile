import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getShopWithNewItems } from "services/shops";

const LikeButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5 }}>
    <FontAwesome name={'thumbs-o-up'} size={25}/>
  </View>
</TouchableOpacity>)
const UnlikeButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5 }}>
    <FontAwesome name={'thumbs-up'} color={colors.main} size={25}/>
  </View>
</TouchableOpacity>)
const FollowStarButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5, paddingLeft: 5 }}>
    <FontAwesome name={'star-o'} size={25}/>
  </View>
</TouchableOpacity>)
const UnfollowStarButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ paddingRight: 5, paddingLeft: 5 }}>
    <FontAwesome name={'star'} color={colors.main} size={25}/>
  </View>
</TouchableOpacity>)
const FollowButton = ({onPress}) => (<TouchableOpacity onPress={onPress}>
  <View style={{position:'absolute', top: Constants.statusBarHeight + 5, right:40, height:25, borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: 'rgba(255,255,255,.5)' }}>
    <Text style={{ paddingTop:4, paddingLeft:10, paddingRight:10, textAlign: 'center'}}>Follow</Text>
  </View>
</TouchableOpacity>)
const BackButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
  <View style={{ position:'absolute', top: Constants.statusBarHeight + 5, right:10, width: 25, height:25, borderRadius: 15, borderColor: 'rgba(255,255,255,.5)', backgroundColor: 'rgba(255,255,255,.5)' }}>
    <Text style={{ paddingTop:4, textAlign: 'center'}}>X</Text>
    {/* <FontAwesome name={'times'} size={20} type={'font-awesome'} /> */}
  </View>
</TouchableOpacity>)
const ProfileContainer = ({ item, isfollow, islike, onPress }) => (<View style={{ height:300, backgroundColor: 'rgba(153,0,0,.5)' }}>
  <Image style={styles.image} source={{ uri: 'https://res.cloudinary.com/hdpveefqg/image/upload/' + item.profile_image }} />
  
  <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: Constants.statusBarHeight + 5}}>
    <Text style={{ fontSize: 20 }}>{item.name}</Text>
    <FollowButton onPress={() => {}}/>
    <BackButton onPress={onPress.back}/>
  </View>
  <View style={{width:'100%', paddingLeft:10, paddingRight:10}}>
    <View style={{ flexDirection: 'row', marginTop: 8 }} >
      {islike ? <UnlikeButton onPress={onPress.unlike} /> : <LikeButton onPress={onPress.like} />}
      {isfollow ? <UnfollowStarButton onPress={onPress.unfollow} /> : <FollowStarButton onPress={onPress.follow} />}
      <View style={{ paddingRight: 5, paddingLeft: 5 }}>
        <MaterialCommunityIcons name={'map-marker-outline'} size={26}/>
      </View>
      <View style={{ paddingRight: 5, paddingLeft: 5 }}>
        <MaterialCommunityIcons name={'information-outline'} size={26}/>
      </View>
    </View>
  </View>
</View>)
const ContentContainer = () => (<View></View>)

export default class ShopContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      islike: false,
      isfollow: false,
      shopId: environments.shop_id
    }
  }

  componentDidMount() {
    this.getShop();
  }

  getShop = () => {
    //this.props.navigation.state.params.shopId;
    //'5b781db06e29cb0004f2efc9'
    this.setState({ loading: true });
    getShopWithNewItems(this.state.shopId, (result) => {
      this.setState({ shop: result, loading: false });
    })
  }

  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
        <ScrollView>
          <ProfileContainer item={this.state.shop} islike={this.state.islike} isfollow={this.state.isfollow} onPress={{
            like: () => { this.setState({ islike: true }) },
            unlike: () => { this.setState({ islike: false }) },
            follow: () => { this.setState({ isfollow: true }) },
            unfollow: () => { this.setState({ isfollow: false }) },
            back: () => {this.props.navigation.goBack()}
          }} />
          <ContentContainer />
          </ScrollView>
        </View>)
    );
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
  },
  card: {
    padding: 10,
    backgroundColor: '#f7f7f7'
  },
  image: {
    position:'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    opacity: .3,
  }
});