import { Box, Button, CircularProgress, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'

export default function Login() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

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
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '5vh', height: "95vh", justifyContent: "center", alignItems: "center" }} gap={10}>

                <Stack sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 500 }} component='span' variant='h2'>HIAM</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE AND INTERACTIVE</Typography>
                </Stack>

                <Box sx={{ width: { sm: '85%', lg: '30%' } }} >
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <Stack gap={5} direction={'column'}>
                            <TextField label="Username" variant="outlined" required />
                            <TextField label="Password" type="password" variant="outlined" required />
                            <Button disabled={isDisabled} type="submit" sx={{ padding: '5px 90px' }} variant="contained" >LOGIN</Button>
                        </Stack>
                    </form>

                    {loading == false ? <Stack sx={{ gap: 5, textAlign: 'center', mt: 5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: "Roboto", fontWeight: 700, }} variant="p">OR</Typography>
                        <Button onClick={()=> navigate('/signup')} sx={{ padding: '5px 90px' }} variant="outlined" >MAKE A NEW ACCOUNT</Button>
                    </Stack> : <Box sx={{minWidth:{xs:'90vw',md:'10vw',lg:'10vw'} ,display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                        {loading === true ? <CircularProgress /> : null}
                    </Box>}

                </Box>
            </Box>
        </Fade>
    )
}
