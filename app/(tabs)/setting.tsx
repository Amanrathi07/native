import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const setting = () => {
  return (
    <View style={style.container}>
      <Text>setting page</Text>
    </View>
  )
}

const style = StyleSheet.create({
     container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
})
export default setting
