import React from 'react'
import { Stack, Box } from '@mui/material'

const ExerciseList = ({ exercises }) => {
  return (
    <>
      {exercises.map((singleExercise, index) => (
        <>
          <Stack>
            <img src={singleExercise.gifurl}></img>
            <Box key={index}>
              {singleExercise.name}
            </Box>
          </Stack>
        </>
      ))}
    </>
  )
}

export default ExerciseList