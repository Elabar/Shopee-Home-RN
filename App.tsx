import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./Home";
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <Home />
      </View>
    </SafeAreaProvider>
  );
}
