import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import BannerImg from '../assets/running_banner.png'
import '../App.css'

const HomePage = () => {
  return (
    <Box>
        <Box>
            <Typography variant="h4" fontWeight={500} fontSize={30}>
                Progress Point
            </Typography>
            <Typography fontWeight={500} fontSize={45} style={{ paddingTop: '50px'}}>
                Discipline and Dedication <br /> Over Motivation
            </Typography>
            <Typography mt={1} mb={2} lineHeight={'35px'} fontWeight={400}>
                Talent is something you make bloom, instinct is something you polish.
            </Typography>
            <Link to="/exercise">
                <Button variant="contained" sx= {{textTransform: 'none'}}>Explore Exercise</Button>
            </Link>
        </Box>
      <img src={BannerImg} alt='banner' className='hero-banner-img' ></img>
    </Box>
  )
}

export default HomePage
