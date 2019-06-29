import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ToastAction from 'actions/toast-reducer.action';
import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, ReviewCard, Title, WsRefreshControl, WsStatusBar } from 'components/modals/ws-modals';
import _ from 'lodash';
import React from 'react';
import { Dimensions, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addShopReview } from 'services/http/auth-user/review';
import { getShopReviewById, getShopReviewRating } from 'services/http/public/review';
const { width, height } = Dimensions.get('window');

class PublicShopReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      addReviewModalVisible: false,
      reviewRating: 0,
      rating: 0,
      comment: '',
      reviews: [],
      shop_id: this.props.shop_id
    }
  }

  componentDidMount() {
    this.getShopReviewRating();
    this.getShopReviewById();
  }
  render() {
    const { loading, rating, refreshing, reviews } = this.state;
    return (
      loading ? <LoadingSpinner /> :
        (<View style={styles.container}>
          <WsStatusBar />
          <View style={{ flexDirection: 'row' }}>
            <Title style={{ paddingLeft: 20, paddingRight: 10 }}>Reviews</Title>
            <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
              {_.times(rating, (i) => (<AntDesign key={i} style={{ width: 25 }} size={25} name={'star'} color={colors.main} />))}
              {_.times(5 - rating, (i) => (<AntDesign key={i} style={{ width: 25 }} size={25} name={'staro'} color={colors.secondary} />))}
            </View>
            {/* {this.props.isSignedIn && <AddReviewButton onPress={() => { this.setState({ addReviewModalVisible: true }) }} />} */}
            <AddReviewButton onPress={() => { this.setState({ addReviewModalVisible: true }) }} />
          </View>
          <ScrollView refreshControl={<WsRefreshControl refreshing={refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
            {reviews.length > 0 ? reviews.map((review, index) =>
              <ReviewCard key={index} isSignedIn={this.props.isSignedIn} navigation={this.props.navigation} item={review}
                removeCallback={this.getShopReviewById} />
            ) : <EmptyList message={'No Review!'} />
            }
          </ScrollView>
          {this.renderAddReviewModal()}
        </View>)
    );
  }
  // #region Events
  onReviewSubmit = () => {
    if (this.state.reviewRating > 0 && this.state.comment != '') {
      addShopReview({
        shop_id: this.state.shop_id,
        rating: this.state.reviewRating,
        content: this.state.comment
      }, (result) => {
        this.setState({ rating: 0, content: '', addReviewModalVisible: false })
      })
    }
    else {
      this.props.onToast('Rating or comment is not filled!');
    }
  }
  // #endregion
  renderAddReviewModal = () => (
    <Modal onRequestClose={() => { }} visible={this.state.addReviewModalVisible} transparent animationType={'fade'}>
      <TouchableOpacity activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,.5)', width, height, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ maxWidth: 350, width: '80%', backgroundColor: colors.greyLighten4, shadowColor: 'rgba(0,0,0,.16)', padding: 10, shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }, paddingTop: 20 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
              <StarRating buttonStyle={{ paddingHorizontal: 5 }} starSize={30} emptyStarColor={colors.secondary} fullStarColor={colors.gold} rating={this.state.reviewRating} selectedStar={(value) => { this.setState({ reviewRating: value }) }} />
            </View>
            <ScrollView style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
              <TextInput style={{ height: 120, backgroundColor: colors.white, shadowColor: 'rgba(0,0,0,.16)', shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }, fontSize: 20, paddingHorizontal: 10 }}
                multiline placeholder={'Leave your comment...'} onChangeText={(value) => { this.setState({ comment: value }) }} />
            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', paddingVertical: 10 }}>
              <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'center', shadowColor: 'rgba(0,0,0,.16)', shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }, marginRight: 5, backgroundColor: colors.secondary }} onPress={this.onReviewSubmit}>
                <Text style={{ color: colors.white }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'center', shadowColor: 'rgba(0,0,0,.16)', shadowOpacity: 1, shadowOffset: { width: 0, height: 3 }, marginLeft: 5, backgroundColor: colors.main }} onPress={() => { this.setState({ addReviewModalVisible: false }) }}>
                <Text style={{ color: colors.white }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>)
  getShopReviewById = () => {
    this.setState({ loading: true });
    getShopReviewById(this.state.shop_id, (result) => {
      this.setState({ reviews: result.result, loading: false, refreshing: false });
    })
  }
  getShopReviewRating = () => {
    getShopReviewRating(this.state.shop_id, (result) => {
      this.setState({ rating: result.result });
    })
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getShopReviewById();
    })
  }
}

const AddReviewButton = ({ onPress, }) => (
  <TouchableOpacity onPress={onPress} style={styles.addReviewButton}>
    <Ionicons name={'ios-add'} color={colors.white} size={35} style={{ height: 35 }} />
  </TouchableOpacity>
)

const mapStateToProps = state => {
  return {
    isSignedIn: state.userReducer.isSignedIn,
    shop_id: state.shopReducer.shop_id
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...ToastAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicShopReview);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addReviewButton: {
    marginLeft: 'auto',
    marginRight: 20,
    marginTop: 15,
    backgroundColor: colors.secondary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowOffset: { width: 2, height: 1 },
    shadowColor: colors.grey,
    shadowOpacity: 1
  },
  linkButton: {
    fontSize: 20, color: colors.blue
  }
});