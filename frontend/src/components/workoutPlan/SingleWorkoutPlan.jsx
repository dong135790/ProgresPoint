import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Link } from '@mui/material'

const SingleWorkoutPlan = ({ plans, workoutIndex }) => {
    const [plan, setPlan] = useState(null)

    useEffect(() => {
        if (plans.length > 0 && workoutIndex >= 0) {
            const desiredPlan = plans[workoutIndex]
            setPlan(desiredPlan)
            console.log("Selected Plan:", desiredPlan)
        }
    }, [plans, workoutIndex])

    if (!plan) {
        return <Typography>Loading plan...</Typography>
    }

    return (
        <Box>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: '20px',
                    textAlign: 'center',
                    mb: 5
                }}
            >
                {plan.name}
            </Typography>
            <Stack 
                direction={'row'}
                sx={{ 
                    gap: { lg: '30px', xs: '10px' },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5,1fr)',
                    ml: '100px'
                }}
                flexWrap={'wrap'}
                justifyContent={'center'}
            >
                {plan.exerciseList.map((exercise, index) => (
                    <Box className='single-workout-exercise-card'>
                        <img src={exercise.exercise.gifUrl} alt={exercise.exercise.name} loading='lazy' />
                        <Stack direction={'column'}>
                            <Stack direction={'row'}>
                                <Button
                                    sx={{
                                        ml: '6px',
                                        color: '#fff',
                                        background: '#9765a7',
                                        fontSize: '14px',
                                        borderRadius: '20px',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {exercise.exercise.bodyPart}
                                </Button>
                                <Button
                                    sx={{
                                        ml: '6px',
                                        color: '#fff',
                                        background: '#6ea2e8',
                                        fontSize: '14px',
                                        borderRadius: '20px',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {exercise.exercise.target}
                                </Button>
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
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Remove Exercise
                                    </Typography>
                                </Button>
                            </Stack>
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    textAlign: 'center',
                                }}
                            >
                                {exercise.exercise.name}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}

export default SingleWorkoutPlan
