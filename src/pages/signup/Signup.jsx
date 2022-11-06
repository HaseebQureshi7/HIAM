import { Done, Error } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'

export default function Signup() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isUnique, setIsUnique] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    function HandleSubmit(e) {
        e.preventDefault()
        setIsDisabled(!isDisabled)
        setLoading(true)
        console.log('submitted!')
    }

    return (
        <Fade key={location.pathname}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '100%' }, m: 'auto', marginTop: '5vh', height: "95vh", justifyContent: "center", alignItems: "center" }} gap={5}>

                <Stack sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 500 }} component='span' variant='h2'>HIAM</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE AND INTERACTIVE</Typography>
                </Stack>

                <Box sx={{ width: { sm: '85%', lg: '30%' } }} >
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <Stack gap={5} direction={'column'}>
                            <TextField label="Username" variant="standard" placeholder='Select a unique username' required InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {isUnique == true ? <Done sx={{ color: 'green' }} /> : <Error sx={{ color: 'red' }} />}
                                    </InputAdornment>
                                ),
                            }} />
                            <TextField label="email" variant="standard" type="email" required />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="Password" type="password" variant="standard" required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Confirm Password" type="password" variant="standard" required />
                                </Grid>
                            </Grid>
                            <Button disabled={isDisabled} type="submit" sx={{ padding: '5px 90px' }} variant="contained" >SIGNUP</Button>
                        </Stack>
                    </form>

                    {loading == false ? <Stack sx={{ gap: 5, textAlign: 'center', mt: 5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: "Roboto", fontWeight: 700, }} variant="p">OR</Typography>
                        <Button onClick={() => navigate('/login')} sx={{ padding: '5px 90px' }} variant="outlined" >LOG INTO YOUR ACCOUNT</Button>
                    </Stack> : <Box sx={{ minWidth: { xs: '90vw', md: '10vw', lg: '10vw' }, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                        {loading === true ? <CircularProgress /> : null}
                    </Box>}

                </Box>
            </Box>
        </Fade>
    )
}
