import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import BannerImg from '../assets/running_banner.png'
import '../App.css'

const HomePage = () => {
  return (
<Container>
  <Box
    display="flex"
    flexDirection={{ xs: 'column', md: 'row' }}
    alignItems="center"
    justifyContent="space-between"
    gap={4}
  >
    {/* Text Section */}
    <Box flex={1}>
      <Typography variant="h4" fontWeight={500} fontSize={30}>
        Progress Point
      </Typography>
      <Typography fontWeight={500} fontSize={45} sx={{ pt: 6 }}>
        Discipline, Dedication, and Consistency
      </Typography>
      <Typography mt={1} mb={2} lineHeight={'35px'} width={'500px'} fontWeight={400}>
        Talent is something you make bloom, instinct is something you polish.
      </Typography>
      <Link to="/exercise">
        <Button variant="contained" sx={{ textTransform: 'none' }}>
          Explore Exercise
        </Button>
      </Link>
    </Box>
    {/* Image Section */}
    <Box flex={1} sx={{ textAlign: 'center' }}>
      <img src={BannerImg} alt="banner" className="hero-banner-img" />
    </Box>
  </Box>
</Container>

  )
}

export default HomePage
