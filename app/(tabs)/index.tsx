import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheame, { ColorScheme } from "@/hooks/useTheame";
import { useMutation, useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text } from "react-native";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheame();

  
  const todos = useQuery(api.todos.getTodos)

  const homeStyle = createHomeStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView>
        <Header />
        <TodoInput />
        {todos?.map((todo)=>(
          <Text key={todo._id}>{todo.text}</Text>
        ))}
      </SafeAreaView>
    </LinearGradient>
  );
}
