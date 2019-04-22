import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'assets/variables/colors';
import { Header } from 'components/modals/ws-modals';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { sendReportReview } from 'services/feature';

export default class ReportReviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedReportType: undefined,
            loading: false,
            list: [{
                name: 'Inappropriate content',
                subtitle: 'The review contains promotional, violent, pornographic or any offensive content.'
            }, {
                name: 'Dishonest or hateful content',
                subtitle: 'The review is purposefully malicious and assaulting.'
            }, {
                name: 'Fake content',
                subtitle: 'The review contains false information or may be fake.'
            }
            ]
        }
    }
    render() {
        return <View style={styles.container}>
            <View style={{ paddingVertical: 20 }}>
                <Header>Anonymously report this content</Header>
            </View>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                {this.state.list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.name}
                        subtitle={item.subtitle}
                        titleStyle={{ fontSize: 20 }}
                        subtitleStyle={{ color: colors.grey, paddingVertical: 10 }}
                        containerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.greyLighten3 }}
                        rightIcon={<Ionicons size={35} color={colors.secondary} name={item === this.state.selectedReportType ? 'ios-checkmark-circle' : 'ios-radio-button-off'} />}
                        onPress={() => { this.setState({ selectedReportType: item }) }}
                    />
                ))}
                <ReportButton disabled={this.state.loading}>Report</ReportButton>
            </ScrollView>

        </View>
    }
    // #region Events
    onReviewSubmit = () => {
        if (this.state.selectedReportType != undefined) {
            this.setState({ loading: true });
            sendReportReview({
                review_id: this.props.navigation.state.params.review_id,
                report_type: this.state.selectedReportType.name,
                review_content: this.props.navigation.state.params.content,
                user_email: 'anonymous'
            }, (result) => {
                this.setState({ loading: false });
                this.props.navigation.goBack();
            })
        }
    }
    // #endregion
}

const ReportButton = ({ disabled, children }) => (
    <TouchableOpacity disabled={disabled} onPress={this.onReviewSubmit} style={[styles.reportButton, { opacity: disabled ? .5 : 1, }]}>
        <ActivityIndicator animating={disabled} style={{ paddingRight: 10 }} /><Text style={styles.activityIndicator}>{children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        position: 'relative',
        height: '100%'
    },
    reportButton: {
        backgroundColor: colors.secondary, 
        shadowOffset: { height: 2, width: 0 }, 
        shadowColor: colors.grey, 
        shadowOpacity: 1,
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        borderRadius: 5, 
        paddingHorizontal: 20, 
        paddingVertical: 10,
        flexDirection: 'row'
    },
    activityIndicator: {
        color: colors.white, fontSize: 20
    }

})