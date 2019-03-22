import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import sizes from 'assets/variables/sizes';
import { LoadingSpinner, WsItem, WsSearchbar, EmptyList } from 'components/modals/ws-modals';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getPublicItemsByCategoryId } from 'services/items';
import environments from '../../../../environments/environment';

export default class CategoryItemsScreen extends React.Component {
  flatListRef;
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      items: [],
      searchItems: [],
      order: 'thebest',
      loading: true,
      category_id: environments.category_id || this.props.navigation.state.params.categoryId
    }
  }
  componentDidMount() {
    this.getPublicItemsByCategoryId();
  }

  getPublicItemsByCategoryId = () => {
    this.setState({ loading: true });
    getPublicItemsByCategoryId(this.state.category_id, (result) => {
      this.setState({
        items: result['result'],
        searchItems: result['result'],
        loading: false,
      });
    })
  }

  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
        <View style={{ height: Constants.statusBarHeight }}></View>
          <View style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
            <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Item...'} />
          </View>
          {/* <CustomSearchBar onChangeText={this.onChangeText} /> */}
          <CustomOrderBar isSelected={this.state.order} onPress={this.onAllItemsPress} />
          <FlatList data={this.state.searchItems}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ref={(ref) => this.flatListRef = ref}
            ListEmptyComponent={<EmptyList />}
            renderItem={({ item, index }) => (<ContentContainer index={index} item={item} navigation={this.props.navigation} />)} />
        </View>)
    );
  }

  onChangeText = _.debounce((value) => {
    if (value === '') {
      this.setState({ searchItems: this.state.items, searchKeyword: value });
    }
    else {
      let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(value.toLowerCase())) || []
      this.setState({ searchItems: searchItems, searchKeyword: value });
    }
  }, 500);
  onAllItemsPress = (value) => {
    this.setState({ loading: true });
    let searchKeyword = this.state.searchKeyword;
    let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(searchKeyword.toLowerCase())) || []
    if (value === 'price') {
      if (this.state.order === 'price_low_to_high') {
        value = 'price_high_to_low';
      }
      else {
        value = 'price_low_to_high';
      }
    }
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ order: value });
    let items = [];

    switch (value) {
      case 'thebest':
        items = _.orderBy(searchItems, ['price']);
        break;
      case 'price_high_to_low':
        items = _.orderBy(searchItems, ['price']).reverse();
        break;
      case 'price_low_to_high':
        items = _.orderBy(searchItems, ['price']);
        break;
      case 'alphabet':
        items = _.orderBy(searchItems, ['name']);
        break;
    }
    this.setState({ searchItems: items });
    this.setState({ loading: false });
  }
}

const OrderItem = ({ onPress, label, value, selected }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingRight: sizes.padding2, paddingLeft: sizes.padding2 }}>
      <Text style={{ fontSize: sizes.fontsize3, fontWeight: selected === value ? 'bold' : 'normal' }}>{label}</Text>
    </View>
  </TouchableOpacity>
)

const CustomSearchBar = ({ onChangeText }) => (
  <SearchBar containerStyle={{
    backgroundColor: 'transparent', marginTop: Constants.statusBarHeight,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }}
    inputContainerStyle={{ backgroundColor: colors.greyLighten2 }}
    inputStyle={{ backgroundColor: colors.secondary }}
    round={true}
    onChangeText={onChangeText} placeholder='Search Item...' />
)
const CustomOrderBar = ({ onPress, isSelected }) => (
  <View style={{ justifyContent: 'center', padding: 10}}>
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      <OrderItem onPress={() => onPress('thebest')} label={'The Best'} value={'thebest'} selected={isSelected} />
      {/* <TouchableOpacity onPress={() => onPress('price')}>
        <View style={{ flexDirection: 'row', paddingRight: sizes.padding2, paddingLeft: sizes.padding2 }}>
          <Text style={{ fontSize: sizes.fontsize3, fontWeight: isSelected === 'price_low_to_high' || isSelected === 'price_high_to_low' ? 'bold' : 'normal' }}>Price</Text>
          <View>
            <MaterialCommunityIcons style={{ marginTop: -5, height: 10}} color={isSelected === 'price_high_to_low' ? colors.black : colors.grey} size={15} name='chevron-up'/>
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
    <WsItem style={{ borderLeftWidth: index % 2 ? 0: 1, borderTopWidth: index > 1 ? 0 : 1}} navigation={navigation} showFollow={true} item={item}></WsItem>
  </View>  
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});