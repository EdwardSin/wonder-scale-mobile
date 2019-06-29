import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, WsRefreshControl, WsSearchbar, WsStatusBar } from 'components/modals/ws-modals';
import _ from 'lodash';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCategoriesByShopId } from 'services/http/public/category';

class ShopCategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
      searchCategories: [],
      refreshing: false,
      shop_id: this.props.shop_id
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <WsStatusBar />
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Category'} />
          </View>
          <ScrollView refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
            <CategoriesList categories={this.state.searchCategories} onPress={this.onPress} />
          </ScrollView>
        </View>)
    );
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
  // #region Events
  onPress = (categoryId) => {
    this.props.navigation.navigate('CategoryItems', { categoryId: categoryId });
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
      loading: true
    }, () => {
      this.getCategories();
    })
  }
  // #endregion
  getCategories = () => {
    let { shop_id } = this.state;
    this.setState({ loading: true });
    getCategoriesByShopId(shop_id, (result) => {
      if (result && result.result) {
        this.setState({
          categories: result.result,
          searchCategories: result.result
        });
      }
      this.setState({ loading: false, refreshing: false });
    })
  }
}
const CategoriesList = ({ categories, onPress }) => {
  return (<View style={{ padding: 10 }}>
    {categories && categories.length > 0 ? categories.map((category, index) => (
      <CategoryListItem key={index} index={index} onPress={() => onPress(category._id)} category={category} />
    )) : <EmptyList />
    }
  </View>)
}
const CategoryListItem = ({ index, onPress, category }) => (
  <TouchableOpacity key={index} onPress={onPress}>
    <ListItem title={category.name + ' (' + category.items.length + ')'} containerStyle={styles.categoryListContainer} />
  </TouchableOpacity>
)
const mapStateToProps = state => {
  return {
    shop_id: state.shopReducer.shop_id
  }
}
export default connect(mapStateToProps)(ShopCategoriesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  categoryListContainer: {
    backgroundColor: colors.greyLighten4,
    borderBottomColor: 'transparent',
    borderRadius: 10,
    marginVertical: 5
  }
});