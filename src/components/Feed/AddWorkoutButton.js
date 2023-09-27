import "./AddWorkoutButton.css";

import Button from "@mui/material/Button";

function AddWorkoutButton({ addWorkoutHandler }) {
  return (
    <Button
      component="label"
      variant="contained"
      size="large"
      onClick={addWorkoutHandler}
    >
      Add Workout
    </Button>
  );
}

export default AddWorkoutButton;
