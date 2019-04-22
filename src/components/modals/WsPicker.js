import colors from 'assets/variables/colors';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, DatePickerAndroid, Keyboard, Modal, Picker, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const FORMATS = {
  'value': 'YYYY-MM-DD',
  'valuetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];

export default class WsPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1
    }
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]} {...this.props}>
        <Text>{this.props.title}</Text>
        <WSPickerContent value={this.props.value} style={{ width: '100%', }}
          customStyles={{
            valueInput: { borderWidth: 0, borderBottomWidth: 1, alignItems: 'flex-start', borderColor: colors.greyLighten2 },
            btnTextConfirm: { color: colors.secondary },
            valueText: { fontSize: 18 }
          }}
          items={this.props.items} onValueChange={(value) => this.props.onValueChange(value)} />
        <Text style={styles.errorText}>{this.props.errorText}</Text>
      </View>
    );
  }
}

export class WSPickerContent extends React.Component {
  static defaultProps;
  static propTypes;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true,
      value: props.value,
      index: _.findIndex(props.items, (item) => item['value'] == props.value) | 0
    }

    this.getValue = this.getValue.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.onPressValue = this.onPressValue.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onValuePicked = this.onValuePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }
  render() {
    const { mode, style, customStyles, disabled, minuteInterval, timeZoneOffsetInMinutes,
      cancelBtnText, confirmBtnText, TouchableComponent, testID, cancelBtnTestID,
      confirmBtnTestID, allowFontScaling, locale, items } = this.props;
    const valueInputStyle = [styles.valueInput, customStyles.valueInput,
    disabled && styles.disabled,
    disabled && customStyles.disabled];
    return <TouchableComponent style={[styles.valueTouch, style]}
      underlayColor={'transparent'} onPress={this.onPressValue} testID={testID}>
      <View style={[styles.valueTouchBody, customStyles.valueTouchBody]}>
        {!this.props.hideText ? <View style={valueInputStyle}>{this.getTitleElement()}</View> : <View />}
        {/* 
  // @ts-ignore */}
        {<Modal transparent={true}
          animationType="none"
          visible={this.state.modalVisible}
          supportedOrientations={SUPPORTED_ORIENTATIONS}
          onRequestClose={() => { this.setModalVisible(false); }}
        >
          <View style={{ flex: 1 }}>
            <TouchableComponent
              style={styles.valuePickerMask}
              activeOpacity={1}
              underlayColor={'transparent'}
              onPress={this.onPressMask}
            >
              <TouchableComponent underlayColor={colors.white} style={{ flex: 1 }}>
                <Animated.View style={[styles.valuePickerCon, { height: this.state.animatedHeight }, customStyles.valuePickerCon]}>
                  <Picker selectedValue={this.getValue()} style={[styles.valuePicker, customStyles.valuePicker]}
                    onValueChange={(itemValue, itemIndex) => this.setState({ label: itemValue, index: itemIndex })}>
                    {(items || []).map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                  </Picker>
                  <TouchableComponent
                    underlayColor={'transparent'}
                    onPress={this.onPressCancel}
                    style={[styles.btnText, styles.btnCancel, customStyles.btnCancel]}
                    testID={cancelBtnTestID}
                  >
                    <Text allowFontScaling={allowFontScaling} style={[styles.btnTextText, styles.btnTextCancel, customStyles.btnTextCancel]}>
                      {cancelBtnText}
                    </Text>
                  </TouchableComponent>
                  <TouchableComponent
                    underlayColor={'transparent'}
                    onPress={this.onPressConfirm}
                    style={[styles.btnText, styles.btnConfirm, customStyles.btnConfirm]}
                    testID={confirmBtnTestID}
                  >
                    <Text allowFontScaling={allowFontScaling}
                      style={[styles.btnTextText, customStyles.btnTextConfirm]}
                    >
                      {confirmBtnText}
                    </Text>
                  </TouchableComponent>
                </Animated.View>
              </TouchableComponent>
            </TouchableComponent>
          </View>
        </Modal>}
      </View>
    </TouchableComponent>
  }

  setModalVisible(visible) {
    //this.setState({ modalVisible: visible });
    const { height, duration } = this.props;
    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: height,
          duration: duration
        }
      ).start();
    } else {
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: 0,
          duration: duration
        }
      ).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }
  onPressMask() {
    const { onPressMask } = this.props;
    typeof onPressMask === 'function' ? onPressMask() : this.onPressCancel();
  }
  onPressCancel() {
    const { onCloseModal } = this.props;
    this.setModalVisible(false);

    if (typeof onCloseModal === 'function') {
      onCloseModal();
    }
  }

  onPressConfirm() {
    const { onCloseModal } = this.props;
    this.valuePicked();
    this.setModalVisible(false);

    if (typeof onCloseModal === 'function') {
      onCloseModal();
    }
  }
  onValueChange(value) {
    this.setState({ allowPointerEvents: false, value });
    const timeoutId = setTimeout(() => {
      this.setState({ allowPointerEvents: true });
      clearTimeout(timeoutId);
    }, 200);
  }
  onValuePicked({ action, value }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ value });
      this.valuePicked();
    } else {
      this.onPressCancel();
    }
  }
  onPressValue() {
    if (this.props.disabled) {
      //return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      value: this.getValue(),
      label: this.getLabel()
    });

    this.setModalVisible(true);
  }
  getValue(value = this.props.value) {
    const { items } = this.props;
    const { index } = this.state;
    if ((items || []).length && index > -1) {
      return (items || [])[index].value;
    }
    return value;
  }

  getLabel(label = this.props.label) {
    const { items } = this.props;
    const { index } = this.state;
    if ((items || []).length && index > -1) {
      return (items || [])[index].label;
    }

    return label || (items && items.length) ? items[0].label : '';
  }

  valuePicked() {
    const { onValueChange } = this.props;
    const { value } = this.state;
    if (typeof onValueChange === 'function') {
      onValueChange(this.getValue(value), value);
    }
  }
  getTitleElement() {
    const { value, placeholder, customStyles, allowFontScaling } = this.props;
    if (!value && placeholder) {
      return (
        <Text allowFontScaling={allowFontScaling} style={[styles.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text allowFontScaling={allowFontScaling} style={[styles.valueText, customStyles.valueText]}>
        {this.getLabel()}
      </Text>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textinput: {
    fontSize: 20,
    width: '100%',
    color: colors.greyDarken1
  },
  valueTouch: {
    width: 142
  },
  valueTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueInput: {
    flex: 1,
    height: 40,
    width: '100%',
    borderWidth: 1,
    //borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueText: {
    color: '#333'
  },
  placeholderText: {
    color: '#c9c9c9'
  },
  valuePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  valuePickerCon: {
    backgroundColor: colors.white,
    height: 0,
    borderTopColor: colors.greyLighten2,
    borderTopWidth: 1,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  valuePicker: {
    marginTop: 60,
    borderTopColor: colors.greyLighten2,
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  },
  errorText: {
    color: colors.primary,
    width: '100%',
    paddingHorizontal: '10%',
    textAlign: 'right'
  }
});

WSPickerContent.defaultProps = {
  mode: 'value',
  androidMode: 'default',
  value: '',
  label: '',
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  height: 260,

  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: 'Confirm',
  cancelBtnText: 'Cancel',
  customStyles: {},

  // whether or not show the icon
  showIcon: false,
  disabled: false,
  allowFontScaling: true,
  hideText: false,
  placeholder: '',
  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true
};

WSPickerContent.propTypes = {
  androidMode: PropTypes.oneOf(['spinner', 'default']),
  value: PropTypes.string,
  label: PropTypes.string,
  format: PropTypes.string,
  height: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  iconComponent: PropTypes.element,
  customStyles: PropTypes.object,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  onDateChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onPressMask: PropTypes.func,
  placeholder: PropTypes.string,
  modalOnResponderTerminationRequest: PropTypes.func,
  getLabel: PropTypes.func
};