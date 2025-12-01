// app/add.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useExercises } from "../context/ExerciseContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RANDOM_IMAGES = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&q=80",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80",
];

export default function AddExerciseScreen() {
  const router = useRouter();
  const { addExercise } = useExercises();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [image, setImage] = useState("");

  useEffect(() => {
    shuffleImage();
  }, []);

  const shuffleImage = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_IMAGES.length);
    setImage(RANDOM_IMAGES[randomIndex]);
  };

  const handleSubmit = () => {
    if (!title || !desc) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    addExercise({ title, description: desc, image, day: selectedDay });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Exercise Name</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Chest Press"
        placeholderTextColor="#888" // very very very imp for our lovely darkmode
      />

      <Text style={styles.label}>Select Day</Text>
      <View style={styles.daysRow}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayBtn, selectedDay === day && styles.dayBtnActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day && styles.dayTextActive,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Describe the workout..."
        placeholderTextColor="#888"
        multiline
      />

      <Text style={styles.label}>Image Preview</Text>
      <View style={styles.imageSection}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        ) : null}

        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, { marginBottom: 10 }]}
            value={image}
            onChangeText={setImage}
            placeholder="Image URL"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.shuffleBtn} onPress={shuffleImage}>
            <Text style={styles.shuffleText}>🎲 Shuffle Image</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Button
          title="Save Exercise"
          onPress={handleSubmit}
          color="#FF4757" // this is magma, me is magma
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  //bg
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },

  // txt lbls
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#FFF",
  },

  // tricky inputs hehe
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#1E1E1E",
    color: "#FFF",
  },
  textArea: { height: 100, textAlignVertical: "top" },

  // day btn
  daysRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  dayBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  dayBtnActive: {
    backgroundColor: "#FF4757", // red active
    borderColor: "#FF4757",
  },
  dayText: { color: "#AAAAAA", fontWeight: "bold" }, // grey inactive
  dayTextActive: { color: "#FFF" }, // white active

  imageSection: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#333", // palceholder dark
  },
  shuffleBtn: {
    backgroundColor: "#333", // dark grey
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  shuffleText: { color: "#FFF", fontWeight: "bold" },
});
