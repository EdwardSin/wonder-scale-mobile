import { FontAwesome } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner, WsButton, WsTextInput } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import React from 'react';
import { Modal, SectionList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { ItemScreen } from './item';

class CategoryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modalVisible: false,
            categoryName: '',
            categoryNameError: '',
            allCategories: [],
            inactiveCategories: [],
            defaultCategories: [],
            activeCategories: [],
            inactiveategories: []
        }
    }
    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {
        const url = environments.URL + 'api/shops/authenticatedShopCategories/5b45caa267cd2135b01ef27e';
        this.setState({ loading: true });

        // AsyncStorage.getItem('ws-token').then((token) => {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             authorization: token
        //         }
        //     }).then(res => res.json())
        //         .then(result => {
        //             if (result['success']) {
        //                 this.setState({ all_categories: result['result'] });
        //                 this.setState({ default_categories: this.state.all_categories.filter(x => x.immutable).sort(this.sortByName) })
        //                 this.setState({ active_categories: this.state.all_categories.filter(x => !x.immutable && x.status === 'active').sort(this.sortByName) });
        //                 this.setState({ inactive_categories: this.state.all_categories.filter(x => !x.immutable && x.status === 'inactive').sort(this.sortByName) });
        //             }
        //             this.setState({ loading: false });
        //         })
        // });
    }
    sortByName = (a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <View style={styles.container}>
                <SearchBar containerStyle={styles.searchBarContainer} inputStyle={styles.searchBarInput} lightTheme showLoading
                    onChangeText={this.getCategory} placeholder='Type...' />
                <SectionList
                    sections={[
                        { title: "Default Categories", data: this.state.defaultCategories },
                        { title: "Active Categories", data: this.state.activeCategories },
                        { title: "Inactive Categories", data: this.state.inactiveategories }
                    ]}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeaderStyle}> {section.title} </Text>}
                    keyExtractor={(item, key) => item.name}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback onPress={() => this.navigateToItems(item._id, item.name, item.items)}>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Text style={item.status === 'active' ? { color: colors.black } : { color: '#888' }}>{item.name} ({item.items.length})</Text>
                                {item.immutable ? (null) : <Text onPress={() => { }} style={{ marginLeft: 'auto' }}>Edit</Text>}
                            </View>
                        </TouchableNativeFeedback>
                    )}
                />

                <View style={styles.addIcon}>
                    <TouchableNativeFeedback
                        style={{ width: '100%', height: '100%' }}
                        onPress={() => this.setModalVisible(true)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="plus" size={25} color={colors.black} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.modalBackground}>
                        <View style={{ backgroundColor: colors.white, padding: 20, borderRadius: 5 }}>
                            <WsTextInput placeholder="Category Name" onChangeText={(value) => { this.setState({ categoryNameError: '', categoryName: value }) }} value={this.state.categoryName} />
                            <Text style={styles.errorText}>{this.state.categoryNameError}</Text>
                            <WsButton onPress={this.onPressAddCategory}>Add Category</WsButton>
                            <WsButton onPress={() => this.setModalVisible(!this.state.modalVisible)}>Cancel</WsButton>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    onPressAddCategory = () => {
        if (this.state.categoryName === '') {
            this.setState({ categoryNameError: 'Category cannot be empty.' });
        }
    }
    setModalVisible = (value) => {
        this.setState({ modalVisible: value, categoryNameError: '' });
    }
    getCategory = (keyword) => {
        var all_categories = this.state.allCategories;
        if (keyword != '' && all_categories) {
            this.setState({ defaultCategories: [] });
            this.setState({ activeCategories: this.state.allCategories.filter(x => x.name.toLowerCase().match(keyword) && !x.immutable && x.status === 'active') });
            this.setState({ inactiveCategories: this.state.allCategories.filter(x => x.name.toLowerCase().match(keyword) && !x.immutable && x.status === 'inactive') });
        }
        else {
            this.setState({ defaultCategories: this.state.allCategories.filter(x => x.immutable) })
            this.setState({ activeCategories: this.state.allCategories.filter(x => !x.immutable && x.status === 'active') });
            this.setState({ inactiveCategories: this.state.allCategories.filter(x => !x.immutable && x.status === 'inactive') });
        }
    }
    navigateToItems = (categoryId, categoryName, itemsId) => {
        this.props.navigation.navigate("Item", {
            categoryId: categoryId,
            categoryName: categoryName,
            itemsId: itemsId
        });
    }
}

class DescriptionBannerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.getFollowItems();
    }

    getFollowItems = () => {
        const url = 'http://192.168.1.83:3000/api/shops/followItems';
        this.setState({ loading: true });

        // AsyncStorage.getItem('ws-token').then((token) => {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             authorization: token
        //         }
        //     }).then(res => res.json())
        //         .then(result => {
        //             if (result['success']) {
        //                 this.setState({ items: result['result'] });
        //             }
        //             this.setState({ loading: false });
        //         })
        // });
    }

    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <View style={styles.container}>

            </View>
        );
    }
}

class ShopProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.getFollowItems();
    }

    getFollowItems = () => {
        const url = 'http://192.168.1.83:3000/api/shops/followItems';
        this.setState({ loading: true });

        // AsyncStorage.getItem('ws-token').then((token) => {
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             authorization: token
        //         }
        //     }).then(res => res.json())
        //         .then(result => {
        //             if (result['success']) {
        //                 this.setState({ items: result['result'] });
        //             }
        //             this.setState({ loading: false });
        //         })
        // });
    }

    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <View style={styles.container}>

            </View>
        );
    }
}

var CategoryStack = createStackNavigator({
    Category: {
        screen: CategoryScreen,
        navigationOptions: {
            header: null
        }
    },
    Item: {
        screen: ItemScreen,
        navigationOptions: {
            header: null,
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome size={23} name={`th`} color={tintColor} />
            )
        }
    }
},
    { initialRouteName: 'Item' }
)

export default createMaterialTopTabNavigator({
    Category: {
        screen: CategoryStack, navigationOptions: {
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome size={23} name={`th`} color={tintColor} />
            )
        }
    },
    "Description Banner": {
        screen: DescriptionBannerScreen, navigationOptions: {
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome size={23} name={`photo`} color={tintColor} />
            )
        }
    },
    "Shop Profile": {
        screen: ShopProfileScreen, navigationOptions: {
            tabBarIcon: ({ tintColor, focused }) => (
                <FontAwesome size={23} name={`info-circle`} color={tintColor} />
            )
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: colors.black,
            pressColor: colors.grey,
            inactiveTintColor: colors.black,
            style: {
                backgroundColor: '#f7f7f7',
            },
            indicatorStyle: {
                backgroundColor: colors.main,
            },
            upperCaseLabel: false,
            showIcon: true,
            showLabel: false
        },
        tabBarComponent: MaterialTopTabBarWithStatusBar,
        animationEnabled: true,
        swipeEnabled: true
    }
);
function MaterialTopTabBarWithStatusBar(props) {
    return (
        <View style={{ backgroundColor: '#f7f7f7', }}>
            <MaterialTopTabBar {...props} jumpToIndex={() => { }} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    description: {
        marginTop: 5,
        marginBottom: 5
    },
    card: {
        padding: 10,
        backgroundColor: '#f7f7f7'
    },
    updateAt: {
        color: '#888',
    },
    addIcon: {
        position: "absolute",
        backgroundColor: colors.white,
        overflow: 'hidden',
        borderRadius: 25,
        width: 50,
        height: 50,
        bottom: 20,
        right: 20
    },
    searchBarContainer: {
        backgroundColor: "#f7f7f7",
        borderBottomWidth: 0
    },
    searchBarInput: {
        backgroundColor: colors.white
    },
    sectionHeaderStyle: {
        padding: 5,
        backgroundColor: '#ccc'
    },
    errorText: {
        color: colors.main,
        marginBottom: 10,
        fontSize: 15,
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0 ,0 , 0.3)', justifyContent: 'center', alignItems: 'center', flex: 1
    }
});