import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade, FadeUp } from '../../components/AnimationEngine'

export default function Landing() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/token/refresh/'

    const [animate, setAnimate] = useState(true)
    const navigate = useNavigate()

    const [isAuth, setIsAuth] = useState(false)

    useState(() => {
        setTimeout(() => {
            setAnimate(!animate)
        }, 3000)
    }, [])


    function AutoLogin() {
        axios.post(baseURL, { refresh: localStorage.getItem('Refresh') })
            .then(res => {
                localStorage.setItem('Access', res.data.access);
                console.log('AutoLogin was Successful');
                setIsAuth(true);
                return navigate('/home')
            })
            .catch(res => {
                console.log('AutoLogin Failed!');
                setIsAuth(null);
                return navigate('/')
            })

    }


    useEffect(() => {
        if (localStorage.getItem('Refresh')) {
            AutoLogin()
        }
    }, [])

    return (
        <>
            <Fade>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '5vh', height: "95vh", justifyContent: "center", alignItems: "center" }} gap={10}>

                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 500 }} component='strong' variant='h2'>HIAM</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE & INTERACTIVE</Typography>
                    </Stack>

                    <AnimatePresence mode='wait'>
                        {animate == true ?
                            <FadeUp key={animate}>
                                <Stack sx={{ textAlign: 'center', width: { xs: '85%', lg: '100%' }, m: 'auto' }}>
                                    <Typography sx={{ fontWeight: 500 }} variant='h4'>LIVE RESUMES</Typography>
                                    <img src="/images/landing_temp.png" alt="" />
                                    <Typography sx={{ fontWeight: 500 }} variant='h6'>IN</Typography>
                                    <Typography sx={{ fontWeight: 500 }} variant='h4'>15 MINS</Typography>
                                </Stack>
                            </FadeUp> : <FadeUp key={animate}>
                                <Stack gap={10}>
                                    <Button onClick={() => navigate('/signup')} sx={{ padding: { xs: '5px 60px', lg: '5px 100px' } }} variant="contained" >MAKE YOUR FREE RESUME</Button>
                                    <Button onClick={() => navigate('/login')} sx={{ padding: { xs: '5px 60px', lg: '5px 100px' } }} variant="outlined" >LOG INTO YOUR ACCOUNT</Button>
                                </Stack>
                            </FadeUp>}
                    </AnimatePresence>

                </Box>
            </Fade>
        </>
    )
}
