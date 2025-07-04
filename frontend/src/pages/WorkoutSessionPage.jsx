import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Typography, Button } from '@mui/material'

import WorkoutSessionStart from '../components/workoutPlan/WorkoutSessionStart'

const WorkoutSessionPage = ({ workoutData, workoutPlanId }) => {
    const { id } = useParams();
    const workoutPlan = workoutData[parseInt(id)]

    if (!workoutData) return <div>Workout not found</div>;

    return (
        <Box>
            <WorkoutSessionStart workoutPlan={workoutPlan} workoutPlanId={workoutPlanId}/>
        </Box>
    )
}

export default WorkoutSessionPage