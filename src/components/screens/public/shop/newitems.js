import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, WsItem, WsRefreshControl, WsSearchbar, WsStatusBar } from 'components/modals/ws-modals';
import _ from 'lodash';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getPublicNewItemsByShopId } from 'services/items';
class ShopNewItemsScreen extends React.Component {
  flatListRef;
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      searchKeyword: '',
      order: '',
      items: [],
      searchItems: [],
      refreshing: false,
      shopId: this.props.shop_id
    }
  }
  componentDidMount() {
    this.onNewItemsPress();
  }
  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <WsStatusBar />
          <View style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
            <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Item'} />
          </View>
          <CustomOrderBar onPress={this.onOrderPress}isSelected={this.state.order}  onNewItemsPress={this.onNewItemsPress}/>
          <FlatList data={this.state.searchItems}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ref={(ref) => this.flatListRef = ref}
            ListEmptyComponent={<EmptyList message={'No new item!'} />}
            refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}
            renderItem={({ item, index }) => (<ContentContainer index={index} item={item} navigation={this.props.navigation} />)} />
        </View>)
    );
  }
  // #region Events
  onChangeText = _.debounce((value) => {
    if (value === '') {
      this.setState({ searchItems: this.state.items, searchKeyword: value });
    }
    else {
      let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(value.toLowerCase())) || []
      this.setState({ searchItems: searchItems, searchKeyword: value });
    }
  }, 500);
  onOrderPress = (value) => {
    let items = [];
    this.setState({ loading: true });
    let searchKeyword = this.state.searchKeyword;
    
    let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(searchKeyword.toLowerCase())) || []  
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ order: value });
    
    items = this.orderItems(searchItems, value);
    this.setState({ searchItems: items, loading: false });
  }
  orderItems(items, value) {
    let newItems = [];
    switch (value) {
      case 'thebest':
        newItems = _.orderBy(items, ['price']);
        break;
      case 'alphabet':
        newItems = _.orderBy(items, ['name']);
        break;
    }
    return newItems;
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
        this.onNewItemsPress();
    })
  }
  onNewItemsPress = () => {
    this.setState({ loading: true, searchKeyword: '' });
    getPublicNewItemsByShopId(this.state.shopId, (result) => {
      this.setState({
        items: result.result,
        searchItems: result.result,
        order: 'new',
        loading: false
      });
    })
  }
  // #endregion
}
const OrderItem = ({ onPress, label, value, selected }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: selected === value ? 'bold' : 'normal' }}>{label}</Text>
    </View>
  </TouchableOpacity>
)
const CustomOrderBar = ({ onPress, onNewItemsPress, isSelected }) => (
  <View style={{ justifyContent: 'center', padding: 10 }}>
    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: 30 }} showsHorizontalScrollIndicator={false} horizontal={true}>
      <OrderItem onPress={onNewItemsPress} label={'New'} value={'new'} selected={isSelected} />
      {/* <TouchableOpacity onPress={() => onPress('price')}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: isSelected === 'price_low_to_high' || isSelected === 'price_high_to_low' ? 'bold' : 'normal' }}>Price</Text>
          <View>
            <MaterialCommunityIcons style={{ marginTop: -5, height: 10}} color={isSelected === 'price_high_to_low' ? colors.black : colors.grey} size={15} name='chevron-up' />
            <MaterialCommunityIcons style={{ height: 10}} color={isSelected === 'price_low_to_high' ? colors.black : colors.grey} size={15} name='chevron-down'/>
          </View>
        </View>
      </TouchableOpacity> */}
      <OrderItem onPress={() => onPress('alphabet')} label={'A - Z'} value={'alphabet'} selected={isSelected} />
    </ScrollView>
  </View>
)

const ContentContainer = ({ item, navigation, index }) => (
  <View style={{ width: '50%' }}>
    <WsItem style={{ borderLeftWidth: index % 2 ? 0 : 1, borderTopWidth: index > 1 ? 0 : 1 }} navigation={navigation} showFollow={true} item={item}></WsItem>
  </View>
)

const mapStateToProps = state => {
  return {
    shop_id: state.shopReducer.shop_id
  }
}

export default connect(mapStateToProps)(ShopNewItemsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});