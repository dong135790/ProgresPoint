import React, { useState} from 'react'
import { Stack, Box, Pagination } from '@mui/material'
import ExerciseCard from './ExerciseCard'

const ExerciseList = ({ exercises }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastExercise = currentPage * 9
  const indexOfFirstExercise = indexOfLastExercise - 9
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value)
    window.scrollTo({ top: 500, behavior: 'smooth'})
  }

  return (
    <>
      <Box
        id="exercises"
        sx={{ 
          mt: {lg: '110px'}
        }}
        mt={'50px'}
        p={'20px'}
      >
        <Stack
          direction={'row'}
          sx={{ gap: {lg: '90px', xs: '30px'}}}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          {currentExercises.map((singleExercise, index) => (
            <ExerciseCard key={index} exercise={singleExercise}/>
          ))}
        </Stack>
        <Stack
          mt={'100px'}
          alignItems={'center'}
          spacing={2}
        >
          {exercises.length > 9 &&  (
            <Pagination
              sx={{ bgcolor: 'white', padding: '10px', borderRadius: '10px'}}
              color='primary'
              shape='rounded'
              variant='outlined'
              defaultPage={1}
              count={Math.ceil(exercises.length/9)}
              page={currentPage}
              onChange={paginate}
              size='large'
            />
          )}
        </Stack>
      </Box>
    </>
  )
}

export default ExerciseList