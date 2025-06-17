import React from 'react'
import SearchBar from '../components/SearchBar'
import ExerciseList from '../components/ExerciseList'
import { Box, Divider } from '@mui/material'

const ExercisePage = () => {
  return (
    <>
      <Box>
        <SearchBar/>
      </Box>
      <Divider
        sx={{ 
          bgcolor: 'White',
          marginTop: '50px',
          marginBottom: '50px'
        }}
      />
      <Box>
        <ExerciseList/>
      </Box>
        
    </>
  )
}

export default ExercisePage