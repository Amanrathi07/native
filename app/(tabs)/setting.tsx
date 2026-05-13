import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useTheame from '@/hooks/useTheame'
import { createSettingsStyles } from '@/assets/styles/setting.styles'

const setting = () => {
  const [isAutoSync , setIsAutoSync] = useState(true)
  const [isNotificationEnable , setIsNotificationEnable] = useState(true)
  
  const {colors,isDarkMode,toggleDarkMode} = useTheame() ;

  const settingTheam = createSettingsStyles(colors) ;
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
