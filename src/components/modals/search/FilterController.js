import { FontAwesome } from '@expo/vector-icons';
import * as MapAction from 'actions/map-reducer.action';
import colors from 'assets/variables/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height, width } = Dimensions.get('window');
class FilterController extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <TouchableOpacity {...this.props} style={styles.button} onPress={() => {
                    this.props.navigation.navigate('FilterModal', { transition: 'forVertical' });

                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 80, backgroundColor: colors.white, borderRadius: 15 }}>
                        <FontAwesome style={{ paddingHorizontal: 5, }} name={"sliders"} fontSize={20} />
                        <Text style={{ fontSize: 18, paddingHorizontal: 5, paddingVertical: 3 }}>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...MapAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterController);

const styles = StyleSheet.create({
    button: {
        shadowColor: colors.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: .3
    }
});



FilterController.defaultProps = {

}

FilterController.propsTypes = {
    navigation: PropTypes.func
}