import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import SingleExercisePage from './pages/SingleExercisePage'
import { Box } from '@mui/material'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ paddingTop: '150px', paddingX: 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route path="/exercise/:id" element={<SingleExercisePage/>}/>
        </Routes>
      </Box>
    </>
  )
}

export default App
