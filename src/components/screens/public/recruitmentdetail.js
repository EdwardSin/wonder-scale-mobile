import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ShopAction from 'actions/shop-reducer.action';
import colors from 'assets/variables/colors';
import { Currency } from 'assets/variables/currency';
import { BottomButton, LoadingSpinner, Title } from 'components/modals/ws-modals';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecruitmentById } from 'services/recruitment';


const currency = new Currency();
class RecruitmentDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            recruitment_id: this.props.navigation.state.params.recruitment_id,
            recruitment: {}
        }
    }

    componentDidMount() {
        this.getRecruitmentById();
    }
    render() {
        const { loading, recruitment } = this.state;
        return (
            loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <ScrollView>
                        <View style={{ padding: 20 }}>
                            <Title>{recruitment.job_title}</Title>
                            <Divider />
                            <Text style={{ fontSize: 15, paddingVertical: 20 }}>{recruitment.job_description}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, paddingVertical: 20 }}>{recruitment.requirement}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, paddingVertical: 20, color: colors.blue }}>{this.getWorkingHours(recruitment.working_hours, recruitment.working_hours_other)}</Text>
                            <Divider />
                            <Text style={{ fontSize: 15, paddingVertical: 20 }}>Salary: {currency.currencySymbols[recruitment.currency]} {recruitment.salary}</Text>
                            <Divider />
                            <Title>{'Contact Details'}</Title>
                            <TouchableOpacity onPress={() => { Linking.openURL(`telprompt:${recruitment.contact_tel}`) }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                    <FontAwesome name={'phone'} style={{ paddingHorizontal: 10 }} size={15} />
                                    <Text style={{ fontSize: 15 }}>{recruitment.contact_tel}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${recruitment.contact_email}`) }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                    <FontAwesome style={{ paddingHorizontal: 10 }} name={'globe'} size={20} />
                                    <Text style={{ fontSize: 15 }}>{recruitment.contact_email}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                <FontAwesome style={{ paddingHorizontal: 10 }} name={'user'} size={20} />
                                <Text style={{ fontSize: 15 }}>{recruitment.contact_person}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <BottomButton onPress={() => {this.navigateToShop(this.state.recruitment.shop_id)}}>Enter To Shop</BottomButton>
                </View>)
        );
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getRecruitmentById();
        })
    }
    getRecruitmentById = () => {
        getRecruitmentById(this.state.recruitment_id, (result) => {
            this.setState({ recruitment: result, loading: false, refreshing: false });
        })
    }
    navigateToShop(shop_id) {
        console.log('here');
        this.props.onSelectedShopId(shop_id);
        this.props.navigation.navigate("FrontShop");
    }
    getWorkingHours(working_hours, working_hours_other) {
        switch (working_hours) {
            case 'shift_required':
                return 'Regular hours, Mondays - Fridays';
            case 'regular_hours':
                return 'Regular hours';
            case 'normal_shift':
                return 'Normal Shift or 12-hours Rotating Shift';
            case 'others':
                return working_hours_other;
        }
    }
}

const mapStateToProps = state => {
    return {};
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ...ShopAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentDetailScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});