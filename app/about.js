// app/about.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  // Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  const openGitHub = () => {
    Linking.openURL("https://github.com/FurqanHun/FitnessTracker");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>FitnessTracker 🏋️</Text>
        <Text style={styles.version}>Version 1.1.0</Text>

        <Text style={styles.description}>
          A fitness tracking application built with React Native and Expo.
          Designed to help you track your daily/weekly excersises and stay
          motivated? Maybe. Maybe not.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Developed By:</Text>
        <Text style={styles.name}>Furqan Hun</Text>
        <Text style={styles.subText}>BS Software Engineering</Text>

        <TouchableOpacity style={styles.githubBtn} onPress={openGitHub}>
          <Text style={styles.btnText}>View Source on GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },

  title: { fontSize: 28, fontWeight: "bold", color: "#FFF", marginBottom: 5 },
  version: { fontSize: 14, color: "#666", marginBottom: 20 },

  description: {
    color: "#AAA",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

  divider: {
    height: 1,
    backgroundColor: "#333",
    width: "100%",
    marginBottom: 20,
  },

  label: {
    color: "#666",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  name: { color: "#FFF", fontSize: 20, fontWeight: "bold", marginTop: 5 },
  subText: { color: "#AAA", marginBottom: 30 },

  githubBtn: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontWeight: "bold" },

  closeBtn: { padding: 10 },
  closeText: { color: "#FF4757", fontWeight: "bold" }, // Magma Red
});
