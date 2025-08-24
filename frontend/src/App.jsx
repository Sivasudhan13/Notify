import React from "react";
import { Routes, Route } from "react-router-dom"; // Correct import
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import NoteDetailpage from "./pages/NoteDetailpage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailpage />} />
      </Routes>
    </div>
  );
};

export default App;
