import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Login from "./components/Login/Login";
import Feed from "./components/Feed/Feed";
import Signup from "./components/Signup/Signup";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/GymLog" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
