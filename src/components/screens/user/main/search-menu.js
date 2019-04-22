import Ionicons from '@expo/vector-icons/Ionicons';
import * as MapAction from 'actions/map-reducer.action';
import * as ToastAction from 'actions/toast-reducer.action';
import * as UserAction from 'actions/user-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, WsStatusBar } from 'components/modals/ws-modals';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from 'services/auth-user/auth-user';


class SearchMenuScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                { name: 'Restaurant', color: '#a52a2a', icon: 'ios-restaurant', onPress: this.onRestaurantPress.bind(this) },
                { name: 'Shopping', color: '#ff7f50', icon: 'ios-basket', onPress: this.onShoppingPress.bind(this) },
                { name: 'Service', color: '#daa520', icon: 'ios-cog', onPress: this.onServicePress.bind(this) },
                { name: 'Job & Recruitment', color: '#b30059', icon: 'ios-person-add', onPress: this.onJobRecruitmentPress.bind(this) },
                { name: 'Pre-Ordering', color: '#006699', icon: 'ios-clipboard', onPress: this.onPreOrderingPress.bind(this) },
                { name: 'E-Commerce', color: '#66ccff', icon: 'ios-globe', onPress: this.onECommercePress.bind(this) }
            ]
        }
    }
    componentDidMount() {
        this.getCurrentPosition();
        this.getUser();
    }
    render() {
        return (
            <View style={styles.container}>
                <WsStatusBar />
                <ScrollView style={{ flex: 1 }}>
                    <CategoriesList categories={this.state.categories} />
                </ScrollView>
            </View>
        );
    }
    setCurrentPosition({ latitude, longitude }) {
        this.props.onCurrentPositionChange({ lat: latitude, lng: longitude });
    }
    moveToMapCenterToCurrentPosition({ latitude, longitude }) {
        this.props.onCoordinatesChanged({
            latitude, longitude,
            latitudeDelta: this.props.mapSetting.latitudeDelta,
            longitudeDelta: this.props.mapSetting.longitudeDelta
        })
    }
    getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                this.setCurrentPosition({ latitude, longitude });
                this.moveToMapCenterToCurrentPosition({ latitude, longitude });
            },
            error => { alert(error); },
            { enableHighAccuracy: true, timeout: 20000 }
        );
    };
    getUser = () => {
        this.setState({ loading: true });
        getUser((result) => {
            this.props.updateUser(result);
            this.setState({ user: result, loading: false });
        }, (err) => {
            this.setState({ loading: false });
            // onSignOut().then(result => {
            //   this.props.navigation.navigate('Login');
            // });
        })
    };
    // #region Event 
    onRestaurantPress() {
        this.props.onOptionTypePressed('restaurant');
        this.props.navigation.navigate('MapModal', { transition: 'forVertical' });
    }
    onShoppingPress() {
        this.props.onOptionTypePressed('shopping');
        this.props.navigation.navigate('MapModal', { transition: 'forVertical' });
    }
    onServicePress() {
        this.props.onOptionTypePressed('service');
        this.props.navigation.navigate('MapModal', { transition: 'forVertical' });
    }
    onJobRecruitmentPress() {
        this.props.navigation.navigate('RecruitmentMapModal', { transition: 'forVertical' });
    }
    onPreOrderingPress(){
        this.props.onToast('Feature is coming soon!');
        //this.props.navigation.navigate('MapModal', { transition: 'forVertical' });
    }
    onECommercePress() {
        this.props.onToast('Feature is coming soon!');
    }
    // #endregion
}

const ItemCard = ({ item, index }) => (
    <View style={{ padding: 5, width: '50%' }}>
        <TouchableOpacity activeOpacity={.6} key={index} onPress={item.onPress} style={styles.itemCardContainer}>
            <Ionicons size={55} color={item.color} name={item.icon} style={{ paddingBottom: 10 }} />
            <Text style={{ fontSize: 15 }}>{item.name}</Text>
        </TouchableOpacity>
    </View>
)

const CategoriesList = ({ categories }) => {
    return (<View style={{ padding: 10 }}>
        <FlatList data={categories}
            numColumns={2}
            keyExtractor={(item) => item._id}
            ref={(ref) => this.flatListRef = ref}
            ListEmptyComponent={<EmptyList />}
            renderItem={({ item, index }) => (<ItemCard item={item} index={index} />)} />
    </View>)
}

const mapStateToProps = state => {
    return {
        mapSetting: state.mapReducer.mapSetting
    };
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction, ...MapAction, ...UserAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMenuScreen);

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