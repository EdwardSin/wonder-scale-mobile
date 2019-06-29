import AntDesign from '@expo/vector-icons/AntDesign';
import colors from 'assets/variables/colors';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { removeShopReview } from 'services/http/auth-user/review';

export default class ReviewCard extends React.Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.func,
        flip: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            flip: false,
        }
    }
    render() {
        const { item, onReportPress } = this.props;
        const { flip } = this.state;
        return (
            <View {...this.props} style={[styles.container, this.props.style, { alignItems: 'center' }]}>
                <View style={{
                    width: '100%', paddingHorizontal: 10, paddingVertical: 20, borderColor: colors.greyLighten3, borderBottomWidth: 1,
                    backgroundColor: colors.white
                }}>
                    <TouchableOpacity onPress={this.onPress}>
                        <View style={{ shadowOpacity: 0, width: '100%', flexDirection: 'row', paddingBottom: flip ? 20 : 0 }}>
                            <View style={{ width: 80, alignItems: 'center' }}>
                                {item.user_id != undefined && <Image style={{ width: 60, height: 60, borderRadius: 30 }} source={{ uri: item.user_id.profile_image }} />}
                            </View>
                            <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                                {item.user_id != undefined && <Text style={{ fontSize: 18 }}>{item.user_id.first_name} {item.user_id.last_name}</Text>}
                                <Text style={{ marginVertical: 3 }}>{moment(item.updated_at).fromNow()}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {_.times(item.rating, (i) => (<AntDesign key={i} style={{ width: 17 }} size={18} name={'star'} color={colors.main} />))}
                                    {_.times(5 - item.rating, (i) => (<AntDesign key={i} style={{ width: 17 }} size={18} name={'staro'} color={colors.secondary} />))}
                                </View>


                                {/* {!flip && <AntDesign color={colors.greyDarken3} size={25} name={'ellipsis1'} />} */}
                            </View>
                            {/* <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20}}>
                                <TouchableOpacity onPress={onReportPress}>
                                    <Feather name={'flag'} size={30} color={colors.secondary} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 16 }}>{item.content}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                        {/* { this.props.isSignedIn &&  */}
                        <Text style={{ marginRight: 20, fontSize: 15, color: colors.main }} onPress={() => { this.onReviewRemove() }}>Remove</Text>
                        {/* } */}
                        <Text style={{ fontSize: 15, color: colors.main }} onPress={() => { this.props.navigation.navigate('ReportReview', { transition: 'forVertical', content: item.content, review_id: item._id }) }}>Report</Text>
                    </View>
                    {flip &&
                        (
                            <View>
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: 16 }}>{item.content}</Text>
                                </View>
                            </View>)}
                    {item.reply && (
                        <View>
                            <Divider style={{ width: '100%', marginVertical: 10, backgroundColor: colors.greyLighten2 }} />
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Reply: {item.reply}</Text>
                            </View>
                        </View>)}
                </View>
            </View>
        );
    }
    onPress = () => {
        this.setState({ flip: !this.state.flip })
    }
    onReviewRemove = () => {
        Alert.alert('Confirmation', 'Are you sure to remove review?',
            [{ text: 'No', onPress: () => { } },
            {
                text: 'Yes', onPress: () => {
                    removeShopReview({ review_id: this.props.item._id }, (result) => {
                        this.props.removeCallback();
                        // confirm and remove from list
                    })
                }
            }
            ])

    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 15
    }
});