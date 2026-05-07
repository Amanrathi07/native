import { View, Text } from 'react-native'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { createHomeStyles } from '@/assets/styles/home.styles'
import useTheame from '@/hooks/useTheame'

const Header = () => {
    const {colors} = useTheame();
    const homeStyles = createHomeStyles(colors)
    const todos = useQuery(api.todos.getTodos)

    const completedTodos = todos ? todos.filter(todo=>todo.isCompleted).length : 0 ;

    const totalCount = todos ? todos.length :0 ;

    const progressPercentage = totalCount > 0 ? (completedTodos / totalCount)*100 : 0 ;
    
  return (
    <View style={homeStyles.header}>
      <Text>Header</Text>
    </View>
  )
}

export default Header