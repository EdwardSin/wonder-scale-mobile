import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import colors from 'assets/variables/colors';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';


export default class ReviewCard extends React.Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.func,
        flip: PropTypes.bool
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { item, onPress, flip, onReportPress } = this.props;
        return (
            <View {...this.props} style={[styles.container, this.props.style, { alignItems: 'center', padding: 10 }]}>
                <View style={{
                    width: '100%', padding: 10, borderRadius: 5,
                    paddingTop: 20, paddingBottom: 20, borderColor: colors.white,
                    backgroundColor: colors.greyLighten4, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowColor: colors.greyLighten2
                }}>
                    <TouchableOpacity onPress={onPress}>
                        <View style={{ shadowOpacity: 0, width: '100%', flexDirection: 'row', paddingBottom: flip ? 20 : 0 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{ uri: item.profile_image }} />
                            </View>
                            <View style={{ alignItems: 'center', flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={{ fontSize: 18 }}>{item.first_name} {item.last_name}</Text>
                                <Text style={{ marginBottom: 3, marginTop: 3 }}>{moment(item.reviews[0].updated_at).fromNow()}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {_.times(item.reviews[0].rating, (i) => (<AntDesign key={i} style={{ width: 19 }} size={20} name={'star'} color={colors.main} />))}
                                    {_.times(5 - item.reviews[0].rating, (i) => (<AntDesign key={i} style={{ width: 19 }} size={20} name={'staro'} color={colors.secondary} />))}
                                </View>
                                {!flip && <AntDesign color={colors.greyDarken3} size={25} name={'ellipsis1'} />}
                            </View>

                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={onReportPress}>
                                    <Ionicons name={'ios-flag'} size={30} color={colors.main} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {flip &&
                        (
                            <View>
                                <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: colors.greyLighten2 }} />
                                <View style={{ padding: 10, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>{item.reviews[0].content}</Text>
                                </View>
                            </View>)}
                    {item.reply && (
                        <View>
                            <Divider style={{ width: '100%', marginTop: 10, marginBottom: 10, backgroundColor: colors.greyLighten2 }} />
                            <View style={{ padding: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>Reply: {item.reviews[0].reply}</Text>
                            </View>
                        </View>)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    }
});