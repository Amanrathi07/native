import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={style.container}
    >
    
    <Text>working</Text>
    <Link href={"/about"}>about screen</Link>
    </View>
  );
}


const style = StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
})