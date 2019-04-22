
import * as MapAction from 'actions/map-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import OrderHelper from 'components/helpers/orderhelper';
import SearchHelper from 'components/helpers/searchhelper';
import { EmptyList, FilterController, LoadingSpinner, MapIcon, WsCard, WsItem, WsRefreshControl } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNearsShopByPoint } from 'services/shops';
const { height, width } = Dimensions.get('window');

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      displayItems: [],
      loading: false,
      refreshing: false,
      displayView: 'block',
      text: '',
      shops: []
    };
    
  }
  componentDidMount() {
    this.getCurrentPosition();
    //this.getUser();
  }
  // getUser = () => {
  //   this.setState({ loading: true });
  //   getBlackListWithUser((result) => {
  //     this.props.updateUser(result);
  //     this.setState({ user: result, loading: false });
  //   }, (err) => {
  //     this.setState({ loading: false });
  //     // onSignOut().then(result => {
  //     //   this.props.navigation.navigate('Login');
  //     // });
  //   })
  // };
  renderShop = ({ item }) => (
    <View style={{ padding: 3, width: '50%' }}>
      <WsCard onPress={() => {this.navigateToShop(item._id)}} item={item} >{item.name}</WsCard>
    </View>
  );
  renderItem = ({ item }) => (
    <View style={{ padding: 3, width: '50%' }}>
      <WsItem navigation={this.props.navigation} showFollow={true} follow={item.follow} showSeller={true} item={item} />
    </View>
  );

  renderContentContainer = () => {
    return this.state.loading ? (<LoadingSpinner />) : (
      <FlatList data={this.state.displayItems} numColumns={2} keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<EmptyList />}
        style={{ zIndex: 3 }}
        refreshControl={<WsRefreshControl onRefresh={this.handleRefresh.bind(this)} refreshing={this.state.refreshing} />}
        renderItem={this.renderItem} />
    )
  }
  
  navigateToShop = (shopId) => {
    this.props.navigation.navigate("FrontShop", { shopId: shopId });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {this.renderContentContainer()}
          <View style={{ alignItems: 'center', paddingVertical: 25 }}>
            <FilterController navigation={this.props.navigation} />
          </View>
          <MapIcon onPress={() => { this.props.navigation.navigate('MapModal'); }} />
        </View>
      </View>
    );
  }
  getNearestShop = (longitude, latitude, maxdistance, currentPoint) => {
    getNearsShopByPoint(longitude, latitude, maxdistance, currentPoint, (result) => {
      this.getItem();
      this.props.refreshShops(result);
      this.props.onMarkersDisplayed({
        markers: result.result.map(x => {
          return {
            _id: x._id,
            coordinate:
              {
                longitude: x.location.coordinates[0],
                latitude: x.location.coordinates[1]
              },
            title: x.name,
            description: x.description,
            image: { uri: environments.IMAGE_URL + x.profile_image }
          }
        })
      });
    })
  };
  getCurrentPosition = () => {
    let {latitudeDelta, longitudeDelta, radius} = this.props.mapSetting;
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coordinate, routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;
        this.setState({ currentPoint: { lat: latitude, lng: longitude }});
        this.props.onCoordinatesChanged({
          latitude, longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta
        })
        this.getNearestShop(longitude, latitude, radius, {lat: latitude, lng: longitude});
      },
      error => {
        alert(error);
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  };

  getItem = () => {
    let { items } = this.state;
    let { order, keyword } = this.props;

    if (keyword != '') {
      let itemKeywordArray = SearchHelper.getKeywordArray(keyword);
      //items = FilterHelper.itemFilter(items, itemKeywordArray);
      //items = FilterHelper.filterShopType();
    }
    items = OrderHelper.orderByAndSetItemList(order, items);
    this.setState({ displayItems: items, loading: false, refreshing: false });

    //list = FilterHelper.filterItemType(list, type);
    //list = FilterHelper.filterItemStatus(list, isCurrentShop);
    //list = GroupHelper.groupItems(list);
    //this.displayShopOnMapList = GroupHelper.groupByKeywordAndGetKeyValue(list, "seller");
    //this.refreshMarker(this.mapObj, this.centerSetting);
    //this.addInfoBubbleListener(this.displayShopOnMapList);
    //this.loading = false;
    //this.showRerender = false;
    //this.setState({ displayItems: list });
  };

  handleRefresh = () => {
    let { circleLatitude, circleLongitude, radius } = this.props.mapSetting;
    this.setState({ refreshing: true, loading: true }, () => {
      this.getNearestShop(circleLongitude, circleLatitude, radius, this.state.currentPoint);
    });
  };
}
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer.mapSetting,
    keywordSearchbar: state.mapReducer.keywordSearchbar,
    orderbar: state.mapReducer.optionbar,
    user: state.userReducer.user
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...MapAction, ...UserAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});
