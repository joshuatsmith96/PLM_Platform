import { Routes, Route } from "react-router-dom";
import { Stack } from "@mui/material";

import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";

import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Stack>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ProjectDetails />} />
      </Routes>
    </Stack>
  );
}

export default App;
