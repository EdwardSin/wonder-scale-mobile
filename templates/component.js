import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import LoadingSpinner from 'components/modals/LoadingSpinner';
import colors from 'assets/variables/colors';

export default class LatestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
  }

  render() {
    return this.state.loading ? <LoadingSpinner /> : ( <View style={styles.container}>
    <ScrollView></ScrollView>
    </View> );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});