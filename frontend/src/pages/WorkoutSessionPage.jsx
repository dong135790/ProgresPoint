import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Typography, Button } from '@mui/material'

import WorkoutSessionStart from '../components/workoutPlan/WorkoutSessionStart'

const WorkoutSessionPage = ({ plans }) => {
    const { id } = useParams();
    const workoutPlan = plans[parseInt(id)]

    if (!plans) return <div>Workout not found</div>;

    return (
        <Box>
            <WorkoutSessionStart workoutPlan={workoutPlan}/>
        </Box>
    )
}

export default WorkoutSessionPage