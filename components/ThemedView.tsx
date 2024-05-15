import { SafeAreaView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  safeArea?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  safeArea = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  if (safeArea) {
    return (
      <SafeAreaView
        style={[{ backgroundColor }, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
