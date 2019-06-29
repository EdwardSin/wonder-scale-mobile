import * as MapAction from 'actions/map-reducer.action';
import * as SearchbarAction from 'actions/searchbar-reducer.action';
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
        let { searchLatitude, searchLongitude, currentLatitude, currentLongitude, latitudeDelta, longitudeDelta, radius } = this.props.mapSetting;
        this.props.onCoordinatesChanged(
            {
                latitude: searchLatitude || currentLatitude,
                longitude: searchLongitude || currentLongitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            }
        );
        this.props.isSearchTriggered(true);
        this.props.navigation.goBack();
    }
}
const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer,
        keywordSearchbar: state.searchbarReducer.keywordSearchbar
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction, ...SearchbarAction }, dispatch);
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
