import { Search } from '@mui/icons-material'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade, FadeUp } from '../../components/AnimationEngine'

export default function Landing() {

    const [animate, setAnimate] = useState(true)

    const navigate = useNavigate()

    useState(() => {
        setTimeout(() => {
            setAnimate(!animate)
        }, 3000)
    }, [])

    return (
        <>
            <Fade>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', pt: '2.5vh', height: "100vh", justifyContent: "center", alignItems: "center" }} gap={10}>

                    <AnimatePresence mode='wait'>
                        {animate == true ?
                            <FadeUp key={animate}>
                                <Stack sx={{ textAlign: 'center', width: { xs: '85%', lg: '100%' }, m: 'auto' }}>
                                    <Typography sx={{ fontWeight: 700 }} variant='h3' component="strong">LIVE RESUMES</Typography>
                                    <img src="/images/hiam-mockup.png" alt="" />
                                    <Typography sx={{ color: 'text.secondary', fontWeight: 500 }} variant='h6'>IN</Typography>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 700 }} variant='h3'>15 MINS</Typography>
                                </Stack>
                            </FadeUp> : <FadeUp key={animate}>
                                <Stack sx={{ textAlign: 'center' }} gap={8}>

                                    <Stack sx={{ textAlign: 'center' }}>
                                        <Typography sx={{ fontWeight: 700, fontSize: '5rem' }} component='strong' variant='h2'>HIAM</Typography>
                                        <Typography sx={{ fontWeight: 700, color: 'text.secondary' }} variant='h6'>LIVE & INTERACTIVE</Typography>
                                    </Stack>
                                    <Button onClick={() => navigate('/signup')} sx={{ padding: { xs: '5px 60px', lg: '5px 100px' }, fontWeight: 700 }} variant="contained" >GET STARTED WITH HIAM</Button>

                                    {/* <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' }}>ALREADY HAVR AN ACCOUNT?</Typography> */}

                                    <Button onClick={() => navigate('/login')} sx={{ padding: { xs: '5px 60px', lg: '5px 100px' }, fontWeight: 700 }} variant="outlined" >LOG IN</Button>

                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary' }}>OR</Typography>

                                    <Stack sx={{ alignItems: 'center' }} gap={1}>
                                        <Avatar><Search /></Avatar>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'text.secondary' }}>SEARCH USERS</Typography>
                                    </Stack>


                                </Stack>
                            </FadeUp>}
                    </AnimatePresence>

                </Box>
            </Fade>
        </>
    )
}
