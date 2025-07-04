import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'

const NavBar = () => {
  return (
    <Box 
        sx={{ 
            position: 'fixed',
            top: '0',
            width: '50%',
            height: '60px',
            zIndex: '100',
            py: 2,
            px: { xs: 2, sm: 4},
            m: 'auto'
            }}
        >
        <Stack 
            direction={'row'}
            justifyContent={'space-around'}
            sx={{ gap: {sm: '122px', xs: '40px'}, mt: {sm: '32px', xs: '20px'}, justifyContent: 'none', paddingX: 16}}>
            <Stack 
                direction={'row'}
                gap={'40px'}
                fontSize={'24px'}
                alignItems={'flex-end'}
            >
                <Link className='navTextColor hover-underline' to="/">
                    <Typography
                        fontWeight={600}
                        fontSize={20}
                    >
                        Home
                    </Typography>
                </Link>
                <Link className='navTextColor hover-underline'to="/exercise">
                    <Typography
                        fontWeight={600}
                        fontSize={20}
                    >
                        Exercises
                    </Typography>
                </Link>
                <Link className='navTextColor hover-underline' to="/plan">
                    <Typography
                        fontWeight={600}
                        fontSize={20}
                    >
                        myPlan
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    </Box>
  )
}

export default NavBar
