import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {colors, textStyles} from '../styles'
import arrowIcon from '../../assets/arrow-next.png'
import {StyledText} from "./";

const Header = ({hasBackButton, title, transparent, navigation, onBeforeReturn, small}) => {
  let containerStyle = [styles.headerCont];
  let textStyle = [styles.textStyle];
  let titleContainerStyle = [styles.titleCont];
  let imgCont = [styles.imgCont]
  if (transparent) {
    containerStyle.push(styles.headerContTransparent)
    textStyle.push(styles.textStyleTransparent)
    titleContainerStyle.push(styles.titleStyleTransparent)
  }

  if (small) {
    containerStyle.push(styles.headerContSmall)
    textStyle.push(styles.textStyleTransparent)
    titleContainerStyle.push(styles.titleStyleTransparent)
    imgCont.push(styles.ImgContSmall)
  }

  return (
    <View style={containerStyle}>
      {
        hasBackButton
          ? <TouchableOpacity style={imgCont} onPress={() => {
            if (onBeforeReturn) onBeforeReturn()
            navigation.navigate('IndexScreen')
          }} >
            <Image style={styles.imgStyle} source={arrowIcon} />
          </TouchableOpacity>
          : <View style={styles.imgCont} />
      }
      <View style={titleContainerStyle}>
        <StyledText customStyles={textStyle}>
          {title}
        </StyledText>
      </View>
      {
        (transparent || small) && <View style={styles.flex}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  titleCont: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  titleStyleTransparent: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgCont: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerCont: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
    justifyContent: 'space-between',
    backgroundColor: colors.theme,
    height: 180,
  },
  headerContTransparent: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 100,
  },
  headerContSmall: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  imgStyle: {
    transform: [{ rotate: '180deg'}],
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  ImgContSmall: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  textStyle: {
    //fontFamily: 'Lato-Medium',
    textAlign: 'center',
    color: textStyles.header.color,
    fontSize: textStyles.header.fontSize,
    letterSpacing: textStyles.header.letterSpacing,
  },
  textStyleTransparent: {
    fontSize: 20
  }
})

export {Header}
