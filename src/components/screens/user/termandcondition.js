import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FileSystem from 'react-native-filesystem';

export default class TermAndConditionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.getTermAndCondition();
    }
    getTermAndCondition = async (MyPath) => {
        try {
            const path = MyPath + "/term_and_condition.txt";
            const contents = await FileSystem.readFile(path);
            return ("" + contents);
        } catch (e) {
            alert("" + e);
            return;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.getTermAndCondition('../../assets/upload')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flexWrap: 'wrap'
    }
});