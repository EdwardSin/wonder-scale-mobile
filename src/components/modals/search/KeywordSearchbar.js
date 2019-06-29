import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as MapAction from 'actions/map-reducer.action';
import * as SearchbarAction from 'actions/searchbar-reducer.action';
import colors from 'assets/variables/colors';
import KeywordHelper from 'helpers/keyword.helper';
import React from 'react';
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class KeywordSearchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            onSearchbarDisplayed: false,
            list: []
        }
    }
    render() {
        let { searchKeyword, onSearchbarDisplayed } = this.state;
        return <View style={{ position: 'relative', height: onSearchbarDisplayed ? '100%' : 'auto' }}>
            <View style={{ height: 70, padding: 10, width: '100%', flexDirection: 'row' }}>
                <View style={{ backgroundColor: colors.greyLighten3, flexDirection: 'row', flex: 1, overflow: 'hidden', borderRadius: 5 }}>
                    <TouchableOpacity onPress={this.getCurrentPositionAndSubmit} style={{
                        justifyContent: 'center', alignItems: 'center', width: 45,
                        borderRightWidth: 1, borderRightColor: colors.white
                    }}>
                        <MaterialCommunityIcons name={'target'} size={25} color={'#888'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.submitKeyword} style={{ justifyContent: 'center', alignItems: 'center', width: 45 }}>
                        <Ionicons name={'ios-search'} size={25} color={'#888'} />
                    </TouchableOpacity>
                    <TextInput autoCapitalize={'none'} clearButtonMode="always" ref={input => this.input = input}
                        onFocus={() => this.onSearchbarFocus()} returnKeyType={'search'}
                        onSubmitEditing={this.submitKeyword}
                        placeholderTextColor={'#888'}
                        value={searchKeyword} onChangeText={(value) => this.setState({ searchKeyword: value })} placeholder={'Searching Keyword...'}
                        style={{ flex: 1, fontSize: 18, fontWeight: '100' }} />
                </View>
                {onSearchbarDisplayed && <Text style={{ alignSelf: 'center', paddingHorizontal: 10 }} onPress={() => { this.setState({ onSearchbarDisplayed: false }); this.input.blur() }}>Cancel</Text>}
            </View>
            <View style={{ position: 'relative', flex: 1 }}>
                {onSearchbarDisplayed && this.renderKeywordModal()}
            </View>
        </View>
    }
    renderKeywordModal() {
        let { list } = this.state;

        return <View style={{ width: '100%', height: '100%', zIndex: 10, position: 'absolute', top: 0, padding: 10, backgroundColor: colors.greyLighten4 }}>
            <ScrollView style={{ width: '100%', height: '100%' }} keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps={'always'}>
                {list.map((value, index) => (
                    <TouchableOpacity key={index} onPress={() => this.onSearchingKeywordPress(value)} style={{ paddingLeft: 15, paddingVertical: 10, flex: 1, flexDirection: 'row' }} >
                        <Text style={{ flex: 1, fontSize: 17 }}>{value}</Text>
                        <TouchableOpacity onPress={async (event) => {
                            event.stopPropagation();
                            this.setState({ list: await KeywordHelper.removeKeywordFromHistory(value, list) })
                        }} style={{ width: 50, alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}>
                            <Ionicons name={'ios-close'} color={colors.grey} size={25} />
                        </TouchableOpacity>
                    </TouchableOpacity>))}
            </ScrollView>
        </View>;
    }
    // async removeKeywordFromHistory(value) {
    //     let { list } = this.state;
    //     let array = [...list];
    //     let startIndex = list.indexOf(value);
    //     array.splice(startIndex, 1);
    //     this.setState({ list: array });
    //     await AsyncStorage.setItem('keywords', JSON.stringify(_.slice([...array], 0, 10)));
    // }
    getCurrentPositionAndSubmit = () => {
        let { currentLatitude, currentLongitude } = this.props.mapSetting;
        this.props.onCurrentPosition({ latitude: currentLatitude, longitude: currentLongitude });
        this.submitKeyword();
    }
    submitKeyword = () => {
        let { searchKeyword, list } = this.state;
        this.setState({ onSearchbarDisplayed: false });
        this.props.setResultParams({ skip: 0 });
        this.props.onKeywordSearchbarChanged(searchKeyword);
        this.props.isSearchTriggered(true);
        this.input.blur();
        KeywordHelper.addToHistory(searchKeyword, list);
    }
    async onSearchingKeywordPress(value) {
        let { list } = this.state;
        this.setState({ searchKeyword: value });
        await KeywordHelper.addToHistory(value, list);
        this.submitKeyword();
        Keyboard.dismiss();
    }
    async onSearchbarFocus() {
        this.setState({ onSearchbarDisplayed: true });
        this.setState({ list: await KeywordHelper.getHistoryFromStorage() });
    }
}

const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer,
        keywordSearchbar: state.mapReducer.keywordSearchbar
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction, ...SearchbarAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(KeywordSearchbar);