import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheame, { ColorScheme } from "@/hooks/useTheame";
import { useMutation, useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StatusBar, Text } from "react-native";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpiner from "@/components/LoadingSpiner";

export default function Index() {
  const { toggleDarkMode, colors } = useTheame();
  const todos = useQuery(api.todos.getTodos)
  const isLoading = todos === undefined ;

  if(isLoading) return <LoadingSpiner />

  const homeStyle = createHomeStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView>
        <Header />
        <TodoInput />
        
      </SafeAreaView>
    </LinearGradient>
  );
}
