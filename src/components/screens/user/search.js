
import colors from 'assets/variables/colors';
import OrderHelper from 'components/helpers/orderhelper';
import SearchHelper from 'components/helpers/searchhelper';
import { EmptyList, LoadingSpinner, MapIcon, WsCard, WsItem, WsRefreshControl, WsStatusBar, MapModal, FilterController } from 'components/modals/ws-modals';
import React from 'react';
import { bindActionCreators } from 'redux';
import { Dimensions, FlatList, Modal, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getNearShopByPoint } from 'services/users';
import { onMapModalPressed, onCoordinatesChanged, refreshShops, onMarkersDisplayed } from 'actions/map-reducer-action';
import environments from 'environments/environment';
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
  }
  renderShop = ({ item }) => (
    <View style={{ padding: 3, width: '50%' }}>
      <WsCard onPress={() => {this.navigateToShop(item._id)}} item={item} >{item.name}</WsCard>
    </View>
  );
  renderItem = ({ item }) => (
    <View style={{ padding: 3, width: '50%' }}>
      <WsItem navigation={this.props.navigation} showFollow={true}
        follow={item.follow} showSeller={true} item={item} />
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

  getNearestShop = (longitude, latitude, maxdistance) => {
    getNearShopByPoint(longitude, latitude, maxdistance, (result) => {
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
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coordinate, routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };

        this.props.onCoordinatesChanged({
          ...newCoordinate,
          latitudeDelta: this.props.mapSetting.latitudeDelta,
          longitudeDelta: this.props.mapSetting.longitudeDelta
        })

        this.getNearestShop(longitude, latitude, this.props.mapSetting.radius);
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
    this.setState({ displayItems: items, loading: false });

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
    this.setState({ refreshing: true, loading: true }, () => {
      this.getNearestShop(this.props.mapSetting.longitude, this.props.mapSetting.latitude, this.props.mapSetting.radius);
    });
  };

  // setModalVisible = value => {
  //   this.setState({ showMap: value });
  // };
}
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer.mapSetting,
    order: state.mapReducer.optionbar.order,
    type: state.mapReducer.keywordSearchbar.type,
    service: state.mapReducer.keywordSearchbar.service,
    keyword: state.mapReducer.keywordSearchbar.value
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onMapModalPressed, onCoordinatesChanged, refreshShops, onMarkersDisplayed }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});
