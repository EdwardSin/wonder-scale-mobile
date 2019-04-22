import colors from 'assets/variables/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';


export default class WsRefreshControl extends React.Component {
  static propTypes = {
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { refreshing, onRefresh } = this.props
    return (
      <RefreshControl {...this.props}
        refreshing={refreshing}
        onRefresh={onRefresh}
        title="Pull to refresh"
        titleColor={colors.grey}
      />
    );
  }
}

const styles = StyleSheet.create({
});