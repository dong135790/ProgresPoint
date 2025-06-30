import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import WorkoutExerciseList from '../components/workoutPlan/WorkoutExerciseList'
import SingleWorkoutPlan from '../components/workoutPlan/SingleWorkoutPlan'

const WorkoutPlanPage = ({ exercises }) => {

    const [plans, setPlans] = useState([])
    const [workoutIndex, setWorkoutIndex] = useState(0);

    const workoutPlan = async () => {
        const res = await fetch('http://localhost:8080/api/plan');
        const data = await res.json();
        setPlans(data);
        console.log("Backend Api ran")
        console.log(data)
    }
    useEffect(() => {
        workoutPlan();
    }, [])
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
                        {plans.map((data, index) => (
                            <Button
                                key={index}
                                value={index}
                                sx={{
                                    bgcolor: 'white',
                                    border: 'solid',
                                    borderRadius: '20px'
                                }}
                                onClick={() => setWorkoutIndex(index)}
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
                        workoutPlan={workoutPlan} plans={plans} workoutIndex={workoutIndex}
                        />
                </Box>
            </Box>
            <Box mt={20}>
                <WorkoutExerciseList workoutPlan={workoutPlan} workoutIndex={workoutIndex} exercises={exercises} />
            </Box>
        </Box>
    )
}

export default WorkoutPlanPage