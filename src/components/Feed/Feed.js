import "./Feed.css";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Listgroup from "./Listgroup";
import Navbar from "../Navbar/Navbar";

function Feed() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Listgroup />
      </header>
    </div>
  );
}

export default Feed;
