import colors from 'assets/variables/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class WsDateTimePicker extends React.Component {
  constructor(state) {
    super(state);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let ddAsString = '';
    let mmAsString = '';
    if (dd < 10) {
      ddAsString = '0' + dd
    }

    if (mm < 10) {
      mmAsString = '0' + mm
    }
    this.state = {
      year: yyyy,
      date: dd,
      month: mm,
      birthday: dd + "/" + mm + "/" + (yyyy - 1)
    }
  }
  render() {
    return (
      <View  {...this.props} style={[styles.container, this.props.style]}>
        <DatePicker {...this.props.datePicker} style={[styles.datePicker]}
          customStyles={{ dateInput: { borderWidth: 0 }, btnTextConfirm: { color: colors.secondary } }}
          date={this.props.date}
          mode="date"
          androidMode="spinner"
          showIcon={false}
          placeholder="Birthday"
          format="DD/MM/YYYY"
          minDate={"01/01/1920"}
          maxDate={this.state.date + "/" + this.state.month + "/" + this.state.year}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(birthday) => { this.props.onDateChanged(birthday) }} />
        <Text style={styles.errorText}>{this.props.errorText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  datePickerView: {
  },
  datePicker: {
    width: '100%',
    paddingHorizontal: '10%',
    backgroundColor: colors.greyLighten3,
    borderRadius: 5,
    paddingVertical: 10
  },
  errorText: {
    color: colors.primary,
    width: '100%',
    paddingHorizontal: '10%',
    textAlign: 'right'
  }
});