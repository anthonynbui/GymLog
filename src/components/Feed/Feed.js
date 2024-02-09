import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "../../config/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "./getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from './AppAppBar';
import Listgroup from "./Listgroup";
import WorkoutForm from "./WorkoutForm";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function Feed() {
  const [workoutList, setWorkoutList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedWorkout, setSelectedWorkout] = useState(-1);
  const [newExercise, setNewExercise] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newReps, setNewReps] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  // const [loggedIn,SetLoggedIn] = useState(false);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({});
  const isLoggedIn = auth.currentUser ? auth.currentUser.email : null;

  const workoutCollectionsRef = collection(db, "workouts");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const getWorkoutList = async () => {
    try {
      const userWorkoutsRef = query(
        workoutCollectionsRef,
        where("userID", "==", auth.currentUser.uid)
      );
      const data = await getDocs(userWorkoutsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWorkoutList(filteredData);
      setShowAlert(true);
      setAlertMessage("Workout added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getWorkoutList();
    }
  }, []);

  const onAddWorkout = async () => {
    try {
      const currentDate = new Date();
      await addDoc(workoutCollectionsRef, {
        exercise: newExercise,
        reps: newReps,
        weight: newWeight,
        userID: auth.currentUser.uid,
        date: currentDate.toISOString(),
      });
    } catch (err) {
      console.error(err);
    }

    getWorkoutList();
  };

  const onDeleteWorkout = async (selectedWorkout) => {
    try {
      const deleteWorkout = doc(db, "workouts", selectedWorkout);
      await deleteDoc(deleteWorkout);
    } catch (err) {
      console.error(err);
    }

    getWorkoutList();
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <AppAppBar mode={mode} isLoggedIn={isLoggedIn} />
          {isLoggedIn && (
            <>
              <Listgroup
                workoutList={workoutList}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                setSelectedWorkout={setSelectedWorkout}
              />
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                onClick={() => onDeleteWorkout(selectedWorkout.id)}
              >
                Delete selected workout
              </Button>
              <WorkoutForm
                newExercise={newExercise}
                setNewExercise={setNewExercise}
                newWeight={newWeight}
                setNewWeight={setNewWeight}
                newReps={newReps}
                setNewReps={setNewReps}
                onAddWorkout={onAddWorkout}
              />
            </>
          )}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default Feed;
