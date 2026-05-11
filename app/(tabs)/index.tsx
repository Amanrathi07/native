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

type Todo = Doc<"todos">;

export default function Index() {
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

  if (isLoading) return <LoadingSpiner />;

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyle.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyle.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
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
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyle.todoTextContainer}>
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

            <View style={homeStyle.todoActions}>
              <TouchableOpacity onPress={() => handelEdit(item._id)}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="pencil" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  handelDelete(item._id)}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyle.actionButton}
                >
                  <Ionicons name="trash" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
