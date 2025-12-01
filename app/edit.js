// app/edit.js
import React, { useState } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useExercises } from "../context/ExerciseContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RANDOM_IMAGES = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500&q=80",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80",
];

export default function EditExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updateExercise } = useExercises();

  const [title, setTitle] = useState(params.title);
  const [desc, setDesc] = useState(params.description);
  const [image, setImage] = useState(params.image);
  const [selectedDay, setSelectedDay] = useState(params.day || "Mon");

  const handleUpdate = () => {
    if (!title || !desc) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    updateExercise(params.id, {
      title,
      description: desc,
      image,
      day: selectedDay,
    });
    router.dismissAll();
    router.replace("/");
  };

  const shuffleImage = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_IMAGES.length);
    setImage(RANDOM_IMAGES[randomIndex]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Exercise Name</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Move to Day</Text>
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
        multiline
        placeholderTextColor="#888"
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

      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button
          title="Update Exercise"
          onPress={handleUpdate}
          color="#FF4757" // magma red
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // dark bg
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#FFF",
  },

  // dark
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#1E1E1E",
    color: "#FFF", // while typing
  },
  textArea: { height: 100, textAlignVertical: "top" },

  // day btn red active
  daysRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  dayBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  dayBtnActive: { backgroundColor: "#FF4757", borderColor: "#FF4757" },
  dayText: { color: "#AAAAAA", fontWeight: "bold" },
  dayTextActive: { color: "#FFF" },

  imageSection: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  shuffleBtn: {
    backgroundColor: "#333", // dark grey
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  shuffleText: { color: "#FFF", fontWeight: "bold" },
});
