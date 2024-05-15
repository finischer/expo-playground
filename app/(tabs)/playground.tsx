import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { FlashList } from "@shopify/flash-list";
import ListItem from "@/components/ListItem";

const SCREENS = [
  {
    id: "battery",
    title: "Battery",
    href: "/battery",
    disabled: false,
  },
  {
    id: "motion",
    title: "Motion",
    href: "/motion",
    disabled: true,
  },
];

const PlaygroundScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          size={310}
          name="sparkles"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <FlashList
          data={SCREENS}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <ListItem
              href={item.href}
              disabled={item.disabled}
            >
              {item.title}
            </ListItem>
          )}
          estimatedItemSize={200}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default PlaygroundScreen;

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
