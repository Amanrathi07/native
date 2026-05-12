import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheame, { ColorScheme } from "@/hooks/useTheame";
import { useMutation, useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  FlatListComponent,
  StatusBar,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpiner from "@/components/LoadingSpiner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">;

export default function Index() {
  const [editingId, SetEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, SetEditText] = useState("");

  const { toggleDarkMode, colors } = useTheame();
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;
  const toggelTodo = useMutation(api.todos.toggleTodo);
  const handelToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggelTodo({ id });
    } catch (error) {
      console.log("Error toggling todo ", error);
      Alert.alert("Error", "Failed to toogle todo");
    }
  };

  const updateTodo = useMutation(api.todos.updateTodo);
  const handelEditTodo = async (todo: Todo) => {
    SetEditText(todo.text);
    SetEditingId(todo._id);
  };
  const handelSaveTodo = async () => {
    if (!editingId) return;
    if(editText.trim()=='') {
      return Alert.alert("Error", "provide some todo");
    }
    try {
      await updateTodo({ id: editingId, text: editText.trim() });
    } catch (error) {
      console.log("Error updating todo", error);
      Alert.alert("Error", "Failed to update todo");
    } finally {
      SetEditText("");
      SetEditingId(null);
    }
  };
  const handelCancleTodo = () => {
    SetEditText("");
    SetEditingId(null);
  };

  const todoDelete = useMutation(api.todos.deleteTodo);

  const handelDelete = async (id: Id<"todos">) => {
    Alert.alert("Delte Todo", "Are you sure you want to delete this todo ?", [
      { text: "Cancle", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => todoDelete({ id }),
      },
    ]);
  };

  if (isLoading) return <LoadingSpiner />;

  const renderTodoItem = ({ item }: { item: Todo }) => {
  const isEditing = editingId === item._id;

  return (
    <View style={homeStyle.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyle.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Checkbox */}
        <TouchableOpacity
          style={homeStyle.checkbox}
          activeOpacity={0.7}
          onPress={() => handelToggleTodo(item._id)}
        >
          <LinearGradient
            colors={
              item.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              homeStyle.checkboxInner,
              {
                borderColor: item.isCompleted
                  ? "transparent"
                  : colors.border,
              },
            ]}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={18} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Content */}
        <View style={homeStyle.todoTextContainer}>
          {isEditing ? (
            <View style={homeStyle.editContainer}>
              {/* Input */}
              <TextInput
                style={homeStyle.editInput}
                value={editText}
                onChangeText={SetEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />

              {/* Edit Action Buttons */}
              <View style={homeStyle.editButtons}>
                {/* Save */}
                <TouchableOpacity
                  onPress={handelSaveTodo}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyle.editButton}
                  >
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#fff"
                    />
                    <Text style={homeStyle.editButtonText}>
                      Save
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Cancel */}
                <TouchableOpacity
                  onPress={() => handelCancleTodo()}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyle.editButton}
                  >
                    <Ionicons
                      name="close"
                      size={16}
                      color="#fff"
                    />
                    <Text style={homeStyle.editButtonText}>
                      Cancel
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {/* Todo Text */}
              <Text
                style={[
                  homeStyle.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              {/* Actions */}
              <View style={homeStyle.todoActions}>
                {/* Edit */}
                <TouchableOpacity
                  onPress={() => handelEditTodo(item)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyle.actionButton}
                  >
                    <Ionicons
                      name="pencil"
                      size={14}
                      color="#fff"
                    />
                  </LinearGradient>
                </TouchableOpacity>

                {/* Delete */}
                <TouchableOpacity
                  onPress={() => handelDelete(item._id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyle.actionButton}
                  >
                    <Ionicons
                      name="trash"
                      size={14}
                      color="#fff"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

  const homeStyle = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyle.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyle.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyle.todoList}
          contentContainerStyle={homeStyle.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
