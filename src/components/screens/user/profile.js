import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import React from 'react';
import { Constants } from 'expo';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import { isSignedIn, onSignOut } from 'services/auth';
import { getBlackListWithUser } from 'services/auth/auth-user';
import { ActivityIndicator } from 'react-native-paper';

let ProfileContainer = ({ user, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.profileContainer}>
      <Image style={styles.profileImage} source={{ uri: user.profile_image }} />
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>{user.first_name}{'\n'}
          <Text style={{ fontSize: 15 }}>View and edit profile</Text>
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

let SettingButton = ({ text }) => (
  <TouchableOpacity>
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{text}</Text>
    </View>
  </TouchableOpacity>
)

let SettingContainer = ({ onLogoutPress, list }) => (
  list.map((item, i) => (<ListItem key={i}
    title={item.name}
    rightIcon={<Ionicons name={item.icon.name} color={colors.greyDarken2} size={35} />}
    containerStyle={{ paddingHorizontal: 30, paddingTop: 15, paddingBottom: 15, borderBottomColor: colors.greyLighten2 }}
    // wrapperStyle={{ marginLeft: 0 }}
    titleStyle={{ marginLeft: 0 }}
    onPress={item.onPress}></ListItem>))
)

let UserProfileContainer = ({ user, list, onProfilePressed, onLogoutPress }) => (<View style={styles.container}>
  <View>
    <ProfileContainer user={user} onPress={onProfilePressed} />
    <ScrollView style={{ height: '100%' }}>
      <SettingContainer list={list} onLogoutPress={onLogoutPress} />
    </ScrollView>
  </View>
</View>
)


export default class ProfileScreen extends React.Component {
  list = [{ name: 'Vouchers', icon: { name: 'ios-pricetags'}, onPress: this.onVouchersPressed.bind(this) },
          { name: 'Favorites', icon: { name: 'ios-star'}, onPress: this.onFavoritesPressed.bind(this) },
          { name: 'Settings', icon: { name: 'ios-settings'}, onPress: this.onSettingsPressed.bind(this) }];
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      shops: [],
      setting: 'shop'
    };

  }
  componentDidMount() {
    this.getUser();
  }
  getUser = () => {
    this.setState({ loading: true });
    getBlackListWithUser((result) => {
      this.setState({ user: result, loading: false })
    }, (err) => {
      onSignOut().then(result => {
        this.props.navigation.navigate('Login');
      });      
    })
  };
  render() {
    return this.state.loading ? (<LoadingSpinner />) :
      (
        <UserProfileContainer user={this.state.user} list={this.list} onProfilePressed={this.onProfilePressed} onLogoutPress={this.onLogoutPress} />
      );
  }

  onSettingsPressed(){
    this.props.navigation.navigate('Settings');
  }
  onVouchersPressed(){
    this.props.navigation.navigate('Vouchers');
  }
  onFavoritesPressed(){
    this.props.navigation.navigate('Favorites');
  }
  
  onProfilePressed = () => {
    this.props.navigation.navigate('EditProfile');
  }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        seed: (this.state.seed || 0) + 1
      },
      () => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 2000);
      }
    );
  };

  onPressAddShop = () => {
    this.props.navigation.navigate('CreateShop');
  };
  onLogoutPress = () => {

  }
  navigateToShop = (shopId) => {
    this.props.navigation.navigate("ShopSetting", { shopId: shopId });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    flexDirection: 'row',
    paddingTop: 50 + Constants.statusBarHeight,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 30
  },
  plusIcon: {
    position: 'absolute',
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: 25,
    width: 50,
    height: 50,
    bottom: 20,
    right: 20
  }
});
