import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

interface IListItemProps {
  children: ReactNode;
  disabled?: boolean;
  href?: string;
}

const ListItem: FC<IListItemProps> = ({ disabled = false, href = "", children }) => {
  return (
    <Pressable
      onPress={() => router.push(href)}
      disabled={disabled}
    >
      <ThemedView
        lightColor="green"
        darkColor={Colors.dark.container}
        style={{
          ...styles.container,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <ThemedText style={styles.text}>{children}</ThemedText>
        <Ionicons
          size={24}
          color={Colors.dark.icon}
          name="chevron-forward"
        />
      </ThemedView>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 8,
    gap: 8,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
