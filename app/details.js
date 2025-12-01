// app/details.js
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useExercises } from "../context/ExerciseContext";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { deleteExercise, toggleStatus, exercises } = useExercises();

  // find current status
  const currentExercise = exercises.find((e) => e.id === params.id);
  const isCompleted = currentExercise ? currentExercise.completed : false;

  const handleDelete = () => {
    Alert.alert("Delete Exercise", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteExercise(params.id);
          router.back();
        },
      },
    ]);
  };

  const handleToggle = () => {
    toggleStatus(params.id);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: params.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{params.title}</Text>
          {isCompleted && (
            <View style={styles.statusTag}>
              <Ionicons
                name="checkmark-done-circle"
                size={16}
                color="#2ecc71"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.statusText}>DONE</Text>
            </View>
          )}
        </View>

        <Text style={styles.description}>{params.description}</Text>
      </View>

      {/* Toggle Completion Btn */}
      <TouchableOpacity
        style={[
          styles.completeBtn,
          isCompleted ? styles.btnUndo : styles.btnDone,
        ]}
        onPress={handleToggle}
      >
        <Ionicons
          name={isCompleted ? "close-circle" : "checkmark-circle"}
          size={24}
          color="#FFF"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.completeBtnText}>
          {isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </Text>
      </TouchableOpacity>

      {/* Action btsn */}
      <View style={styles.buttonContainer}>
        {/* Edit btn */}
        <TouchableOpacity
          style={[styles.btn, styles.editBtn]}
          onPress={() =>
            router.push({ pathname: "/edit", params: { ...params } })
          }
        >
          <Ionicons
            name="create-outline"
            size={20}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        {/* Delete btn */}
        <TouchableOpacity
          style={[styles.btn, styles.deleteBtn]}
          onPress={handleDelete}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color="#FFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },

  image: { width: "100%", height: 300, resizeMode: "cover" },

  content: { padding: 20 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: { fontSize: 24, fontWeight: "bold", flex: 1, color: "#FFF" },

  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2ecc71",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    color: "#2ecc71",
    fontWeight: "bold",
    fontSize: 14,
  },

  description: { fontSize: 16, lineHeight: 24, color: "#AAA" },

  // Big Toggle Button
  completeBtn: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    flexDirection: "row",
  },
  btnDone: { backgroundColor: "#2ecc71" },
  btnUndo: { backgroundColor: "#333" },
  completeBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Edit/Delete Container
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    flexDirection: "row",
  },
  editBtn: { backgroundColor: "#FF4757" }, // Magma Red
  deleteBtn: { backgroundColor: "#D32F2F" }, // Danger Danger Red weewoo weewoo
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
