import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Brightness from "expo-brightness";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type TBrightnessApi = {
  available: boolean;
  brightness: number;
  mode: Brightness.BrightnessMode;
};

const BrightnessScreen = () => {
  const [api, setApi] = useState<TBrightnessApi>({
    available: false,
    brightness: 0,
    mode: Brightness.BrightnessMode.UNKNOWN,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        const brightness = await Brightness.getSystemBrightnessAsync();
        const mode = await Brightness.getSystemBrightnessModeAsync();
        const available = await Brightness.isAvailableAsync();
        setApi({ brightness, mode, available });
      }
    })();

    const listener = Brightness.addBrightnessListener(({ brightness }) => {
      setApi((prev) => ({ ...prev, brightness }));
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ThemedView
      safeArea
      style={styles.container}
    >
      <ThemedText>API available: {api.available ? "yes" : "no"}</ThemedText>
      <ThemedText>Brightness: {api.brightness}</ThemedText>
      <ThemedText>Mode: {api.mode}</ThemedText>
    </ThemedView>
  );
};

export default BrightnessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
