import { api } from "@/convex/_generated/api";
import useTheame from "@/hooks/useTheame";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Index() {
  const { toggleDarkMode } = useTheame();

  const todos = useQuery(api.todos.getTodos);
  console.log(todos)

  const addTodos = useMutation(api.todos.addTodos)
  return (
    <View style={style.container}>
      <Text>working</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Togle Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>addTodos({text:"todo1"})}>
        <Text>add todo</Text>
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
