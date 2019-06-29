import colors from 'assets/variables/colors';
import { EmptyList, LoadingSpinner, Title, WsRefreshControl } from 'components/modals/ws-modals';
import WsStatusBar from 'components/modals/WsStatusBar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { getRecruitmentByShopId } from 'services/http/public/recruitment';


const RecruitmentCard = ({ index, item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.item]}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>{item.job_title}</Text>
                <Divider />
                <Text ellipsizeMode={'tail'} numberOfLines={2} style={{ fontSize: 15, paddingVertical: 10 }}>{item.job_description}</Text>
                <Text ellipsizeMode={'tail'} numberOfLines={2} style={{ fontSize: 15, paddingVertical: 10 }}>{item.requirement}</Text>
                <Text style={{ fontSize: 15, paddingTop: 10, color: colors.blue }}>{getWorkingHours(item.working_hours, item.working_hours_other)}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

function getWorkingHours(working_hours, working_hours_other) {
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


class ShopRecruitmentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            recruitments: []
        }
    }

    componentDidMount() {
        this.getRecruitmentByShopId();
    }

    getRecruitmentByShopId = () => {
        getRecruitmentByShopId(this.props.shop_id, (result) => {
            this.setState({ recruitments: result['result'], loading: false, refreshing: false });
        })
    }

    render() {
        const { recruitments, refreshing, loading } = this.state;
        return (
            loading ? <LoadingSpinner /> :
                (<View style={styles.container}>
                    <WsStatusBar />
                    <Title style={{paddingHorizontal: 20}}>Recruitment</Title>
                    <ScrollView refreshControl={<WsRefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}>
                        { recruitments.length > 0 ? recruitments.map((recruitment, index) =>
                            <View style={{ marginBottom: 5 }}>
                                <RecruitmentCard key={index} index={index} item={recruitment} onPress={() => { this.navigateToRecruitmentDetail(recruitment) }} />
                            </View>) :
                            <EmptyList message={'No Recruitment!'} />
                        }
                    </ScrollView>
                </View>)
        );
    }
    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getRecruitmentByShopId();
        })
    }
    navigateToRecruitmentDetail = (recruitment) => {
        this.props.navigation.navigate('RecruitmentDetail', { recruitment_id: recruitment._id })
    }
}

const mapStateToProps = state => {
    return {
        shop_id: state.shopReducer.shop_id
    }
}

export default connect(mapStateToProps)(ShopRecruitmentScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.greyLighten2,
        flex: 1,
    },
});