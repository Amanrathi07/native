import { View, Text, Alert } from 'react-native'
import React from 'react'
import useTheame from '@/hooks/useTheame'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const DangerZone = () => {
    const {colors} = useTheame() ;

    const clearAllTodos = useMutation(api.todos.clearAllTodos) ;

const handelResetApp = async()=>{
    Alert.alert("Reset App",
        "🚨 This will delete All your todos Permanenrly . This action cannot be undone",
        [
            {text:"Cancle",style:"cancel"},
            {
                text:"Delete All",
                style:"destructive",
                onPress:async ()=>{
                    try {
                        const result =await clearAllTodos() ;
                        Alert.alert(`App Reset" , "Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ?"":"s"}.Your app has been reset.`)
                    } catch (error) {
                        console.log("")
                    }
                }
            }
        ])
}
  return (
    <View>
      <Text>DangerZone</Text>
    </View>
  )
}

export default DangerZone