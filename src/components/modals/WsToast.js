import colors from 'assets/variables/colors';
import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';


export default class WsToast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: new Animated.Value(-1000),
            opacity: new Animated.Value(0)
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.triggered !== nextProps.triggered) {
            this.state.marginTop.setValue(0);
            this.state.opacity.setValue(1);
            this.showMessage();
        }
      }
    
    
    showMessage() {
        setTimeout(() => {
            Animated.timing(this.state.marginTop, { toValue: -100, duration: 500, easing: Easing.linear }).start();
            Animated.timing(this.state.opacity, { toValue: 0, duration: 500, easing: Easing.linear }).start();
            
        }, 1500);
    }
    render() {
        return (
            <Animated.View  {...this.props}  style={[styles.container, this.props.style, { marginTop: this.state.marginTop, opacity: this.state.opacity }]}>
                <View style={styles.toashContainer}>
                    <Text style={styles.toast}>{this.props.message}</Text>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: '10%',
        alignItems: 'center',
        zIndex: 999,
    },
    toashContainer: {
        backgroundColor: '#222000aa',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5
    },
    toast: {
        color: colors.white
    }
});