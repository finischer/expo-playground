import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Battery from "expo-battery";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const BatteryScreen = () => {
  const [api, setApi] = useState({
    available: false,
    batteryLevel: 0,
    batteryState: Battery.BatteryState.UNKNOWN,
    lowPowerMode: false,
  });

  const fetchBatteryState = async () => {
    const state = await Battery.getBatteryStateAsync();
    const level = await Battery.getBatteryLevelAsync();
    const available = await Battery.isAvailableAsync();
    const lowPowerMode = await Battery.isLowPowerModeEnabledAsync();
    const newState = {
      available,
      batteryLevel: level * 100,
      batteryState: state,
      lowPowerMode,
    };
    setApi(newState);
  };

  useEffect(() => {
    fetchBatteryState();

    const batteryLevelListener = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setApi((prev) => ({ ...prev, batteryLevel: batteryLevel * 100 }));
    });
    const batteryStateListener = Battery.addBatteryStateListener(({ batteryState }) => {
      setApi((prev) => ({ ...prev, batteryState }));
    });
    const lowPowerModeListener = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
      setApi((prev) => ({ ...prev, lowPowerMode }));
    });

    return () => {
      batteryLevelListener.remove();
      batteryStateListener.remove();
      lowPowerModeListener.remove();
    };
  }, []);

  return (
    <ThemedView
      style={styles.container}
      safeArea
    >
      <ThemedText>Low power mode: {api.lowPowerMode ? "enabled" : "disabled"}</ThemedText>
      <ThemedText>Battery level: {api.batteryLevel}%</ThemedText>
      <ThemedText>Battery state: {api.batteryState}</ThemedText>
      <ThemedText>Battery API available: {api.available ? "yes" : "no"}</ThemedText>
    </ThemedView>
  );
};

export default BatteryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
});
