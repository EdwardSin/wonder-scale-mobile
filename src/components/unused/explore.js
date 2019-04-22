import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class ExploreScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    render(){
        return (<View></View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    }
});