import React, { useState } from 'react'
import { Stack, Box, Pagination } from '@mui/material'
import WorkoutExerciseCard from './WorkoutExerciseCard'

const WorkoutExerciseList = ({workoutPlan, exercises, workoutIndex }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastExercise = currentPage * 10
  const indexOfFirstExercise = indexOfLastExercise - 10
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 500, behavior: 'smooth' })
  }

  return (
    <Box
      id="exercises"
      sx={{
      }}
    >
      <Stack
        direction={'row'}
        sx={{ gap: { lg: '90px', xs: '30px' } }}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        {currentExercises.map((singleExercise, index) => (
          <WorkoutExerciseCard key={index} workoutPlan={workoutPlan} workoutIndex={workoutIndex} exercise={singleExercise} />
        ))}
      </Stack>
      <Stack
        mt={'30px'}
        alignItems={'center'}
        spacing={2}
      >
        {exercises.length > 10 && (
          <Pagination
            sx={{ bgcolor: 'white', padding: '10px', borderRadius: '10px' }}
            color='primary'
            shape='rounded'
            variant='outlined'
            defaultPage={1}
            count={Math.ceil(exercises.length / 10)}
            page={currentPage}
            onChange={paginate}
            size='large'
          />
        )}
      </Stack>
    </Box>
  )
}

export default WorkoutExerciseList