import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import useTheame from "@/hooks/useTheame";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useMutation } from "convex/react";
import { addTodos } from "@/convex/todos";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const TodoInput = () => {
  const { colors } = useTheame();
  const homeStyle = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = useMutation(api.todos.addTodos);

  const handelAddTodo = async () => {
    if(newTodo.trim()){
        try {
            await addTodo({text:newTodo.trim()});
            setNewTodo("")
        } catch (error) {
            Alert.alert("Error" , "failed to add todo ");
        }
    }
  };
  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
          style={homeStyle.input}
          placeholder="What Needs to be done ?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handelAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handelAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
            <LinearGradient 
                colors={newTodo.trim()?colors.gradients.primary:colors.gradients.muted}
                style={[homeStyle.addButton,!newTodo.trim() && homeStyle.addButtonDisabled]} >
                    <Ionicons name="add" size={24} color={"#fff"}/>
                </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
