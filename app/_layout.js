// app/_layout.js
import { Stack } from "expo-router";
import { ExerciseProvider } from "../context/ExerciseContext";

export default function Layout() {
  return (
    <ExerciseProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FF4757" }, // red
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#121212" }, // default dark bg
        }}
      >
        <Stack.Screen name="index" options={{ title: "FitnessTracker" }} />
        <Stack.Screen name="details" options={{ title: "Exercise Details" }} />
        <Stack.Screen name="add" options={{ title: "New Exercise" }} />
        <Stack.Screen name="edit" options={{ title: "Edit Exercise" }} />
        <Stack.Screen name="quotes" options={{ title: "Motivation" }} />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
            presentation: "modal",
          }}
        />
      </Stack>
    </ExerciseProvider>
  );
}
