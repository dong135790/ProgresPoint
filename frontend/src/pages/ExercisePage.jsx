import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ExerciseList from '../components/ExerciseList'
import { Box, Divider } from '@mui/material'
import BodyPartList from '../components/BodyPartList'

const ExercisePage = () => {
  const [exercises, setExercises] = useState([])
  const [allExercises, setAllExercises] = useState([])

  useEffect(() => {
    const allExercise = async () => {
      const res = await fetch('http://localhost:8080/api/exercises');
      const data = await res.json();
      setExercises(data);
      setAllExercises(data);
    }
    allExercise();

  }, [])

  return (
    <>
      <Box>
        <SearchBar setExercises={setExercises}/>
      </Box>
      <Box>
        <BodyPartList allExercises={allExercises} setExercises={setExercises}/>
      </Box>
      <Divider
        sx={{ 
          bgcolor: 'White',
          marginTop: '50px',
          marginBottom: '50px'
        }}
      />
      <Box>
        <ExerciseList exercises={exercises}/>
      </Box>
    </>
  )
}

export default ExercisePage