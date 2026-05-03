import { View, Text, StyleSheet } from 'react-native'

const about = () => {
  return (
    <View style={style.container}>
      <Text>this is about screen</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }
})
export default about