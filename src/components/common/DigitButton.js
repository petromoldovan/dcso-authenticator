import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';

import {colors} from '../styles';
import {ui} from "../../constants";
import {StyledText} from "./";

class DigitButton extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      pressedBtn: false
    }
  }

  onClick = () => {
    if (this.props.onClick instanceof Function)
      this.props.onClick()
  }

  render() {
    const { digit } = this.props;

    if (digit === ui.empty)
      return <View style={styles.digitBtnPlaceholder} />

    let textStyle = [styles.digitStyle];
    if (this.state.pressedBtn)
      textStyle.push(styles.digitBtnPressed)

    return(
      <TouchableHighlight
        key={`btn-${digit}`}
        underlayColor={colors.white}
        style={styles.digitBtn}
        onHideUnderlay={()=>this.setState(() => ({pressedBtn: false}))}
        onShowUnderlay={()=>this.setState(() => ({pressedBtn: true}))}
        onPress={() => this.onClick(digit)}>
        <StyledText customStyles={textStyle}>{digit}</StyledText>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  digitBtn: {
    height: 76,
    width: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  digitBtnPressed: {
    color: colors.theme,
  },
  digitBtnPlaceholder: {
    height: 76,
    width: 76,
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 10
  },
  digitStyle: {
    color: colors.white,
    fontSize: 20
  },
});

export {DigitButton};
