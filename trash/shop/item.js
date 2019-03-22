import { FontAwesome, Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import * as _ from 'lodash';
import React from 'react';
import { Image, SectionList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export class ItemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modalVisible: false,
            allItems: [],
            activeItems: [],
            inactiveItems: [],
            selectedItems: [],
            itemNameError: '',
            categoryName: 'Lot'//this.props.navigation.state.params.categoryName
        }
    }
    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        const url = environments.URL + 'api/shops/itemsByCategoryId/5b7e2a9bba660739c813e70a';
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
        //             if (result && result['success']) {
        //                 this.setState({ allItems: result['result'] });
        //                 this.setState({ activeItems: this.state.allItems.filter(x => x.status === 'active') });
        //                 this.setState({ inactiveItems: this.state.allItems.filter(x => x.status === 'inactive') });
        //             }
        //             this.setState({ loading: false });
        //         })
        // });
    }

    render() {
        return this.state.loading ? <LoadingSpinner /> : (
            <View style={styles.container}>
                {this.state.selectedItems.length ? <View style={ {justifyContent : 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
                    <Text>{this.state.selectedItems.length} Selected Items</Text>
                    <Text onPress={ () => { this.setState({ selectedItems : []})}} style={{ marginLeft: 'auto'}}>Clear All</Text>
                </View> : (null)}
                <SearchBar containerStyle={styles.searchBarContainer} inputStyle={styles.searchBarInput} lightTheme showLoading
                    onChangeText={this.searchItems} placeholder='Type...' />
                <Text style={{ fontSize: 16, padding: 10, color: colors.white, backgroundColor: colors.grey }}>{this.state.categoryName}</Text>
                <SectionList
                    sections={[
                        { title: "Publish", data: this.state.activeItems },
                        { title: "Unpublish", data: this.state.inactiveItems }
                    ]}
                    renderSectionHeader={({ section }) => <Text style={styles.sectionHeaderStyle}> {section.title} </Text>}
                    keyExtractor={(item, key) => item.name}
                    renderItem={({ item }) => (
                        <TouchableNativeFeedback onPress={() => {
                            if(this.state.selectedItems.length){
                                this.includeItem(item._id)
                            }
                            else{
                                this.navigateToItem()
                            }
                        }} onLongPress={() => { this.includeItem(item._id); }}>
                            <View style={[{ flexDirection: 'row', padding: 10 }, this.isIncluded(item._id) ? { backgroundColor: colors.greyLighten2 } : (null)]}>
                                <Image style={{ width: 40, height: 40 }} source={{ uri: environments.IMAGE_URL + 'w_50/' + item.item_images[item.profile_image_index == -1 ? 0 : item.profile_image_index] }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={item.status === 'active' ? { color: colors.black } : { color: colors.grey }}>{item.name}</Text>
                                    <Text>{item.currency + item.price}</Text>
                                </View>
                                <View style={{ marginLeft: 'auto' }}>
                                    <Text onPress={() => { }} >Edit</Text>
                                    {this.isIncluded(item._id) ? <Ionicons name={'ios-checkmark-circle-outline'} size={25} color={colors.main} /> : (null)}
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                />

                <View style={styles.addIcon}>
                    <TouchableNativeFeedback
                        style={{ width: '100%', height: '100%' }}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="plus" size={25} color={colors.main} />
                        </View>
                    </TouchableNativeFeedback>
                </View>



            </View>
        );
    }
    addItem = () => {
        var categoryName = this.props.navigation.state.params.categoryName;
        var categoryId = this.props.navigation.state.params.categoryId;
    }
    navigateToodalVisible = (value) => {
        this.setState({ modalVisible: value, itemNameError: '' });
    }
    navigateToItem = () => {
        
    }
    includeItem = (id) => {
        if (this.isIncluded(id)) {
            var selectedItems = this.state.selectedItems
            selectedItems.splice(this.state.selectedItems.indexOf(id), 1);
            this.setState({ selectedItems: selectedItems });
        }
        else {
            var selectedItems = this.state.selectedItems;
            selectedItems.push(id);
            this.setState({ selectedItems: selectedItems });
        }
    }
    isIncluded = (id) => {
        return _.includes(this.state.selectedItems, id);
    }
    searchItems = (keyword) => {
        var all_items = this.state.allItems;
        if (keyword != '' && all_items) {
            this.setState({ activeItems: this.state.allItems.filter(x => x.name.toLowerCase().match(keyword) && !x.immutable && x.status === 'active') });
            this.setState({ inactiveItems: this.state.allItems.filter(x => x.name.toLowerCase().match(keyword) && !x.immutable && x.status === 'inactive') });
        }
        else {
            this.setState({ activeItems: this.state.allItems.filter(x => !x.immutable && x.status === 'active') });
            this.setState({ inactiveItems: this.state.allItems.filter(x => !x.immutable && x.status === 'inactive') });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        backgroundColor: colors.greyLighten4,
        borderBottomWidth: 0
    },
    searchBarInput: {
        backgroundColor: colors.white
    },
    sectionHeaderStyle: {
        padding: 5,
        backgroundColor: colors.greyLighten2
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0 ,0 , 0.3)', justifyContent: 'center', alignItems: 'center', flex: 1
    }
});