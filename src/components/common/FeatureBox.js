import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {colors} from '../styles';
import {StyledText} from "./";


const FeatureBox = ({disabled, title, onPress, img}) => {
  return (
    <TouchableOpacity style={styles.boxStyle} onPress={onPress} disabled={disabled}>
      <View style={styles.imageCont}>
        <Image style={styles.imageStyle} source={img}/>
      </View>
      <View style={styles.titleCont}>
        <StyledText customStyles={styles.titleStyle}>
          {title.toUpperCase()}
        </StyledText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boxStyle: {
    flex: 0.45,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    borderColor: colors.font,
    borderWidth: 2,
    marginTop: 20
  },
  imageStyle: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
  },
  imageCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  titleStyle: {
    color: colors.font,
    fontWeight: "700",
    fontSize: 10,
    textAlign: 'center',
  },
  titleCont: {
    marginTop: 15,
    alignContent: 'center',
  }
})

export {FeatureBox};
