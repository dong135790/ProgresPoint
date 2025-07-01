import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Link, containerClasses } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SingleWorkoutPlan = ({ workoutPlan, plans, workoutIndex, workoutPlanId }) => {
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null)
    const [exerciseIndex, setExerciseIndex] = useState(0);

    const removeExercise = async (exerciseIndex) => {
        const result = await fetch(`http://localhost:8080/api/plan/remove/${workoutPlanId}/${exerciseIndex}`, {
            method: 'DELETE'
        })
        if (result.ok) {
            alert('Workout Deleted')
            workoutPlan()
        } else {
            alert('Could not delete exercise')
        }
    }
    useEffect(() => {
        if (plans.length > 0 && workoutIndex >= 0) {
            const desiredPlan = plans[workoutIndex]
            setPlan(desiredPlan)
        }
    }, [plans, workoutIndex])

    const handleStartWorkout = () => {
        navigate(`/workout/start/${workoutIndex}`);
    };

    if (!plan) {
        return <Typography>Loading plan...</Typography>
    }

    return (
        <Box>
            <Box
                sx={{
                    mb: 10,
                    position: 'relative',
                    textAlign: 'center'
                }}

            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: '20px',
                        textAlign: 'center',
                    }}
                >
                    {plan.name}
                </Typography>
                <Button
                    sx={{
                        position: 'absolute',
                        border: 1,
                        borderRadius: '20px',
                        textTransform: 'capitalize',
                        bgcolor: '#fff',
                        right: 0,
                        fontWeight: 400,
                        fontSize: '18px'
                    }}
                onClick={() => handleStartWorkout()}
                >
                    Begin Workout
                </Button>
            </Box>
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
                        <img src={exercise?.exercise?.gifUrl} alt={exercise?.exercise?.name} 
                            loading='lazy'
                            style={{ 
                                width: '100%',
                                maxWidth: '140px',
                                height: '140px',
                                objectFit: 'contain',
                                margin: '0 auto'
                            }}
                            />
                        <Stack direction={'column'}>
                            <Stack direction={'row'}>
                                <Button
                                    sx={{
                                        ml: '6px',
                                        color: '#fff',
                                        background: '#9765a7',
                                        fontSize: '14px',
                                        borderRadius: '20px',
                                        textTransform: 'capitalize',
                                        maxWidth: '120px'
                                    }}
                                >
                                    {exercise?.exercise?.bodyPart}
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
                                    {exercise?.exercise?.target}
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
                                    value={index}
                                    key={index}
                                    onClick={() => removeExercise(index)}
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
                                    textTransform: 'capitalize'
                                }}
                            >
                                {exercise?.exercise?.name}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}

export default SingleWorkoutPlan
