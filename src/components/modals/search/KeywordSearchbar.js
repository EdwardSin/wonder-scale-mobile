import { View, StyleSheet, Animated, ScrollView, Text, Keyboard, Dimensions, Easing, Button, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import WsSearchbar from './WsSearchbar';
import ListSelectionItem from './ListSelectionItem';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from 'assets/variables/colors';
import { onKeywordSearchbarChanged, onKeywordSearchbarServicePressed, onKeywordSearchbarTypePressed, onKeywordSearchbarFocused,
    closeSearchbar } from 'actions/map-reducer-action';

const { height, width } = Dimensions.get('window');
const CancelButton = ({ onPress }) => (
    <View style={{ padding: 10, backgroundColor: colors.red }}>
        <Button color={colors.white} title="Cancel" onPress={onPress} />
    </View>
)
const SearchButton = ({ onPress }) => (
    <View style={{ padding: 10, flex: 1, backgroundColor: colors.secondary }}>
        <Button color={colors.white} title="Search" onPress={onPress} />
    </View>
)
class KeywordSearchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(height - 150 - 80)
        }
    }
    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }
    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }
    keyboardWillShow(e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height - 150 - 30;
        this.setState({
            visibleHeight: newSize,
            topLogo: { width: 100, height: 70 }
        })
        this.state.animation.setValue(Dimensions.get('window').height - 150 - 84);
        Animated.timing(this.state.animation, { toValue: newSize, duration: 200, easing: Easing.linear }).start();
    }
    keyboardWillHide(e) {
        let newSize = Dimensions.get('window').height - 150 - 84;
        this.setState({
            visibleHeight: newSize,
            topLogo: { width: Dimensions.get('window').width }
        })
        this.state.animation.setValue(this.state.visibleHeight);
        Animated.timing(this.state.animation, { toValue: newSize, duration: 200, easing: Easing.linear }).start();
    }
    getServiceAsString(variable) {
        switch (variable) {
            case 'shop': return 'Shop';
            case 'item': return 'Item';
            default: return '';
        }
    }
    getTypeAsString(variable) {
        switch (variable) {
            case 'all': return 'All';
            case 'restaurant': return 'Restaurant';
            case 'service': return 'Service';
            case 'shopping': return 'Shopping';
            default: return '';
        }
    }
    renderSearchKeywordContainer = () => {
        return this.props.isSearchbarFocus &&
            (
                <Animated.View enabled style={{
                    position: 'absolute', top: 155, backgroundColor: colors.white,
                    zIndex: 99, width: '100%', height: this.state.animation
                }}>
                    <ScrollView style={{ padding: 10 }}>
                        <Text>Find:</Text>
                        <View>
                            <ListSelectionItem variable={'shop'} label={this.getServiceAsString('shop')} onPress={this.props.onKeywordSearchbarServicePressed.bind(this, 'shop')} checked={this.props.service == 'shop'} />
                            <ListSelectionItem variable={'item'} label={this.getServiceAsString('item')} onPress={this.props.onKeywordSearchbarServicePressed.bind(this, 'item')} checked={this.props.service == 'item'} />
                        </View>
                        <Text>Type:</Text>
                        <View>
                            <ListSelectionItem variable={'all'} label={this.getTypeAsString('all')} onPress={this.props.onKeywordSearchbarTypePressed.bind(this, 'all')} checked={this.props.type == 'all'} />
                            <ListSelectionItem variable={'shopping'} label={this.getTypeAsString('shopping')} onPress={this.props.onKeywordSearchbarTypePressed.bind(this, 'shopping')} checked={this.props.type == 'shopping'} />
                            <ListSelectionItem variable={'restaurant'} label={this.getTypeAsString('restaurant')} onPress={this.props.onKeywordSearchbarTypePressed.bind(this, 'restaurant')} checked={this.props.type == 'restaurant'} />
                            <ListSelectionItem variable={'service'} label={this.getTypeAsString('service')} onPress={this.props.onKeywordSearchbarTypePressed.bind(this, 'service')} checked={this.props.type == 'service'} />
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, width: width, flexDirection: 'row' }}>
                        <SearchButton onPress={() => { this.props.closeSearchbar(); Keyboard.dismiss() }} />
                        <CancelButton onPress={() => {this.props.closeSearchbar(); Keyboard.dismiss() }} />
                    </View>
                </Animated.View>
            )
    }
    render() {
        return (
            <View>
                <WsSearchbar {...this.props}
                    loading={this.props.loading} value={this.props.value}
                    onFocus={this.props.onKeywordSearchbarFocused}
                    onChangeText={this.props.onKeywordSearchbarChanged}
                />
                {/* //() => { this.setState({ orderDropDown: false, isSearchPlaceBarFocus: false, isSearchKeywordBarFocus: true }) }}
                //value => { this.setState({ keyword: value }, () => { this.getItem(); }); } */}
                {this.renderSearchKeywordContainer()}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        value: state.mapReducer.keywordSearchbar.value,
        loading: state.mapReducer.keywordSearchbar.loading,
        service: state.mapReducer.keywordSearchbar.service,
        type: state.mapReducer.keywordSearchbar.type,
        isSearchbarFocus: state.mapReducer.keywordSearchbar.focus
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ onKeywordSearchbarChanged, onKeywordSearchbarServicePressed, onKeywordSearchbarTypePressed,
        onKeywordSearchbarFocused, closeSearchbar }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(KeywordSearchbar);

const styles = StyleSheet.create({

});
