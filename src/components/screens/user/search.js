
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as MapAction from 'actions/map-reducer.action';
import * as SearchbarAction from 'actions/searchbar-reducer.action';
import * as ShopAction from 'actions/shop-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, KeywordSearchbar, LoadingSpinner, MapIcon, WsRefreshControl, WsStatusBar } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import StatusHelper from 'helpers/statushelper';
import _ from 'lodash';
import DistanceConverter from 'pipes/distance-converter.pipe';
import React from 'react';
import { Image, Linking, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getShopsBySearchItem, getShopsBySearchText } from 'services/http/public/shops';

let state = { items: [], scrollOffset: 0 };

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchShopsByName: props.searchShopsByName,
      searchShopsByItems: props.searchShopsByItems,
      refreshing: false,
      searchMoreLoading: true,
      hasMore: true,
      searchTriggerState: true
    };
  }
  componentDidMount() {

  }
  componentWillUpdate(nextProps) {
    let { currentLatitude, searchLatitude } = this.props.mapSetting;
    if (searchLatitude == 0 && nextProps.mapSetting.searchLatitude > 0) {
      this.setState({ searchTriggerState: true });
    }
  }
  componentDidUpdate(prevProps) {
    let { searchShopsByItems, searchShopsByName, searchTrigger } = this.props;
    let { searchTriggerState } = this.state;

    if (searchTriggerState || searchTrigger) {
      this.setState({ searchShopsByItems: [], searchShopsByName: [] }, () => {
        this.retrieveShopsBySearchName();
        this.retrieveShopsBySearchItems();
        this.stopLoading();
        this.props.isSearchTriggered(false);
        this.setState({ searchTriggerState: false });
      });
    }
    if (searchShopsByItems != prevProps.searchShopsByItems ||
      searchShopsByName != prevProps.searchShopsByName) {
      this.setState({ searchShopsByItems, searchShopsByName });
    }

  }

  renderSearchResults() {
    let { refreshing, searchMoreLoading, hasMore } = this.state;
    return (<View style={{ width: '100%', height: '100%', zIndex: 9 }}>
      <SectionList
        stickySectionHeadersEnabled={false}
        renderItem={({ item, index, section }) => this.renderShopCard({ item, index, section })}
        ListEmptyComponent={!searchMoreLoading && !refreshing && <EmptyList />}
        ListFooterComponent={(searchMoreLoading || refreshing) && <LoadingSpinner style={{ backgroundColor: 'transparent', paddingVertical: 40 }} />}
        renderSectionHeader={({ section: { title } }) => (<Text style={{ paddingHorizontal: 15, paddingVertical: 5, paddingTop: 10, color: colors.grey }}>{title}</Text>)}
        sections={this.getSections()}
        keyExtractor={(item, index) => item + index}
        onEndReached={() => {
          if (hasMore) {
            this.setState({ searchMoreLoading: true });
            this.retrieveShopsBySearchItems();
            this.stopLoading();
          }
        }}
        onEndReachedThreshold={.7}
        refreshControl={<WsRefreshControl refreshing={refreshing} onRefresh={this.handleRefresh.bind(this)} />}
      >
      </SectionList>
    </View>)
  }

  getSections() {
    let arr = [];
    let { searchShopsByName, searchShopsByItems } = this.state;

    if (searchShopsByName.length > 0) {
      arr.push({ index: 'shop', title: 'Search by shops\' name', data: searchShopsByName })
    }
    if (searchShopsByItems.length > 0) {
      arr.push({ index: 'item', title: 'Search by items\' name', data: searchShopsByItems });
    }
    return arr;
  }

  getOpeningInfo = (shop) => {
    let opening_info_type = shop.opening_info_type;
    let opening_info = shop.opening_info;
    let today = new Date().getDay();
    return StatusHelper.isCurrentlyOpen(opening_info_type, opening_info, today);
  }
  renderShopCard = ({ item, index, section }) => {
    let shop = item;
    let isCurrentlyOpen = this.getOpeningInfo(shop);
    let url = shop.profile_image.indexOf('upload/') > -1 ? environments.IMAGE_URL + shop.profile_image : shop.profile_image;
    return (<View key={index} style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10 }}>
      <TouchableOpacity onPress={() => this.navigateToFrontShop(shop)} activeOpacity={.5} style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{
          alignSelf: 'center', width: 80, height: 80, borderRadius: 40, backgroundColor: colors.white, zIndex: 10,
          shadowColor: colors.grey, shadowOpacity: 1, shadowOffset: { width: 1, height: 1 }
        }}>
          <Image style={{ width: 80, height: 80, resizeMode: 'contain', overflow: 'hidden', borderRadius: 40 }} defaultSource={environments.Image.Default_Shop} source={{ uri: url }} />
        </View>
        <View style={{ height: 93, marginLeft: -15, flex: 1, flexDirection: 'row', backgroundColor: colors.greyLighten4, borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ flex: 1, paddingRight: 15, paddingLeft: 25, justifyContent: 'center' }}>
            <Text style={{ fontSize: 17 }} numberOfLines={1} ellipsizeMode={'tail'}>{shop.name}</Text>
            <OpeningInfoTag label={isCurrentlyOpen ? 'Opening' : 'Closed'} isOpen={isCurrentlyOpen} />
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              {_.times(shop.rating, (i) => (<AntDesign key={i} style={{ width: 14 }} size={14} name={'star'} color={colors.main} />))}
              {_.times(5 - shop.rating, (i) => (<AntDesign key={i} style={{ width: 14 }} size={14} name={'staro'} color={colors.secondary} />))}
              {shop.review && shop.review.count > 0 && <Text style={{ paddingLeft: 5 }}>({shop.review.count} reviews)</Text>}
            </View>
          </View>
          <View style={{ width: 85, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.secondary, flex: 1, width: '100%', justifyContent: 'center' }}
              onPress={() => {
                Linking.openURL(`http://www.google.com/maps/place/${shop.location.coordinates[1]},${shop.location.coordinates[0]}`)
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: section.index == 'item' ? 'row' : 'column', paddingHorizontal: 5 }}>
                <Text style={{ color: colors.white }} numberOfLines={1}>{DistanceConverter.transform(shop.dist)}</Text>
                <MaterialCommunityIcons name={'map-marker'} size={20} color={colors.white} style={{ paddingLeft: 5 }} />
              </View>
            </TouchableOpacity>
            {section.index == 'item' &&
              <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.main, flex: 1, width: '100%', justifyContent: 'center' }}
                onPress={() => {
                  this.props.onSelectedShopId(shop._id);
                  this.props.navigation.navigate("Categories");
                }}>
                <Text style={{ color: colors.white, textAlign: 'center' }}>View Item</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>)
  }
  navigateToFrontShop(shop) {
    this.props.onSelectedShopId(shop._id);
    this.props.navigation.navigate('FrontShop');
  }
  navigateToMapView(shops) {
    this.props.navigation.navigate('MapView');
  }
  render() {
    let { searchShopsByName, searchShopsByItems } = this.state;
    return (
      <View style={styles.container}>
        <WsStatusBar />
        <KeywordSearchbar />
        {this.renderSearchResults()}
        <MapIcon style={{ zIndex: 10 }} onPress={() => {
          this.props.onSearchShopsByName(searchShopsByName);
          this.props.onSearchShopsByItems(searchShopsByItems);
          this.props.navigation.navigate('MapModal');
        }} />
      </View>
    );
  }
  async retrieveShopsBySearchItems() {
    let { searchShopsByItems } = this.state;
    let { searchKeyword, skip, limit, setResultParams } = this.props;
    let { searchLatitude, searchLongitude, radius } = this.props.mapSetting;
    this.setState({ searchMoreLoading: true });
    let result = await getShopsBySearchItem({ query: searchKeyword, limit: 5, skip, lat: searchLatitude, lng: searchLongitude, radius }, { current_lat: searchLatitude, current_lng: searchLongitude });
    if (result.result && !result.result.length) {
      this.setState({ searchMoreLoading: false, hasMore: false });
      return;
    }
    setResultParams({ skip: skip + result.result.length });
    this.setState({ searchShopsByItems: [...searchShopsByItems, ...result.result] });
  }
  async retrieveShopsBySearchName() {
    let { searchLatitude, searchLongitude, radius } = this.props.mapSetting;
    let { searchKeyword } = this.props;
    this.setState({ searchMoreLoading: true });
    let result = await getShopsBySearchText({ query: searchKeyword, limit: 3, lat: searchLatitude, lng: searchLongitude, radius });
    this.setState({ searchShopsByName: result['result'] });
  }
  stopLoading() {
    this.setState({ searchMoreLoading: false, refreshing: false, onSearchDisplayed: true })
  }
  handleRefresh = () => {
    this.setState({ refreshing: true, loading: true, skip: 0, hasMore: true }, () => {
      this.retrieveShopsBySearchName();
      this.retrieveShopsBySearchItems();
      this.stopLoading();
    });
  }
}

const OpeningInfoTag = ({ label, isOpen }) => (
  <View style={{ backgroundColor: isOpen ? colors.greenLighten1 : colors.red, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginVertical: 2, alignSelf: 'flex-start' }}>
    <Text style={{ fontSize: 14, color: colors.white }}>{label}</Text>
  </View>
)
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer,
    orderbar: state.searchbarReducer.optionbar,
    searchShopsByItems: state.shopReducer.searchShopsByItems,
    searchShopsByName: state.shopReducer.searchShopsByName,
    searchKeyword: state.searchbarReducer.keywordSearchbar.searchKeyword,
    limit: state.searchbarReducer.keywordSearchbar.limit,
    skip: state.searchbarReducer.keywordSearchbar.skip,
    searchTrigger: state.searchbarReducer.searchTrigger
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...MapAction, ...UserAction, ...ShopAction, ...SearchbarAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
