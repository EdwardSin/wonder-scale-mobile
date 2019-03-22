import colors from 'assets/variables/colors';
import sizes from 'assets/variables/sizes';
import { LatestCard, LoadingSpinner, WsStatusBar, WsRefreshControl } from 'components/modals/ws-modals';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getNewsFeed } from 'services/auth/auth-user';

export default class LatestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shops: [],
      page: 1,
      seed: 1,
      refreshing: false
    };
  }

  componentDidMount() {
    this.getNewsFeed();
  }

  getNewsFeed = () => {
    this.setState({ loading: true });
    getNewsFeed((result) => {
      result['result'].forEach(shop => {
        shop.isFollow = true;
      });
      this.setState({ loading: false, shops: result['result'], refreshing: false })
    });
  }

  render() {
    return this.state.loading ? <LoadingSpinner /> : (
      <View style={{ flex: 1 }}>
        <WsStatusBar />
        <View style={styles.container}>
          <FlatList data={this.state.shops}
            keyExtractor={(item, index) => item._id}
            ListEmptyComponent={<EmptyList />}
            renderItem={({ item }) =>
              <LatestCard navigation={this.props.navigation} item={item}></LatestCard>
            }
            refreshControl={<WsRefreshControl refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)} />
            }
          />
        </View>
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => {
      this.getNewsFeed();
    })
  }
}


const EmptyList = () =>
  (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
    <Text style={{ textAlign: 'center', marginTop: '50%' }}>No item displayed!</Text>
  </View>)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  text: {
    fontSize: sizes.fontsize3,
    color: colors.grey
  }
});