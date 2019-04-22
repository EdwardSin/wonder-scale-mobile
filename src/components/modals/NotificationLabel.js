import colors from 'assets/variables/colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


export default class NotificationLabel extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View {...this.props} style={[styles.container, { backgroundColor: this.props.item.read ? colors.white : colors.greyLighten5 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 50, height: 50, marginRight: 10 }}
                        source={{ uri: this.props.item.profile_image }} />
                    <View>
                        <Text>{this.props.item.description}</Text>
                        <Text>{this.props.item.date}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 10
    }
});