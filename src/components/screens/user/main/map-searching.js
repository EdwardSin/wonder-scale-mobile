import * as MapAction from 'actions/map-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { WsStatusBar } from 'components/modals/ws-modals';
import MapModal from 'components/screens/public/shop/mapmodal';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class MapSearchingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <WsStatusBar />
                <MapModal navigation={this.props.navigation}></MapModal>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction, ...MapAction, ...UserAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapSearchingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    itemCardContainer: {
        borderBottomColor: 'transparent',
        paddingVertical: 30,
        backgroundColor: colors.greyLighten3,
        justifyContent: 'center',
        borderRadius: 5, alignItems: 'center'
    }
});