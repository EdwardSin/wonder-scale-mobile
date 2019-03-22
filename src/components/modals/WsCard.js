import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import environments from '../../environments/environment';

const { width } = Dimensions.get('window');

export default class WsCard extends React.Component {
    
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

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#f7f7f7',
        marginBottom: 10,
        width: width
    }
});
