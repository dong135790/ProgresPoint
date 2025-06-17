import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import { Box } from '@mui/material'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ paddingTop: '300px', paddingX: 20 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercise" element={<ExercisePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
