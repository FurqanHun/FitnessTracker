// app/index.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useExercises } from "../context/ExerciseContext";
import { Ionicons } from "@expo/vector-icons";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function HomeScreen() {
  const router = useRouter();
  const { exercises, resetDay, resetWeek } = useExercises();

  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(DAYS[todayIndex]);

  const filteredExercises = exercises.filter((e) => e.day === selectedDay);
  const sortedExercises = [...filteredExercises].sort(
    (a, b) => Number(a.completed) - Number(b.completed),
  );

  const total = filteredExercises.length;
  const completed = filteredExercises.filter((e) => e.completed).length;
  const progress = total > 0 ? completed / total : 0;

  const handleReset = () => {
    Alert.alert("Reset Progress", "What would you like to reset?", [
      { text: "Cancel", style: "cancel" },
      {
        text: `Reset ${selectedDay} Only`,
        onPress: () => resetDay(selectedDay),
      },
      {
        text: "Reset Whole Week",
        style: "destructive",
        onPress: resetWeek,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/about")}
              style={{ marginRight: 10 }}
            >
              <Text style={{ fontSize: 24, color: "#FFF", fontWeight: "bold" }}>
                ⓘ
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* DAY SELECTOR */}
      <View style={styles.dayContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DAYS.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayChip,
                selectedDay === day && styles.dayChipActive,
              ]}
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
        </ScrollView>
      </View>

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>{selectedDay}&apos;s Workout</Text>
          <Text style={styles.headerSub}>
            {completed} / {total} Completed
          </Text>
        </View>
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Ionicons
            name="refresh"
            size={16}
            color="#FFF"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
        />
      </View>

      <TouchableOpacity
        style={styles.quoteButton}
        onPress={() => router.push("/quotes")}
      >
        <Text style={styles.quoteButtonText}>💡 Get Motivated</Text>
      </TouchableOpacity>

      {/* EMPTY STATE */}
      {sortedExercises.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Rest Day! 😴</Text>
          <Text style={styles.emptySub}>
            No exercises assigned to {selectedDay}.
          </Text>
        </View>
      )}

      <FlatList
        data={sortedExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.completed && styles.cardCompleted]}
            onPress={() =>
              router.push({ pathname: "/details", params: { ...item } })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={[
                styles.thumbnail,
                item.completed && styles.imageCompleted,
              ]}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[styles.title, item.completed && styles.textCompleted]}
                >
                  {item.title}
                </Text>

                {item.completed && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#2ecc71"
                    style={{ marginLeft: 6 }}
                  />
                )}
              </View>

              <Text numberOfLines={1} style={styles.desc}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // main bg, void bleck
  container: { flex: 1, backgroundColor: "#121212", padding: 10 },

  // day selector
  dayContainer: { height: 50, marginBottom: 10 },
  dayChip: {
    backgroundColor: "#1E1E1E", // Dark Grey
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333", // dark
  },
  dayChipActive: {
    backgroundColor: "#FF4757", // magma red
    borderColor: "#FF4757",
  },
  dayText: { fontWeight: "bold", color: "#AAAAAA" }, // lgrey
  dayTextActive: { color: "#FFF" }, // white

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF" },
  headerSub: { color: "#AAAAAA" }, // lgrey
  resetButton: {
    backgroundColor: "#333",
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  }, // Dark Button
  resetText: { fontSize: 12, fontWeight: "bold", color: "#FFF" },

  progressBarBg: {
    height: 10,
    backgroundColor: "#333", // dark again
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#FF4757" }, // RED FILL

  quoteButton: {
    backgroundColor: "#1E1E1E", // dark card
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  quoteButtonText: { color: "#FF4757", fontWeight: "bold", fontSize: 16 }, // Red Text

  // list cards
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // gunmetal grey
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  thumbnail: { width: 80, height: 80 },
  info: { padding: 10, flex: 1, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
  desc: { color: "#AAAAAA", marginTop: 4 }, // lgrey

  cardCompleted: { backgroundColor: "#000", opacity: 0.6 }, // more darker when done
  imageCompleted: { opacity: 0.5 },
  textCompleted: { textDecorationLine: "line-through", color: "#555" },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF4757", // magma red
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 30, fontWeight: "bold" },

  emptyState: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 24, fontWeight: "bold", color: "#555" },
  emptySub: { color: "#777", marginTop: 5 },
});
