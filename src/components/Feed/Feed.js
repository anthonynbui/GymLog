import "./Feed.css";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Listgroup from "./Listgroup";
import WorkoutForm from "./WorkoutForm";

import AddWorkoutButton from "./AddWorkoutButton";
import Navbar from "../Navbar/Navbar";
import { app, auth, googleProvider } from "../../config/auth";

function Feed() {
  const UserEmail = auth.currentUser.email;

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Welcome {UserEmail}!</h1>
        <Listgroup />
        <AddWorkoutButton />
      </header>
    </div>
  );
}

export default Feed;
