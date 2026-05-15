import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import useTheame from "@/hooks/useTheame";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnable, setIsNotificationEnable] = useState(true);

  const { colors, isDarkMode, toggleDarkMode } = useTheame();
  const settingStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
      <Text style={settingStyles.sectionTitle}>Preferences</Text>

      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}>
                <Ionicons name="moon" size={18} color={"#fff"}/>
            </LinearGradient>
            <Text style={settingStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch 
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={"#fff"}    
            trackColor={{false:colors.border,true:colors.primary}}        
            />
      </View>

      {/* notification */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
            <LinearGradient colors={colors.gradients.warning} style={settingStyles.settingIcon}>
                <Ionicons name="notifications" size={18} color={"#fff"}/>
            </LinearGradient>
            <Text style={settingStyles.settingText}>Notifications</Text>
        </View>
        <Switch 
            value={isNotificationEnable}
            onValueChange={()=>setIsNotificationEnable(!isNotificationEnable)}
            thumbColor={"#fff"}    
            trackColor={{false:colors.border,true:colors.warning}}        
            />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
