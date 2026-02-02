import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ExerciseDetail from "./pages/exercise/ExerciseDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
