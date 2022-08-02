import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import { Constants } from 'expo';
import React from 'react';
import { AsyncStorage, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthUser from 'services/http/public/auth';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [{ name: 'Vouchers', icon: { name: 'ios-pricetags' }, onPress: this.onVouchersPressed },
      { name: 'Favorites', icon: { name: 'ios-star' }, onPress: this.onFavoritesPressed },
      { name: 'Settings', icon: { name: 'ios-settings' }, onPress: this.onSettingsPressed }]
    };
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    return this.state.loading ? (<LoadingSpinner />) : (
      <UserProfileContainer user={this.props.user} list={this.state.list} onProfilePressed={this.onProfilePressed} />
    );
  }
  // #region Events
  onSettingsPressed = () => {
    this.props.navigation.navigate('Settings');
  }
  onVouchersPressed = () => {
    this.props.navigation.navigate('Vouchers');
  }
  onFavoritesPressed = () => {
    this.props.navigation.navigate('Favorites');
  }
  onProfilePressed = () => {
    this.props.navigation.navigate('EditProfile');
  }
  // #endregion
  getUser = () => {
    let { user } = this.props;
    if (user) {
      this.setState({ loading: false });
    }
    else {
      AsyncStorage.removeItem(AuthUser.WS_Token);
      this.props.navigation.navigate("Login");
    }
  };
}

const ProfileContainer = ({ user, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={.7} onPress={onPress}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} defaultSource={require('' + '../../../../assets/upload/profile.png')} source={require('' + 'assets/immutable/profile.png')} />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, textAlign: 'center' }}>{user.first_name}{'\n'}
            <Text style={{ fontSize: 15 }}>View and edit profile</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const SettingContainer = ({ list }) => (
  list.map((item, i) => (<ListItem key={i}
    title={item.name}
    rightIcon={<Ionicons name={item.icon.name} color={colors.greyDarken2} size={35} />}
    containerStyle={{ paddingHorizontal: 30, paddingVertical: 15, borderBottomColor: colors.greyLighten2 }}
    titleStyle={{ marginLeft: 0 }}
    onPress={item.onPress}></ListItem>))
)

const UserProfileContainer = ({ user, list, onProfilePressed }) => (<View style={styles.container}>
  <ProfileContainer user={user} onPress={onProfilePressed} />
  <ScrollView style={{ height: '100%' }}>
    <SettingContainer list={list} />
  </ScrollView>
</View>
)

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    flexDirection: 'row',
    paddingTop: 50 + Constants.statusBarHeight,
    paddingBottom: 30,
    paddingHorizontal: 40
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
