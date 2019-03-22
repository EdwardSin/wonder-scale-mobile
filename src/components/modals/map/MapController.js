import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import { bindActionCreators } from 'redux';
import { onRadiusChanged, refreshShops, onMarkersDisplayed } from 'actions/map-reducer-action';
import { connect } from 'react-redux';
import { getNearShopByPoint } from 'services/users';
import environments from 'environments/environment';

const SearchAreaButton = ({ onPress, loading }) => (
  <TouchableOpacity activeOpacity={.8} disabled={loading} onPress={onPress} >
    <View style={{ backgroundColor: colors.secondary, width: 150, height: 38, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (<Image style={{ width: 20, height: 20 }} source={Images.loadingWhite} />) : (<Text style={{ color: colors.white }}>Search this area</Text>)}
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
    this.getNearestShops(this.props.mapSetting.longitude, this.props.mapSetting.latitude, this.props.mapSetting.radius);
    this.props.addMapchangeListener();
  }
  
  getNearestShops = (lng, lat, radius) => {
    getNearShopByPoint(lng, lat, radius, (result) => {
        this.props.refreshShops(result.result);
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
    })
}
  onMaxPress = () => {
    let radius = this.props.mapSetting.radius + 1000;
    this.props.onRadiusChanged(radius);
  }
  onMinPress = () => {
    let radius = this.props.mapSetting.radius - 1000;
    this.props.onRadiusChanged(radius);
  }
}
const mapStateToProps = state => {
  return {
    mapSetting: state.mapReducer.mapSetting,
  };
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ onRadiusChanged, refreshShops, onMarkersDisplayed }, dispatch);
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