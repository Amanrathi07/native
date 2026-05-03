import { View, Text, StyleSheet } from "react-native";

const about = () => {
  return (
    <View style={style.container}>
      <Text>back</Text>
      <Text> next</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    gap:50 ,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default about;
