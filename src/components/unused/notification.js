import colors from 'assets/variables/colors';
import { WsRefreshControl, NotificationLabel, LoadingSpinner } from 'components/modals/ws-modals';
import { Constants } from 'expo';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default class NotificationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
  }

  componentDidMount() {
    var ws = new WebSocket('http://192.168.1.83:3000');

  }

  // getNotifications = () => {
  //   const url = 'http://192.168.1.83:3000/api/notifications/notifications';
  //   this.setState({ loading: true });

  //   AsyncStorage.getItem('ws-token').then((token) => {
  //     fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: token
  //       }
  //     }).then(res => res.json())
  //       .then(result => {
  //         if(result['success']){
  //           this.setState({ shops: result['result']});
  //         }
  //         this.setState({ loading: false });
  //       })
  //   });
  // }
  render() {
    return this.state.loading ? <LoadingSpinner /> : (
      <View style={styles.container}>
        <FlatList data={[{ id: '1', name: 'Edward Sin', description: 'This is my notification', profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1530026095/env_development/shop.png', date: new Date().toDateString() },
        {
          id: '2',
          name: 'Edward Sin', description: 'This is my notification', profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1530026095/env_development/shop.png', date: new Date().toDateString(),
          read: true
        },
        { id: '3', name: 'Edward Sin', description: 'This is my notification', profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1530026095/env_development/shop.png', date: new Date().toDateString() },
        { id: '4', name: 'Edward Sin', description: 'This is my notification', profile_image: 'https://res.cloudinary.com/hdpveefqg/image/upload/v1530026095/env_development/shop.png', date: new Date().toDateString(), read: true }]}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) =>
            <NotificationLabel item={item}></NotificationLabel>
          }
          refreshControl={<WsRefreshControl refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)} />}
        />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 2000);
    })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Constants.statusBarHeight
  }
});