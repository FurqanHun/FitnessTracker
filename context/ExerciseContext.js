// context/ExerciseContext.js
import React, { createContext, useState, useContext } from "react";

const ExerciseContext = createContext();

//these were the example exercises i used for uhm testing as i was fed up with adding them each time... and also screenshots hehe...
export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([
    // {
    //   id: "1",
    //   title: "Chest Press",
    //   description: "Heavy lifting for the pecs.",
    //   image:
    //     "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80",
    //   completed: false,
    //   day: "Mon",
    // },
    // {
    //   id: "2",
    //   title: "Deadlift",
    //   description: "The king of back exercises.",
    //   image:
    //     "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    //   completed: false,
    //   day: "Tue",
    // },
    // {
    //   id: "3",
    //   title: "Yoga Flow",
    //   description: "Recovery and stretching.",
    //   image:
    //     "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500&q=80",
    //   completed: false,
    //   day: "Sun",
    // },
  ]);

  const addExercise = (newExercise) => {
    setExercises((curr) => [
      ...curr,
      { ...newExercise, id: Math.random().toString(), completed: false },
    ]);
  };

  const deleteExercise = (id) => {
    setExercises((curr) => curr.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id, updatedData) => {
    setExercises((curr) =>
      curr.map((ex) => (ex.id === id ? { ...ex, ...updatedData } : ex)),
    );
  };

  const toggleStatus = (id) => {
    setExercises((curr) =>
      curr.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex,
      ),
    );
  };

  // RESET 1: Only reset exercises for a specific day
  const resetDay = (dayToReset) => {
    setExercises((curr) =>
      curr.map((ex) =>
        ex.day === dayToReset ? { ...ex, completed: false } : ex,
      ),
    );
  };

  // RESET 2: Weekly Reset
  const resetWeek = () => {
    setExercises((curr) => curr.map((ex) => ({ ...ex, completed: false })));
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        addExercise,
        deleteExercise,
        updateExercise,
        toggleStatus,
        resetDay,
        resetWeek,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);
