import React from 'react'
import { useState } from 'react'
import { Box, Button, Stack, TextField, Typography} from '@mui/material'

const SearchBar = () => {
    // Allows user to actually type input in search bar and computer updates it
    const [search, setSearch] = useState('')
  return (
    <>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={2}>
            <Typography
                fontWeight={600}
                sx={{ fontSize: { lg: '44px', xs: '30px'}}}
                textAlign={'center'}
                >
                Discover your Exercise!
            </Typography>
            <Box 
                position='relative' 
                mt='50px'
                display= 'flex'
                flexDirection='row'
                >
                <TextField
                    sx={{ width: { lg: '900px', xs: '500px'}}}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Exercise'
                    type='text'
                    style={{
                        backgroundColor: 'White',
                        border: 'none',
                        borderRadius: '10px 0px 0px 10px',
                        height: '55px'
                    }}
                />
                <Button 
                position='absolute'
                backgroundColor= 'blue'
                color='blue'
                sx={{ 
                    width: { lg: '120px', xs: '90px'},
                    bgcolor: '#20B2AA',
                    textTransform: 'none',
                    borderRadius: 'none',
                    height: '55px',
                    fontWeight: '500px',
                    fontSize: '20px'
                }}
                onClick={() => console.log('Searching for: ', search)}
                >
                    Search
                </Button>
            </Box>
        </Stack>
    </>
  )
}

export default SearchBar