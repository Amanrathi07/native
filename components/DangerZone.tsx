import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import useTheame from "@/hooks/useTheame";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { Ionicons } from "@expo/vector-icons";

const DangerZone = () => {
  const { colors } = useTheame();
  const settingStyles = createSettingsStyles(colors);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handelResetApp = async () => {
    Alert.alert(
      "Reset App",
      "🚨 This will delete All your todos Permanenrly . This action cannot be undone",
      [
        { text: "Cancle", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                `App Reset" , "Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}.Your app has been reset.`,
              );
            } catch (error) {
              console.log("Error deleting all todos", error);
              Alert.alert("Error", "Failed to reset app");
            }
          },
        },
      ],
    );
  };
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
      <Text style={settingStyles.sectionTitleDanger}>DangerZone</Text>

      <TouchableOpacity
        style={[settingStyles.actionButton ,{borderBottomWidth:0}]}
        onPress={handelResetApp}
        activeOpacity={0.7}
        >
            <View style={settingStyles.actionLeft}>
                <LinearGradient colors={colors.gradients.danger} style={settingStyles.actionIcon}>
                    <Ionicons name="trash" size={18} color={"#fff"} />
                </LinearGradient>
                <Text style={settingStyles.actionTextDanger}>Reset App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={"#fff"} />
        </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
