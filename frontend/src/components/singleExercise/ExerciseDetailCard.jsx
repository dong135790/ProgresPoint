import React from 'react'
import { Box, capitalize, Stack, Typography } from '@mui/material'

const ExerciseDetailCard = ({ singleExercise }) => {
    console.log(singleExercise.equipment)
    return (
        <Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent={'space-evenly'}
                spacing={4}
            >
                <Box
                    component='img'
                    src={singleExercise.gifUrl}
                    alt={singleExercise.name}
                    sx={{
                        maxWidth: '100%',
                        height: { xs: '500px', md: '600px', lg: '600px' },
                        objectFit: 'contain'
                    }}
                ></Box>
                <Stack
                    direction={'column'}
                    ml={30}
                    p={4}
                    justifyContent={'space-evenly'}
                >
                    <Typography
                        fontWeight={600}
                        fontSize={30}
                        textTransform={'capitalize'}
                        textAlign={'center'}
                    >
                        {singleExercise.name}
                    </Typography>
                    <Typography
                        fontWeight={400}
                    >
                        {singleExercise.description}
                    </Typography>
                    <Typography
                        fontWeight={600}
                        fontSize={20}
                    >
                        Instructions
                    </Typography>
                    <Stack
                        spacing={1}
                    >
                        {singleExercise.instructions.map((data, index) => (
                            <Typography key={index}>{index + 1}. {data}</Typography>
                        ))
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ExerciseDetailCard