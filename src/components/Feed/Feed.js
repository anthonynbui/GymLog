import "./Feed.css";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Listgroup from "./Listgroup";
import WorkoutForm from "./WorkoutForm";

import AddWorkoutButton from "./AddWorkoutButton";
import Navbar from "../Navbar/Navbar";
import { app, auth, googleProvider } from "../../config/auth";
import { db } from "../../config/auth";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function Feed() {
  const UserEmail = auth.currentUser.email;

  const [workoutList, setWorkoutList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedWorkout, setSelectedWorkout] = useState(-1);
  const [newExercise, setNewExercise] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newReps, setNewReps] = useState("");

  const workoutCollectionsRef = collection(db, "workouts");
  const userCollectionsRef = collection(db, "users");

  const getWorkoutList = async () => {
    try {
      const userWorkoutsRef = query(workoutCollectionsRef, where("userID", "==", auth.currentUser.uid));
      const data = await getDocs(userWorkoutsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setWorkoutList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWorkoutList();
  }, []);

  const onAddWorkout = async () => {
    try {
      await addDoc(workoutCollectionsRef, {
        exercise: newExercise,
        reps: newReps,
        weight: newWeight,
        userID: auth.currentUser.uid
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
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Welcome {UserEmail}!</h1>
        <Listgroup
          workoutList={workoutList}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSelectedWorkout={setSelectedWorkout}
        />
        <Button startIcon={<DeleteIcon />} variant="contained" onClick={() => onDeleteWorkout(selectedWorkout.id)}>
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
      </header>
    </div>
  );
}

export default Feed;
