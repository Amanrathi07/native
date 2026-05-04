import { TheamProvider } from "@/hooks/useTheame";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TheamProvider>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
    </TheamProvider>
  );
}
