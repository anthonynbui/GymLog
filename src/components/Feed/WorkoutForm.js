import "./WorkoutForm.css";
import { useState } from "react";
import { db } from "../../config/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import AddWorkoutButton from "./AddWorkoutButton";

function WorkoutForm() {
  const [newExercise, setNewExercise] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newReps, setNewReps] = useState("");

  const workoutCollectionsRef = collection(db, "workouts");

  const onAddWorkout = async () => {
    try {
      await addDoc(workoutCollectionsRef, {
        exercise: newExercise,
        reps: newReps,
        weight: newWeight,
      });
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="form">
      <form>
        <div class="form-group">
          <h2>Enter exercise</h2>
          <input
            placeholder="Exercise"
            onChange={(event) => setNewExercise(event.target.value)}
          ></input>
          <h2>Enter weight</h2>
          <input
            placeholder="Weight"
            onChange={(event) => setNewWeight(event.target.value)}
          ></input>
          <h2>Enter reps</h2>
          <input
            placeholder="Reps"
            onChange={(event) => setNewReps(event.target.value)}
          ></input>
          <AddWorkoutButton addWorkoutHandler={onAddWorkout}/>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
