import { Ionicons } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const SearchAreaButton = ({ onPress, loading }) => (
  <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress} >
    <View style={{ backgroundColor: colors.secondary, width: 150, height: 38, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (<ActivityIndicator color={colors.white} />) : (<Text style={{ color: colors.white }}>Search this area</Text>)}
    </View>
  </TouchableOpacity>
)
const MaximizeButton = ({ onPress, loading }) => (
  <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress}>
    <View style={{ padding: 5, width: 40, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name={'ios-add'} size={25} />
    </View>
  </TouchableOpacity>
)
const MinimizeButton = ({ onPress, loading }) => (
  <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress} >
    <View style={{ padding: 5, width: 40, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name={'ios-remove'} size={25} />
    </View>
  </TouchableOpacity>
)

class MapController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View {...this.props} style={styles.mapControllerContainer}>
        <SearchAreaButton loading={this.props.loading} onPress={this.onSearchPress} />
        <MaximizeButton loading={this.props.loading} onPress={this.onMaxPress} />
        <MinimizeButton loading={this.props.loading} onPress={this.onMinPress} />
      </View>
    )
  }
  onSearchPress = () => {
    this.props.triggerRefresh();
  }
  onMaxPress = () => {
    const { radius, latitudeDelta } = this.props.mapSetting;
    let _radius = (radius / latitudeDelta + 10000) * latitudeDelta;
    this.props.onRadiusChanged(_radius);
  }
  onMinPress = () => {
    const { radius, latitudeDelta } = this.props.mapSetting;
    let _radius = (radius / latitudeDelta - 10000) * latitudeDelta;
    console.log(radius);
    this.props.onRadiusChanged(_radius);
  }
}
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer.mapSetting,
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ... MapAction}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MapController);

const styles = StyleSheet.create({
  mapControllerContainer: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.greyLighten3,
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 5
  }
});

MapController.defaultProps = {
  loading: false
}

MapController.propsTypes = {
  loading: PropTypes.bool
}