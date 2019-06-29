import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, WsItem, WsRefreshControl, WsSearchbar, WsStatusBar } from 'components/modals/ws-modals';
import { Constants } from 'expo';
import _ from 'lodash';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { getPublicDiscountItemsByShopId } from 'services/http/public/items';

class ShopDiscountItemsScreen extends React.Component {
    flatListRef;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            searchKeyword: '',
            order: '',
            items: [],
            discountItems: [],
            searchItems: [],
            refreshing: false,
            shopId: this.props.shop_id
            //shopId: this.props.navigation.state.params.shopId
        }
    }
    componentDidMount() {
        this.onDiscountPress();
    }
    render() {
        return (
            this.state.loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <WsStatusBar />
                    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <WsSearchbar onChangeText={this.onChangeText} placeholder={'Search Item'} />
                    </View>
                    <CustomOrderBar
                        isSelected={this.state.order}
                        onPress={this.onOrderPress}
                        onDiscountPress={this.onDiscountPress} />
                    <FlatList data={this.state.searchItems}
                        numColumns={2}
                        style={{ backgroundColor: colors.greyLighten3, padding: 5 }}
                        keyExtractor={(item) => item._id}
                        ref={(ref) => this.flatListRef = ref}
                        ListEmptyComponent={<EmptyList message={'No discount item!'} />}
                        refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}
                        renderItem={({ item, index }) => (<ContentContainer index={index} item={item} navigation={this.props.navigation} />)} />
                </View>)
        );
    }
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
    onChangeText = _.debounce((value) => {
        if (value === '') {
            this.setState({ searchItems: this.state.items, searchKeyword: value });
        }
        else {
            let searchItems = _.filter(this.state.items, (item) => item.name.toLowerCase().match(value.toLowerCase())) || []
            this.setState({ searchItems: searchItems, searchKeyword: value });
        }
    }, 500);

    orderItems(items, value) {
        let discountItems = [];
        switch (value) {
            case 'thebest':
                discountItems = _.orderBy(items, ['price']);
                break;
            case 'alphabet':
                discountItems = _.orderBy(items, ['name']);
                break;
        }
        return discountItems;
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.onDiscountPress();
        })
    }
    onDiscountPress = () => {
        this.setState({ loading: true, searchKeyword: '' });
        getPublicDiscountItemsByShopId(this.state.shopId, (result) => {
            this.setState({
                discountItems: result['result'],
                searchItems: result['result'], order: 'discount',
                loading: false
            });
        })
    }
}
const CustomSearchBar = ({ onChangeText }) => (
    <SearchBar containerStyle={{
        backgroundColor: 'transparent', marginTop: Constants.statusBarHeight,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    }}
        inputContainerStyle={{ backgroundColor: colors.greyLighten2 }}
        inputStyle={{ backgroundColor: colors.greyLighten2 }}
        onChangeText={onChangeText} placeholder='Search Item...' />
)
const OrderItem = ({ onPress, label, value, selected }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: selected === value ? 'bold' : 'normal' }}>{label}</Text>
        </View>
    </TouchableOpacity>
)
const CustomOrderBar = ({ onPress, onDiscountPress, isSelected }) => (
    <View style={{ justifyContent: 'center', padding: 10 }}>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: 30 }} showsHorizontalScrollIndicator={false} horizontal={true}>
            <OrderItem onPress={() => onDiscountPress()} label={'Discount'} value={'discount'} selected={isSelected} />
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
    <View style={{ width: '50%', padding: 5 }}>
        <WsItem style={{ width: '100%', backgroundColor: colors.white, borderWidth: 0, borderRadius: 5 }} navigation={navigation} showFollow={true} item={item}></WsItem>
    </View>
)

const mapStateToProps = state => {
    return {
        shop_id: state.shopReducer.shop_id
    }
}

export default connect(mapStateToProps)(ShopDiscountItemsScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
});