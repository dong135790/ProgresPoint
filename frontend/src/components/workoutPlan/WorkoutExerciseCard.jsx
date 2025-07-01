import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography, TextField } from '@mui/material'
const WorkoutExerciseCard = ({ workoutPlan, exercise, workoutPlanId }) => {
    const [set, setSet] = useState(0)
    const [rep, setRep] = useState(0)
    // console.log("Final " + workoutPlanId)
    const addToPlan = async ( id ) => {
        const exerciseData = await fetch(`http://18.117.229.9:8080/api/exercises/exercise/${exercise.id}`)
        const data = await exerciseData.json()

        const exerciseInfo = {
            exercise: data,
            sets: parseInt(set, 10),
            reps: parseInt(rep, 10),
            notes: ''
        }
        console.log("Exercise Info ", JSON.stringify(exerciseInfo))
        console.log("Workout Plan ID: " + workoutPlanId)
        const result = await fetch(`http://18.117.229.9:8080/api/plan/add/${workoutPlanId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseInfo)
        });


        if (result.ok) {
            setRep(0)
            setSet(0)
            alert('Workout Added')
            workoutPlan()

        } else {
            alert('Could not add to workout')
        }

    }


    
    return (
        <Box className='workout-exercise-card' >
            <Link className='workout-exercise-card' to={`/exercise/${exercise.id}`}>
            <img src={exercise.gifUrl} alt={exercise.name} loading='lazy' />
            </Link>
            <Stack direction={'column'}>
                <Stack direction={'row'}>
                    <Button
                        sx={{
                            ml: '21px',
                            color: '#fff',
                            background: '#9765a7',
                            fontSize: '14px',
                            borderRadius: '20px',
                            textTransform: 'capitalize'
                        }}
                        >
                        {exercise.bodyPart}
                    </Button>
                    <Button
                        sx={{
                            ml: '21px',
                            color: '#fff',
                            background: '#6ea2e8',
                            fontSize: '14px',
                            borderRadius: '20px',
                            textTransform: 'capitalize'
                        }}
                        >
                        {exercise.target}
                    </Button>
                </Stack>
                <Stack direction={'row'} gap={1} margin={1} mt={2}>
                    <TextField
                        label="Sets"
                        variant="outlined"
                        size="small"
                        value={set}
                        onChange={(e) => setSet(e.target.value)}
                        type="number"
                        sx={{ width: '50%' }}
                    />
                    <TextField
                        label="Reps"
                        variant="outlined"
                        size="small"
                        value={rep}
                        onChange={(e) => setRep(e.target.value)}
                        type="number"
                        sx={{ width: '50%' }}
                    />
                </Stack>
                <Stack mt={1}>
                    <Button
                        sx={{
                            color: '#fff',
                            background: '#9765a7',
                            fontSize: '14px',
                            borderRadius: '20px',
                            width: 'fit-content',
                            alignSelf: 'center',
                            paddingY: '6px',
                            paddingX: '16px',
                            textTransform: 'capitalize'
                        }}
                        onClick={ addToPlan }
                    >
                        Add to Plan
                    </Button>
                </Stack>
            </Stack>
            <Link to={`/exercise/${exercise.id}`}>
            <Typography
                ml={'10px'}
                mt={1}
                color='#000'
                fontWeight={'bold'}
                pb={'10px'}
                textTransform={'capitalize'}
                fontSize={'14px'}
                >
                {exercise.name}
            </Typography>
            </Link>

        </Box>
    )
}

export default WorkoutExerciseCard
