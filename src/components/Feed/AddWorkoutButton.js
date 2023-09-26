import "./AddWorkoutButton.css";

function AddWorkoutButton({addWorkoutHandler}) {
  return (
    <button type="button" class="btn btn-light" onClick={addWorkoutHandler}>
      Add Workout
    </button>
  );
}

export default AddWorkoutButton;
