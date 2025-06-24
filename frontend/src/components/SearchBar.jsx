import React from 'react'
import { useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import ExerciseList from './ExerciseList'

const SearchBar = ({ setExercises }) => {
    // Allows user to actually type input in search bar and computer updates it
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')

    const handleSearch = async () => {
        if (search) {
            const exerciseData = await fetch('http://localhost:8080/api/exercises')
                .then(res => res.json())

            const filteredExercise = exerciseData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                    || exercise.target.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
                    || exercise.bodyPart.toLowerCase().includes(search)
            )
            setSearch('')
            setExercises(filteredExercise)
            if (filteredExercise.length === 0){ 
                setError('Exercise not found')
            } else {
                setError('')
            }
        }
    }

    console.log(error)
    return (
        <>
            <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={2}>
                <Typography
                    fontWeight={600}
                    sx={{ fontSize: { lg: '44px', xs: '30px' } }}
                    textAlign={'center'}
                >
                    Discover your Exercise!
                </Typography>
                <Box
                    position='relative'
                    mt='50px'
                    display='flex'
                    flexDirection='row'
                >
                    <TextField
                        sx={{
                            width: { lg: '900px', xs: '500px' },
                            backgroundColor: 'White',
                            border: 'none',
                            borderRadius: '10px 0px 0px 10px',
                            height: '55px'
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search Exercise'
                        type='text'
                    />
                    <Button
                        position='absolute'
                        sx={{
                            width: { lg: '120px', xs: '90px' },
                            bgcolor: '#20B2AA',
                            textTransform: 'none',
                            borderRadius: 'none',
                            height: '55px',
                            fontWeight: '500px',
                            fontSize: '20px',
                            color: '#fff'
                        }}
                        onClick={() => handleSearch()}
                    >
                        Search
                    </Button>
                </Box>
                {error && (
                    <Typography>
                        {error}
                    </Typography>
                )}
            </Stack>
        </>
    )
}

export default SearchBar