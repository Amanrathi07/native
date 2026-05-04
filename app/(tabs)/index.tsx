import useTheame from "@/hooks/useTheame";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheame();
  return (
    <View style={style.container}>
      <Text>working</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Togle Mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
