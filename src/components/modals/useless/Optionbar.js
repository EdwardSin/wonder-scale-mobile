import { FontAwesome } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height } = Dimensions.get('window');


const OrderButton = ({ onPress, value }) => (
    <TouchableOpacity onPress={onPress} >
        <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }} >
            <Text style={{ paddingLeft: 20, paddingRight: 10, color: colors.white }}>{value}</Text>
            <FontAwesome color={colors.white} name="sort" size={25} />
        </View>

    </TouchableOpacity>
)

const CurrentlyOpenCheckbox = ({ currentlyOpen, onPress }) => (
    <View style={{ flexDirection: 'row' }}>
        <CheckBox
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 10, borderWidth: 0, paddingHorizontal: 0, marginHorizontal: 0 }}
            textStyle={{ padding: 0, marginLeft: 5, marginRight: 0, fontWeight: 'normal', color: colors.white }}
            checkedColor={colors.white}
            checked={currentlyOpen}
            title='Currently Open'
            onPress={onPress} />
    </View>
)

const DisplayButton = ({ onPress, name }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ justifyContent: 'center', marginLeft: 'auto', alignItems: 'center', paddingHorizontal: 20 }} >
            <FontAwesome color={colors.greyDarken2} name={name} size={24} />
        </View>
    </TouchableOpacity>
)

class Optionbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDropDown: false,
            orderList: ['thebest', 'relevance', 'alphabet', 'price', 'review']
        }
    }
    render() {
        return <View></View>
        // return (<View style={{ flexDirection: 'row', height: 50 }}>
        //     <OrderButton onPress={() => { this.setState({ orderDropDown: !this.state.orderDropDown }); }}
        //         value={this.getOrderAsString(this.props.order)}
        //     />
        //     <CurrentlyOpenCheckbox currentlyOpen={this.props.currentlyOpen} onPress={this.props.onOptionCurrentlyOpenPressed}
        //     />
        //     {/* <DisplayButton onPress={() => { this.setState({ displayView: this.state.displayView == 'list' ? 'block' : 'list' }) }}
        // name={this.state.displayView == 'list' ? "th" : "th-list"} /> */}
        //     <WsDropDown visible={this.state.orderDropDown} onPress={() => this.onOptionOrderPressed(this.props.order)}>
        //         {this.state.orderList.map((x, i) => <ListSelectionItem key={i} label={this.getOrderAsString(x)} onPress={() => this.onOptionOrderPressed(x)} checked={this.props.order == x} />)}
        //     </WsDropDown>
        // </View>)
    }
    getOrderAsString(variable) {
        switch (variable) {
            case 'thebest': return 'The Best';
            case 'relevance': return 'Relevance';
            case 'alphabet': return 'A - Z';
            case 'price': return 'Price';
            case 'review': return 'Review';
            default: return '';
        }
    }
    onOptionOrderPressed = (value) => {
        this.props.onOptionOrderPressed(value);
        this.setState({ orderDropDown: false });
    }
}

const mapStateToProps = state => {
    return {
        optionbar: state.mapReducer.optionbar
        // order: state.mapReducer.optionbar.order,
        // currentlyOpen: state.mapReducer.optionbar.currentlyOpen
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Optionbar);

const styles = StyleSheet.create({

});
