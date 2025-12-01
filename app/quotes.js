// app/quotes.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function QuotesScreen() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      // console.error(error);
      console.log("Network Error:", error);
      setQuote({
        quote: "You can do it! (API failed, but I believe in you)",
        author: "Monke",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Motivation</Text>

      <View style={styles.card}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF4757" />
        ) : (
          <>
            <Text style={styles.quoteText}>&quot;{quote.quote}&quot;</Text>
            <Text style={styles.author}>- {quote.author}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchQuote}>
        <Ionicons
          name="sync"
          size={20}
          color="#FFF"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.buttonText}>New Quote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // dark bg
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  header: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#FFF" },

  // dark
  card: {
    backgroundColor: "#1E1E1E",
    padding: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    elevation: 5,
    minHeight: 200,
    justifyContent: "center",
  },

  // lg
  quoteText: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
    color: "#DDD",
  },

  // magma red accent
  author: { fontSize: 16, fontWeight: "bold", color: "#FF4757" },

  button: {
    marginTop: 30,
    backgroundColor: "#FF4757", // magma red
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
