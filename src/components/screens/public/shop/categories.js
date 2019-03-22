import colors from 'assets/variables/colors';
import { LoadingSpinner, WsRefreshControl, WsSearchbar, EmptyList } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { getCategoriesByShopId } from 'services/shops';

const CategoriesList = ({ categories, onPress }) => {
  return (<View style={{ padding: 10 }}>
    {categories && categories.length > 0 ? categories.map((category, index) => (
      <TouchableOpacity key={index} onPress={() => { onPress(category._id) }}>
        <ListItem title={category.name + '(' + category.items.length + ')'} containerStyle={{
          backgroundColor: colors.lightGrey,
          borderBottomColor: 'transparent',
          borderRadius: 50, marginBottom: 5
        }}
           />
      </TouchableOpacity>
    )) : <EmptyList />
    }
  </View>)
}

export default class ShopCategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      searchCategories: [],
      refreshing: false,
      shopId: environments.shop_id//this.props.navigation.state.params.shopId
    }
  }

  componentDidMount() {
    this.getShop();
  }

  getShop = () => {
    this.setState({ loading: true });
    getCategoriesByShopId(this.state.shopId, (result) => {
      if (result && result.result) {
        this.setState({
          categories: result.result,
          searchCategories: result.result
        });
      }
      this.setState({ loading: false, refreshing: false });
    })
  }
  onChangeText = _.debounce((value) => {
    if (value === '') {
      this.setState({ searchCategories: this.state.categories });
    }
    else {
      let searchCategories = _.filter(this.state.categories, (category) => category.name.toLowerCase().match(value.toLowerCase())) || []
      this.setState({ searchCategories: searchCategories });
    }
  }, 500);
  onPress = (categoryId) => {
    this.props.navigation.navigate('CategoryItems', { categoryId: categoryId });
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getShop();
    })
  }
  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <View style={{ height: Constants.statusBarHeight }}></View>
          <View style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}>
            <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Category'} />
          </View>
          <ScrollView refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
            <CategoriesList categories={this.state.searchCategories} onPress={this.onPress} />
          </ScrollView>
        </View>)
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe'
  }
});