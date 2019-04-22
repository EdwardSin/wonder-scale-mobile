import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'assets/variables/colors';
import WsStatusBar from 'components/modals/WsStatusBar';
import { BottomButton, LoadingSpinner } from 'components/modals/ws-modals';
import environments from 'environments/environment';
import moment from 'moment';
import React from 'react';
import { Animated, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { claimVoucher } from 'services/auth-user/voucher';
import { getPromotionById } from 'services/promotions';

const { height } = Dimensions.get('window');
const Header = ({ label }) => (
    <Text style={{ fontSize: 25, paddingHorizontal: 20, fontWeight: 'bold' }}>{label}</Text>
)

export default class PromotionDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            claimed: false,
            isTermsAndConditionsModalVisible: false,
            scrollY: new Animated.Value(0),
            promotion_id: environments.promotion_id,//this.props.navigation.state.params.promotion_id,
            promotion: {}
        }
    }

    componentDidMount() {
        this.getPromotionById();
    }

    getPromotionById = () => {
        getPromotionById(this.state.promotion_id, (result) => {
            this.setState({ promotion: result, loading: false, refreshing: false });
        })
    }
    render() {
        const { loading, promotion, claimed } = this.state;
        return (
            loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <WsStatusBar />
                    <ScrollView>
                        <Image style={styles.image} source={{ uri: environments.IMAGE_URL + promotion.profile_image }} />
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{promotion.title}</Text>
                            <Text style={{ fontSize: 15, paddingVertical: 20 }}>
                                {moment(promotion.start_date).format('DD MMM YYYY')} - {moment(promotion.expiry_date).format('DD MMM YYYY')}
                            </Text>
                            <Divider />
                            <Text style={{ fontSize: 15, paddingVertical: 20 }}>{promotion.description}</Text>
                            <Divider />
                            {promotion.is_term_and_condition && promotion.term_and_condition.length > 0 && 
                                <Text style={{ fontSize: 15, paddingVertical: 20 }} onPress={this.openModal}>Terms & Conditions</Text>}
                        </View>
                    </ScrollView>
                    {this.renderPromotionModal()}
                    <BottomButton disabled={claimed} onPress={this.onClaimPress}>Claim</BottomButton>
                </View>)
        );
    }
    renderPromotionModal = () => (
        <Modal animationType={'slide'} visible={this.state.isTermsAndConditionsModalVisible}>
            <TouchableOpacity style={{ zIndex: 3, position: 'absolute', top: 30, right: 20 }} onPress={() => { this.setState({ isTermsAndConditionsModalVisible: false }) }} >
                <Ionicons name={'ios-close-circle-outline'} size={35} color={colors.secondary} />
            </TouchableOpacity>
            <WsStatusBar />
            <View style={{ paddingTop: 20 }} >
                <Header label={'Terms and Conditions'} />
            </View>
            <ScrollView style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
                <Text>
                    {this.state.promotion.term_and_condition}
                </Text>
            </ScrollView>
        </Modal>
    )
    openModal = () => {
        this.setState({
            isTermsAndConditionsModalVisible: true
        })
    }
    onClaimPress = () => {
        claimVoucher(this.state.promotion_id, result => {
            this.setState({ claimed: true })
        })
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getPromotionById();
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: height / 2
    }
});