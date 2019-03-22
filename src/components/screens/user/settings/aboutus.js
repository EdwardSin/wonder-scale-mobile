import colors from 'assets/variables/colors';
import { Title } from 'components/modals/ws-modals';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class AboutusScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (<View style={styles.container}>
            <ScrollView>
                <Title>About Us</Title>
                <Text style={{ fontSize: 18, color: colors.greyDarken1 }}>Still waiting customers walk in to you shop?{'\n\n'}
                Why not promote your selling point to your customers? {'\n\n'}
                We provide a place for you to manage your business. {'\n\n'}
                You can promote your business and description to the public. {'\n\n'}
                User can quickly to find the service and item which are the nearest around them.
                </Text>
            </ScrollView>
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.white
    }
});