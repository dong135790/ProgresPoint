import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import WorkoutExerciseList from '../components/workoutPlan/WorkoutExerciseList'
import SingleWorkoutPlan from '../components/workoutPlan/SingleWorkoutPlan'

const WorkoutPlanPage = ({ exercises, workoutData, workoutPlanId, setWorkoutPlanId }) => {

    const [plans, setPlans] = useState([])
    const [workoutIndex, setWorkoutIndex] = useState(0);

    const workoutPlan = async () => {
        const res = await fetch('http://localhost:8080/api/plan');
        const data = await res.json();
        setPlans(data);
        // setWorkoutPlanId(data[0].id)
        console.log(data[0].id)
        // console.log("Fetched plans:", data); // <-- Add this

    }
    useEffect(() => {
        workoutPlan();
        console.log("WorkoutPlan ID"+workoutPlanId)
    }, [workoutPlanId])

    if (!workoutData) {
        return (
            <div>Loading workout data...</div>
        )
    }

    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'}>
                {/* Left Side */}
                <Box
                    sx={{
                        mt: '80px',
                        width: '200px',
                        border: 'solid',
                        height: '50vh',
                        borderRadius: '20px'

                    }}
                >
                    <Stack>
                        {workoutData.map((data, index) => (
                            <Button
                                key={index}
                                value={index}
                                sx={{
                                    bgcolor: 'white',
                                    border: 'solid',
                                    borderRadius: '20px'
                                }}
                                onClick={() => {
                                    setWorkoutIndex(index)
                                    setWorkoutPlanId(data.id)
                                }}
                            >
                                {data.name}
                            </Button>
                        )
                        )}
                    </Stack>
                </Box>
                {/* Right Side */}
                <Box sx={{}}>
                    <SingleWorkoutPlan
                        workoutPlan={workoutPlan}
                        plans={plans}
                        workoutIndex={workoutIndex}
                        workoutPlanId={workoutPlanId}
                    />
                </Box>
            </Box>
            <Box mt={20}>
                <WorkoutExerciseList 
                    workoutPlan={workoutPlan}
                    workoutIndex={workoutIndex}
                    exercises={exercises}
                    workoutPlanId={workoutPlanId}
                />
            </Box>
        </Box>
    )
}

export default WorkoutPlanPage