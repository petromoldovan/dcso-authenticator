import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import get from 'lodash/get'
import {Header} from '../common/index'
import {colors} from '../styles/index'

const Index = ({navigation, userAccounts, renderAddAccountButton, renderUserAccounts}) => {
  if (get(navigation, 'state.params.hasRegisteredAccount') || userAccounts.length !== 0)
    return (
      <View style={styles.flex}>
        <Header
          title={"Account"}
          hasBackButton={false} />
        <View style={styles.ContentContainer}>
          <ScrollView style={styles.flex}>
            <View style={styles.AccountList}>
              {renderUserAccounts()}
            </View>
            <View style={styles.AddNewAccount}>
              {renderAddAccountButton(true)}
            </View>
          </ScrollView>
        </View>
      </View>
    )

  return (
    <View style={styles.ContainerRegistration}>
      {renderAddAccountButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex:1
  },
  ContentContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  AddNewAccount: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 25
  },
  AccountList: {
    //marginTop: 20,
  },
  ContainerRegistration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.theme,
  }
})

export default Index
