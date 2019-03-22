import colors from 'assets/variables/colors';
import { LoadingSpinner, WsItem, WsRefreshControl, EmptyList } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { getFollowItems, getFollowShops } from 'services/auth/follow';

let ShopCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{ height: 200, flex: 1 }}
          source={{ uri: environments.IMAGE_URL + item.profile_image }} />
      </View>
      <View style={{
        padding: 10
      }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        {false && item.description && item.description.length > 150 ?
          <Text style={styles.description}>{item.description.slice(0, 150)}...</Text>
          :
          <Text style={styles.description}>{item.description}</Text>
        }
        <Text style={styles.updateAt}>{new Date(item.updateAt).toDateString()}</Text>
      </View>
    </View>
  </TouchableOpacity>)


class FavoriteShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false
    }
  }
  componentDidMount() {
    this.getFollowShops();
  }

  getFollowShops = () => {
    this.setState({ loading: true });
    getFollowShops((result) => {
      this.setState({
        shops: result['result'],
        loading: false,
        refreshing: false
      });
    })
  }
  render() {
    return this.state.loading ? <LoadingSpinner /> : (
      <View style={styles.container}>
        <FlatList data={this.state.shops}
          numColumns={2}
          keyExtractor={(item, index) => item['_id']}
          ListEmptyComponent={<EmptyList message={"No Saved Shop."} />}
          renderItem={({ item }) => (
            <View style={{ width: '50%' }}>
              <ShopCard onPress={() => this.navigateToShop(item['_id'])} item={item} />)
          </View>)}
          refreshControl={<WsRefreshControl refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)} />
          } />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getFollowShops();
    })
  }
  navigateToShop = (shopId) => {
    this.props.navigation.navigate("PublicShop", { shopId: shopId });
  }
}

class FavoriteItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false
    }
  }

  componentDidMount() {
    this.getFollowItems();
  }

  getFollowItems = () => {
    this.setState({ loading: true });
    getFollowItems(result => {
      this.setState({
        items: result['result'],
        loading: false,
        refreshing: false
      });
    })
  }

  render() {
    return this.state.loading ? <LoadingSpinner /> : (
      <View style={styles.container}>
        <FlatList data={this.state.items}
          numColumns={2}
          keyExtractor={(item, index) => item['_id']}
          ListEmptyComponent={<EmptyList message={"No Saved Item."} />}
          renderItem={({ item }) => (<View style={{ width: '50%' }}>
            <WsItem navigation={this.props.navigation} showFollow={true} showSeller={true} item={item}></WsItem>
          </View>)}
          refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} /> } />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getFollowItems();
    })
  }
}

export default createMaterialTopTabNavigator({
  Shop: FavoriteShopScreen,
  Item: FavoriteItemScreen
},
  {
    initialRouteName: 'Shop',
    tabBarOptions: {
      activeTintColor: colors.black,
      pressColor: "gray",
      inactiveTintColor: colors.black,
      style: {
        backgroundColor: '#f7f7f7',
      },
      indicatorStyle: {
        backgroundColor: colors.secondary,
      },
      upperCaseLabel: false
    },
    lazy: true,
    tabBarComponent: MaterialTopTabBarWithStatusBar,
    animationEnabled: true,
    swipeEnabled: true,
  }
);
function MaterialTopTabBarWithStatusBar(props) {
  return (
    <View
      style={{
        backgroundColor: '#f7f7f7',
      }}
    >
      <MaterialTopTabBar {...props} jumpToIndex={() => { }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    marginTop: 5,
    marginBottom: 5
  },
  card: {
    backgroundColor: '#f7f7f7'
  },
  updateAt: {
    color: '#888',

  }
});