import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, StyleSheet, Modal, TouchableOpacity, Text, View } from 'react-native';
import SearchbarList from './SearchbarList';
import { connect } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { getNearShopByPoint } from 'services/users';
import { onMarkersDisplayed } from 'actions/map-reducer-action';

const { height, width } = Dimensions.get('window');
class FilterModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.navigation.setParams({ onSearchPressed: () => {
            this.getNearestShops(this.props.latitude, this.props.longitude, this.props.radius);
        } });
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchbarList />
            </View>
        )
    }
    getNearestShops = (lng, lat, radius) => {
        getNearShopByPoint(lng, lat, radius, (result) => {
            this.props.onMarkersDisplayed({
                markers: result.result.map(x => {
                    return {
                        _id: x._id,
                        coordinate:
                            {
                                longitude: x.location.coordinates[0],
                                latitude: x.location.coordinates[1]
                            },
                        title: x.name,
                        description: x.description,
                        image: { uri: environments.IMAGE_URL + x.profile_image }
                    }
                })
            });
            this.props.navigation.goBack();
        })
    }
}
const mapStateToProps = state => {
    return {
        latitude: state.mapReducer.mapSetting.latitude,
        longitude: state.mapReducer.mapSetting.longitude,
        radius: state.mapReducer.mapSetting.radius
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ onMarkersDisplayed }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    button: {
        shadowColor: colors.greyLignten1,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: .3
    }
});
