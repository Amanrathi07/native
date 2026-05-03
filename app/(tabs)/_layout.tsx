import { Tabs } from "expo-router";
import {Ionicons} from '@expo/vector-icons'
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{ title: "Todos", tabBarIcon: ({color,size}) => (<Ionicons name="flash-outline" size={size}/>) }}
      />

      <Tabs.Screen
        name="setting"
        options={{ title: "Setting", tabBarIcon: ({color,size}) => (<Ionicons name="settings" size={size}/>) }}
      />
    </Tabs>
  );
};

export default TabsLayout;
