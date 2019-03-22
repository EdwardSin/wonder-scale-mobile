import AntDesign from '@expo/vector-icons/AntDesign';
import colors from 'assets/variables/colors';
import WsStatusBar from 'components/modals/WsStatusBar';
import { EmptyList, LoadingSpinner, ReviewCard, WsRefreshControl } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import _ from 'lodash';
import React from 'react';
import { Constants } from 'expo';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getReviewById } from 'services/auth/review';


const Header = ({ label }) => (
  <Text style={{ fontSize: 25, paddingLeft: 20, paddingRight: 20, fontWeight: 'bold' }}>{label}</Text>
)

export default class PublicShopReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      scrollY: new Animated.Value(0),
      refreshing: false,
      flip: false,
      reviews: [],
      reviewId: environments.review_id //this.props.navigation.state.params.shopId
    }
  }

  componentDidMount() {
    this.getReviewById();
  }

  getReviewById = () => {
    this.setState({ loading: true });
    getReviewById(this.state.reviewId, (result) => {
      this.setState({ reviews: result.result, loading: false, refreshing: false });
    })
  }  

  render() {
    return (
      this.state.loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
        <View style={{height: Constants.statusBarHeight}}></View>
          <ScrollView refreshControl={<WsRefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)}/>}>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <Header label={'Review'} />
            <View style={{ flexDirection: 'row' }}>
              {_.times(this.state.reviews[0].reviews[0].rating, (i) => (<AntDesign style={{ width: 30 }} size={30} name={'star'} color={colors.main} />))}
              {_.times(5 - this.state.reviews[0].reviews[0].rating, (i) => (<AntDesign style={{ width: 30 }} size={30} name={'staro'} color={colors.secondary} />))}
            </View>
          </View>
            { this.state.reviews.length > 0 && 
                  <ReviewCard item={this.state.reviews[0]} 
                      onPress={() => { this.setState({ flip: !this.state.flip }) }} 
                      onReportPress={() => { console.log('Open Modal'); }}
                      flip={this.state.flip} />}
            { !this.state.reviews.length && <EmptyList textStyle={{fontSize: 18}} containerStyle={{marginTop: '10%'}} message={'No Review!'}/>}
          </ScrollView>
        </View>)
    );
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getReviewById();
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});