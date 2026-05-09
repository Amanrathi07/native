import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheame from "@/hooks/useTheame";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpiner = () => {
  const { colors } = useTheame();

  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={homeStyles.loadingText}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpiner;
