import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import { EmptyList, LoadingSpinner, WsItem, WsSearchbar, WsStatusBar } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ImageViewer } from 'react-native-image-zoom-viewer';
import { getPublicItemsByCategoryId } from 'services/items';
import { LightTheme } from 'themes/light.theme';

const { width } = Dimensions.get('window');

const currency = new Currency();

const themeType = new LightTheme;

const theme = {
  backgroundColor: themeType.backgroundColor,
  item: {
    textColor: themeType.textColor,
    textBackgroundColor: themeType.textBackgroundColor,
  },
  image:{
    textColor: themeType.imageColor,
    textBackgroundColor: themeType.imageBackgroundColor
  },
  searchbar: {
    borderColor: colors.greyLighten3
  }
}

export default class CategoryItemsScreen extends React.Component {
  flatListRef;

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      selectedItem: {},
      items: [],
      searchItems: [],
      modalVisible: false,
      order: 'thebest',
      loading: true,
      display: 'list',
      category_id: this.props.navigation.state.params.categoryId
      //category_id: this.props.navigation.state.params.categoryId
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
          <WsStatusBar />
          <View style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.searchbar.borderColor }}>
            <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Item...'} />
          </View>
          <CustomOrderBar isSelected={this.state.order} onPress={this.onAllItemsPress} />
          <FlatList data={this.state.searchItems}
            numColumns={this.state.display === 'block' ? 2 : 1}
            keyExtractor={(item) => item._id}
            ref={(ref) => this.flatListRef = ref}
            ListEmptyComponent={<EmptyList />}
            renderItem={({ item, index }) => (<ContentContainer onImagePress={() => { this.setState({ modalVisible: true, selectedItem: item }) }} display={this.state.display}
              index={index} item={item} navigation={this.props.navigation}
            />)} />
          <ImageModal item={this.state.selectedItem}
            isVisible={this.state.modalVisible}
            imageIndex={this.state.imageIndex}
            onClosePress={() => this.setState({modalVisible: false})}
            onButtonPress={() => { this.setState({ modalVisible: false }); this.props.navigation.navigate("ItemDetail", { itemId: this.state.selectedItem._id }); }}
            onSwipeDown={() => { this.setState({ modalVisible: false }); }} />
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
    // if (value === 'price') {
    //   if (this.state.order === 'price_low_to_high') {
    //     value = 'price_high_to_low';
    //   }
    //   else {
    //     value = 'price_low_to_high';
    //   }
    // }
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    this.setState({ order: value });
    let items = [];

    switch (value) {
      case 'thebest':
        items = _.orderBy(searchItems, ['price']);
        break;
      // case 'price_high_to_low':
      //   items = _.orderBy(searchItems, ['price']).reverse();
      //   break;
      // case 'price_low_to_high':
      //   items = _.orderBy(searchItems, ['price']);
      //   break;
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
    <View style={{ paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 15, fontWeight: selected === value ? 'bold' : 'normal', color: theme.item.textColor }}>{label}</Text>
    </View>
  </TouchableOpacity>
)

const CustomOrderBar = ({ onPress, isSelected }) => (
  <View style={{ justifyContent: 'center', padding: 10 }}>
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: 30 }} horizontal={true}>
      <OrderItem onPress={() => onPress('thebest')} label={'The Best'} value={'thebest'} selected={isSelected} />
      {/* <TouchableOpacity onPress={() => onPress('price')}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: isSelected === 'price_low_to_high' || isSelected === 'price_high_to_low' ? 'bold' : 'normal' }}>Price</Text>
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

const ContentContainer = ({ item, navigation, index, display, onImagePress }) => {
  return display == 'block' ? (
    <View style={{ width: '50%' }}>
      <WsItem style={{ borderLeftWidth: index % 2 ? 0 : 1, borderTopWidth: index > 1 ? 0 : 1 }} navigation={navigation} showFollow={true} item={item}></WsItem>
    </View>
  ) :
    <TouchableOpacity style={{ paddingHorizontal: 10, marginVertical: 5 }} onPress={() => { navigation.navigate("ItemDetail", { itemId: item._id }); }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity onPress={ item.profile_images && item.profile_images.length > 0 ? onImagePress : () => {}} style={{ backgroundColor: theme.image.textBackgroundColor, borderTopLeftRadius: 19, borderBottomLeftRadius: 19, width: 50, justifyContent: 'center', alignItems: 'center' }}>
          {
            item.profile_images && item.profile_images.length > 0 ?
              <Ionicons name={'ios-image'} size={20} color={theme.image.textColor} /> :
              <View style={{ paddingLeft: 18 }}></View>
          }
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: theme.item.textBackgroundColor, borderTopRightRadius: 19, borderBottomRightRadius: 19, flex: 1, flexDirection: 'row' }}>
          <Text style={{ flex: 2, fontSize: 16, color: theme.item.textColor }}>{item.name}</Text>
          <Text style={{ flex: 1, fontSize: 16, color: theme.item.textColor }}>{currency.currencySymbols[item.currency]} {item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
}
const ImageModal = ({ item, isVisible, onSwipeDown, onButtonPress, onClosePress, imageIndex }) => {

  let images = [];

  if (item.profile_images) {
    if (item.profile_images.length) {
      images = [{
        url: environments.IMAGE_URL + item.profile_images[item.profile_image_index],
        title: item.name, width, height: 300
      }]
    }
    else {
      images = [{
        url: environments.IMAGE_URL + 'upload/images/img_not_available.png',
        title: item.name, width, height: 300
      }]
    }
  }
  return (
    <Modal visible={isVisible} transparent={true}>
      <ImageViewer backgroundColor="rgba(0,0,0,.8)" enableSwipeDown enablePreload enableImageZoom onSwipeDown={onSwipeDown} index={imageIndex} imageUrls={images}
        renderHeader={() => {
          return (
            <TouchableOpacity onPress={onClosePress} style={{zIndex: 15, alignItems: 'center', width: 30, position: 'absolute', right: 25, top: Constants.statusBarHeight + 10 }}>
              <Ionicons name={'ios-close'} color={colors.white} size={35} />
            </TouchableOpacity>)
        }}
        renderFooter={(currentIndex) => {
          return (<View style={{ width, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
            <TouchableOpacity onPress={onButtonPress}>
              <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, backgroundColor: colors.main }}>
                <Text style={{ color: colors.white }}>{item.currency + ' ' + item.price + ' | Details'}</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ color: colors.white, fontSize: 15 }}>{item.name}</Text>
          </View>)
        }}
      />
    </Modal>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});