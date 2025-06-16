import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import ExercisePage from './pages/ExercisePage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/Exercise" element={<ExercisePage />}/>
        </Routes>
    </>
  )
}

export default App
