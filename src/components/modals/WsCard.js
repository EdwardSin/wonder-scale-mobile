import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import environments from '../../environments/environment';

const { width } = Dimensions.get('window');

class WsCard extends React.Component {
    
    renderShopProfile = () => (
        <TouchableOpacity>
            <View>
                <Image style={{ width: '100%', height: 200 }} source={{ uri: environments.IMAGE_URL + this.props.item.profile_image }} />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ padding: 10, fontSize: 15 }}>{this.props.children}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <View {...this.props} style={styles.card}>
                {this.renderShopProfile()}
            </View>
        );
    }
}


const mapStateToProps = state => {
    return { };
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(WsCard);


const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: colors.greyLighten5,
        marginBottom: 10,
        width: width
    }
});

WsCard.defaultProps = {

}

WsCard.propsTypes = {
    navigation: PropTypes.func
}