import React from 'react';
import { Text } from 'react-native';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Text style={{ fontSize: 25, paddingHorizontal: 20, fontWeight: 'bold', alignSelf: 'center' }}>{this.props.children}</Text>
    }
}