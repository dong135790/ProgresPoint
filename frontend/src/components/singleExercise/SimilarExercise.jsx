import React, { useRef } from 'react'
import { Box, Stack, Typography, IconButton, Divider, capitalize, colors } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom'

const SimilarExercise = ({ similarExercises }) => {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            let scrollDirection = 0;
            if (direction === 'left') {
                scrollDirection = -595
            } else {
                scrollDirection = 595
            }
            scrollRef.current.scrollBy({
                left: scrollDirection,
                behavior: 'smooth'
            })
        }
    }
    return (
        <Box mt={10}>
            <Divider sx={{ borderColor: '#dfe2e6' }} />
            <Typography
                mt={5}
                textAlign={'center'}
                fontWeight={800}
                fontSize={'20px'}
            >
                Similar Exercises
            </Typography>
            {/* This is the box to display exercises */}
            <Stack direction={'row'} overflow={'auto'} mt={5}>
                <IconButton onClick={() => scroll('left')}>
                    <ChevronLeftIcon sx={{ color: '#dfe2e6' }} />
                </IconButton>
                <Box
                    sx={{ overflowX: 'auto' }}
                    ref={scrollRef}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            width: '100%',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {similarExercises.map((data, index) => (
                            <Link
                                to={`/exercise/${data.id}`}
                            >
                                <Box
                                    component='img'
                                    src={data.gifUrl}
                                    alt={data.name}
                                    sx={{ height: { xs: '100px', m: '150px', lg: '200px' } }}
                                >
                                </Box>
                                <Typography
                                    textTransform={'capitalize'}
                                    color='#fff'
                                    textAlign={'center'}
                                >
                                    {data.name}
                                </Typography>
                            </Link>
                        ))}
                    </Box>
                </Box>
                <IconButton onClick={() => scroll('right')}>
                    <ChevronRightIcon sx={{ color: '#dfe2e6'}} />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default SimilarExercise