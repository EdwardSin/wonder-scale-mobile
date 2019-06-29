import { FontAwesome } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import * as SearchbarAction from 'actions/searchbar-reducer.action';
import colors from 'assets/variables/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MapController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View {...this.props} style={styles.mapControllerContainer}>
        <SearchAreaButton loading={this.props.loading} onPress={this.onSearchPress} />
        <FilterButton onPress={this.onFilterPress} />
        {/* <MaximizeButton loading={this.props.loading} onPress={this.onMaxPress} />
        <MinimizeButton loading={this.props.loading} onPress={this.onMinPress} /> */}
      </View>
    )
  }
  onFilterPress = () => {
    this.props.navigation.navigate('FilterModal', { transition: 'forVertical' });
  }
  onSearchPress = () => {
    this.props.isSearchTriggered(true);
  }
  // onMaxPress = () => {
  //   const { radius, latitudeDelta } = this.props.mapSetting;

  //   let _radius = (radius / latitudeDelta + 10000) * latitudeDelta;
  //   this.props.onRadiusChanged(_radius);
  // }
  // onMinPress = () => {
  //   const { radius, latitudeDelta } = this.props.mapSetting;
  //   let _radius = (radius / latitudeDelta - 10000) * latitudeDelta;
  //   this.props.onRadiusChanged(_radius);
  // }
}
const FilterButton = ({ onPress }) => (
  <TouchableOpacity activeOpacity={.8} onPress={onPress}
    style={{
      padding: 5, width: 40, height: 38, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center',
      borderTopEndRadius: 5, borderBottomEndRadius: 5
    }}>
    <FontAwesome style={{ paddingHorizontal: 5 }} name={"sliders"} size={20} />
  </TouchableOpacity>
)
const SearchAreaButton = ({ onPress, loading }) => (
  <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress}
    style={{
      backgroundColor: colors.secondary, width: 150, height: 38, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 5,
      borderBottomStartRadius: 5
    }}>
    {loading ? (<ActivityIndicator color={colors.white} />) : (<Text style={{ color: colors.white }}>Search this area</Text>)}
  </TouchableOpacity>
)
// const MaximizeButton = ({ onPress, loading }) => (
//   <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress}>
//     <View style={{ padding: 5, width: 40, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
//       <Ionicons name={'ios-add'} size={25} />
//     </View>
//   </TouchableOpacity>
// )
// const MinimizeButton = ({ onPress, loading }) => (
//   <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress} >
//     <View style={{ padding: 5, width: 40, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
//       <Ionicons name={'ios-remove'} size={25} />
//     </View>
//   </TouchableOpacity>
// )
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...MapAction, ...SearchbarAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MapController);

const styles = StyleSheet.create({
  mapControllerContainer: {
    marginBottom: 20,
    zIndex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.grey,
    flex: 1,
    flexDirection: 'row'
  }
});

MapController.defaultProps = {
  loading: false
}

MapController.propsTypes = {
  loading: PropTypes.bool
}