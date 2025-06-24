import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ExerciseList from '../components/ExerciseList'
import { Box, Divider } from '@mui/material'
import BodyPartList from '../components/BodyPartList'

const ExercisePage = ({ setExercises, allExercises, exercises}) => {

  return (
    <>
      <Box>
        <SearchBar setExercises={setExercises}/>
      </Box>
      <Box>
        <BodyPartList 
          allExercises={allExercises}
          setExercises={setExercises}
        />
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