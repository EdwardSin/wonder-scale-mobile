import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import KeywordSearchbar from './KeywordSearchbar';
import LocationSearchbar from './LocationSearchbar';
import React from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchbarController extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View {...this.props} style={styles.controlContainer}>
            <KeywordSearchbar placeholder={"Keyword..."} />
            <LocationSearchbar placeholder={"Location"} />
            {/* <Optionbar /> */}
            {/* <WsSearchBar loading={this.props.loading} value={this.props.locationSearchbar.value}
                onFocus={this.props.locationSearchbar.onFocus}
                    //() => { this.setState({ orderDropDown: false, isSearchPlaceBarFocus: true, isSearchKeywordBarFocus: false }) }}
                onChangeText={this.props.locationSearchbar.onChangeText}
                //value => { this.setState({ place: value }, () => { this.getItem(); }); }} 
                placeholder="Location Search..."
            /> */}

            {/* <View style={{ flexDirection: 'row', height: 50 }}>
                <OrderButton onPress={this.props.orderButton.onPress}
                    //() => { this.setState({ orderDropDown: !this.state.orderDropDown }); }} 
                    //value={this.getOrderAsString(this.state.order)} 
                    value={this.getOrderAsString(this.props.orderButton.value)}
                />
                <CurrentlyOpenCheckbox
                    currentlyOpen={this.props.currentlyOpenCheckbox.currentlyOpen}
                    onPress={this.props.currentlyOpenCheckbox.onPress}
                //() => { this.setState({ currentlyOpen: !this.state.currentlyOpen }) }} 
                />
                {/* <DisplayButton onPress={() => { this.setState({ displayView: this.state.displayView == 'list' ? 'block' : 'list' }) }}
                name={this.state.displayView == 'list' ? "th" : "th-list"} />
            </View> */}
        </View>)
    }
    
    
    
}

const mapStateToProps = state => {
    return state.mapReducer;
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps)(SearchbarController);

const styles = StyleSheet.create({
    controlContainer: {
        paddingVertical: 5,
        backgroundColor: colors.secondary,
        zIndex: 4
    }
});