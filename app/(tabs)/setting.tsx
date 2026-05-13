import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheame from '@/hooks/useTheame'
import { createSettingsStyles } from '@/assets/styles/setting.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import ProgressStats from '@/components/ProgressStats'

const setting = () => {
  const [isAutoSync , setIsAutoSync] = useState(true)
  const [isNotificationEnable , setIsNotificationEnable] = useState(true)
  
  const {colors,isDarkMode,toggleDarkMode} = useTheame() ;

  const settingStyles = createSettingsStyles(colors) ;
  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container} >
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.titleContainer}>
          <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
            <Ionicons name='settings' size={28} color={"#ff"} />
          </LinearGradient>
          <Text style={settingStyles.title}>Settings</Text>
        </View>

        <ScrollView style={settingStyles.scrollView} contentContainerStyle={settingStyles.content} showsVerticalScrollIndicator={false}>
          <ProgressStats />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}


export default setting
