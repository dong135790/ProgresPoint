import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Stack, Typography, Button, Checkbox } from '@mui/material'

const WorkoutSessionStart = ({ workoutPlan, workoutPlanId }) => {
    const [completed, setCompleted] = useState(new Set());
    const { id } = useParams();
    console.log(workoutPlan);

    const toggleComplete = (index) => {
        const updated = new Set(completed);
        if (updated.has(index)) {
            updated.delete(index);
        } else {
            updated.add(index);
        }
        setCompleted(updated);
    };
    useEffect(() => {
        const fetchPlan = async () => {
            const response = await fetch(`http://localhost:8080/api/plan/${workoutPlanId}`);
            const data = await response.json();
        };

        fetchPlan();
    }, [id]);

    if (!workoutPlan) {
        return (<div>Workout Plan loading...</div>)
    }
    return (
        <Box>
            <Typography variant="h4" textAlign="center" mb={3}>
                {workoutPlan.name}
            </Typography>
            <Stack
                direction={'column'}
                gap={3}
            >
                {workoutPlan.exerciseList.map((data, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: 'solid',
                            borderColor: '#fff',
                            borderRadius: '20px',
                            height: '12vh',
                            bgcolor: '#fff',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            overflow: 'hidden',
                            bgcolor: completed.has(index) ? '#a5d6a7' : '#fff'
                        }}
                    >
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            sx={{
                                flex: 1, minWidth: 0
                            }}
                            gap={10}
                        >
                            <Box
                                sx={{ width: '90px', height: '90%' }}
                            >
                                <img
                                    src={data.exercise.gifUrl}
                                    alt={data.exercise.name}
                                    loading='lazy'
                                    style={{
                                        height: '100%',
                                        objectFit: 'contain',
                                        width: '100%',
                                    }}
                                />
                            </Box>
                            <Stack direction={'column'}>
                                <Typography
                                    sx={{
                                        color: 'black'
                                    }}
                                >
                                    Reps: {data.reps}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'black'
                                    }}
                                >
                                    Sets: {data.sets}
                                </Typography>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography sx={{
                                    color: 'black',
                                    textTransform: 'capitalize'

                                }}>
                                    Body Part:
                                </Typography>
                                <Typography sx={{
                                    color: 'black',
                                    textTransform: 'capitalize'

                                }}>
                                    {data.exercise.bodyPart}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'black',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {data.exercise.target}
                                </Typography>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography
                                    sx={{
                                        color: 'black',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    Secondary Muscles:
                                </Typography>
                                {data.exercise.secondaryMuscles.map((muscle) => (
                                    <Typography
                                        key={muscle}
                                        sx={{
                                            color: 'black',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {muscle}
                                    </Typography>
                                ))}
                            </Stack>
                            <Stack
                                direction={'column'}
                            >
                                <Typography
                                    sx={{
                                        color: 'black',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    Equipment:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'black',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {data.exercise.equipment}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Button
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: '600',
                                fontSize: '18px',
                                mr: '10px',
                                border: 1,
                                width: '100px'
                            }}
                            onClick={() => toggleComplete(index)}
                        >
                            {completed.has(index) ? 'Undo' : 'Complete'}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default WorkoutSessionStart;
