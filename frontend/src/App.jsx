import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import SingleExercisePage from './pages/SingleExercisePage'
import WorkoutPlanPage from './pages/WorkoutPlanPage'
import WorkoutSessionPage from './pages/WorkoutSessionPage'
import { Box } from '@mui/material'
import './App.css'

function App() {
  const [exercises, setExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])
  const [workoutData, setWorkoutData] = useState([])
  const [workoutPlanId, setWorkoutPlanId] = useState(0);

  useEffect(() => {
    const allExercise = async () => {
      const res = await fetch('http://localhost:8080/api/exercises');
      const data = await res.json();
      setExercises(data);
      setAllExercises(data);
    }
    allExercise();

  }, [])

  const workoutPlan = async () => {
    const res = await fetch('http://localhost:8080/api/plan');
    const data = await res.json();
    setWorkoutData(data);
  }
  useEffect(() => {
    workoutPlan();
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
            exercises={exercises} workoutData={workoutData} workoutPlanId={workoutPlanId} setWorkoutPlanId={setWorkoutPlanId}
          />} />
          <Route path="/workout/start/:id"
            element={<WorkoutSessionPage
              workoutData={workoutData} workoutPlanId={workoutPlanId}
            />} />

        </Routes>
      </Box>
    </>
  )
}

export default App
