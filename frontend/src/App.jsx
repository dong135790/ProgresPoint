import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import SingleExercisePage from './pages/SingleExercisePage'
import WorkoutPlanPage from './pages/WorkoutPlanPage'
import { Box } from '@mui/material'
import './App.css'

function App() {
  const [exercises, setExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])

  useEffect(() => {
    const allExercise = async () => {
      const res = await fetch('http://localhost:8080/api/exercises');
      const data = await res.json();
      setExercises(data);
      setAllExercises(data);
      console.log("Api ran")
    }
    allExercise();

  }, [])

  return (
    <>
      <NavBar />
      <Box sx={{ paddingTop: '150px', paddingX: 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise" element={<ExercisePage
            setExercises={setExercises}
            allExercises={allExercises}
            exercises={exercises}
          />} />
          <Route path="/exercise/:id" element={<SingleExercisePage
            exercises={exercises}
          />} />
          <Route path="/plan" element={<WorkoutPlanPage
            exercises={exercises}
          />}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
