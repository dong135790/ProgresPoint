import React, { useState } from 'react'
import { useEffect } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'

const BodyPartList = ( {allExercises, setExercises} ) => {

    const [bodyPart, setBodyPart] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/api/exercises/bodyPartList")
        .then(res => res.json())
        .then(data => setBodyPart(data))
        .catch(error => console.error("Unable to find body part:" + error))
    }, [])

  return (
    <>
        <Stack 
            direction={'column'}
            alignItems={'center'}
            spacing={2}
            mt={8}
        >
            <Typography 
                textAlign={'center'}
                fontWeight={300}
                sx={{ fontSize: { lg: '30px', xs: '20px'}}}
            >
                Filter By Body Part
            </Typography>
            <Box 
                position={'relative'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                gap={2}
            >
                {bodyPart.map((body) => (
                    <Stack>
                        <Button 
                            sx={{ 
                                textTransform: 'capitalize',
                                color: '#FFF',
                                bgcolor: '#20B2AA',
                                border: 'solid',
                                height: '6vh',
                                width: '6vw',
                            }}
                            value={body}
                            key={body}
                            onClick={() => {
                                const filteredList = allExercises.filter(
                                    (exercises) => exercises.bodyPart.toLowerCase() == body.toLowerCase()
                                )
                                setExercises(filteredList)
                            }}
                        >
                            {body}
                        </Button>
                    </Stack>
                ))}
            </Box>
        </Stack>
    </>
  )
}

export default BodyPartList