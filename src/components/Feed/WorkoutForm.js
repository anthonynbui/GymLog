import "./WorkoutForm.css";
import { useState } from "react";
import { db } from "../../config/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import AddWorkoutButton from "./AddWorkoutButton";
import TextField from "@mui/material/TextField";

function WorkoutForm({
  newExercise,
  setNewExercise,
  newWeight,
  setNewWeight,
  newReps,
  setNewReps,
  onAddWorkout,
}) {
  return (
    <div id="form">
      <form>
        <div class="form-group">
          <h2>Enter exercise</h2>
          <TextField
            variant="outlined"
            label="Exercise"
            onChange={(event) => setNewExercise(event.target.value)}
          />
          <h2>Enter weight</h2>
          <TextField
            variant="outlined"
            label="Weight"
            onChange={(event) => setNewWeight(event.target.value)}
          />
          <h2>Enter reps</h2>
          <TextField
            variant="outlined"
            label="Reps"
            onChange={(event) => setNewReps(event.target.value)}
          />
        </div>
        <AddWorkoutButton addWorkoutHandler={onAddWorkout} />
      </form>
    </div>
  );
}

export default WorkoutForm;
