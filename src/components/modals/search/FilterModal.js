import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchbarList from './SearchbarList';

const { height, width } = Dimensions.get('window');
class FilterModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.navigation.setParams({ onSearchPressed: this.onSearchPress });
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchbarList />
            </View>
        )
    }
    onSearchPress = () => {
        let { searchedLocationLatitude, searchedLocationLongitude } = this.props.locationSearchbar;
        let { circleLatitude, circleLongitude, latitudeDelta, longitudeDelta, radius } = this.props.mapSetting;
        this.props.onCoordinatesChanged(
            {
                latitude: searchedLocationLatitude || circleLatitude,
                longitude: searchedLocationLongitude || circleLongitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            }
        );
        this.props.triggerRefresh();
        this.props.navigation.goBack();
    }
}
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer.mapSetting,
        locationSearchbar: state.mapReducer.locationSearchbar,
        keywordSearchbar: state.mapReducer.keywordSearchbar
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        shadowColor: colors.greyLighten1,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: .3
    }
});
