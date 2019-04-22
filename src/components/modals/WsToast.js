import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class WsToast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: new Animated.Value(-100),
            opacity: new Animated.Value(0)
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.message !== nextProps.message  && this.props.message == '') {
            this.state.marginTop.setValue(50);
            Animated.timing(this.state.opacity, { toValue: 1, duration: 100, easing: Easing.ease }).start();
            this.showMessage();
        }
      }
    
    
    showMessage() {
        setTimeout(() => {
            Animated.timing(this.state.marginTop, { toValue: -100, duration: 400, easing: Easing.ease }).start();
            Animated.timing(this.state.opacity, { toValue: 0, duration: 300, easing: Easing.ease }).start(() => {
                this.props.onToast('');
            });
        }, 1300);
    }
    render() {
        return (
            <Animated.View  {...this.props} style={[styles.container, this.props.style, { marginTop: this.state.marginTop, opacity: this.state.opacity }]}>
                <View style={[styles.toashContainer]}>
                    <Text style={styles.toast}>{this.props.message}</Text>
                </View>
            </Animated.View>
        );
    }
}
const mapStateToProps = state => {
    return {
        message: state.toastReducer.message
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ToastAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WsToast);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: '10%',
        alignItems: 'center',
        zIndex: 999,
    },
    toashContainer: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    toast: {
        color: colors.white
    }
});