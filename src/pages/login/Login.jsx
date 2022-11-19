import { Alert, Box, Button, CircularProgress, LinearProgress, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'
import TokenDecoder from '../../components/TokenDecoder'
import { RefreshContext } from '../../context/RefreshContext'

export default function Login() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/token/'

    const usernameRef = useRef()
    const passwordRef = useRef()

    const { update, setUpdate } = useContext(RefreshContext)

    const [isDisabled, setIsDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const navigate = useNavigate()
    const location = useLocation()

    async function HandleSubmit(e) {
        e.preventDefault()
        let form = new FormData()
        form.append('username', usernameRef.current.value)
        form.append('password', passwordRef.current.value)
        setIsDisabled(!isDisabled);
        setLoading(true)

        await axios.post(baseURL, form).then(res => {
            localStorage.setItem('Access', res.data.access)
            localStorage.setItem('Refresh', res.data.refresh)
            TokenDecoder()
            setUpdate(update + 1)
            navigate('/home')
        }).catch(res => {
            setIsDisabled(false);
            setLoading(false);
            setOpenSnack(true)
            setSnackText("INVALID USERNAME OR PASSWORD!")
            setSeverity('error')
        })
    }

    return (
        <Fade key={location.pathname}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', pt: '5vh', minHeight: "100vh", justifyContent: "center", alignItems: "center" }} gap={10}>

                <Snackbar
                    open={openSnack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnack(!openSnack)}>
                    <Alert severity={severity} variant='filled'>{snackText}</Alert>
                </Snackbar>

                <Stack sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '5rem' }} component='strong' variant='h2'>HIAM</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE AND INTERACTIVE</Typography>
                </Stack>

                <Box sx={{ width: { sm: '85%', lg: '30%' } }} >
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <Stack gap={5} direction={'column'}>
                            <TextField inputRef={usernameRef} label="Username" InputLabelProps={{ shrink: true }} placeholder='Enter Your Username' variant="outlined" required />
                            <TextField inputRef={passwordRef} label="Password" InputLabelProps={{ shrink: true }} placeholder='Enter Your Password' type="password" variant="outlined" required />
                            <Button disabled={isDisabled} type="submit" sx={{ padding: '5px 90px' ,fontWeight:700 }} variant="contained" >LOGIN</Button>
                        </Stack>
                    </form>

                    {loading == false ? <Stack sx={{ gap: 5, textAlign: 'center', mt: 5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 700, }} variant="subtitle1">OR</Typography>
                        <Button onClick={() => navigate('/signup')} sx={{ padding: '5px 90px',fontWeight:700 }} variant="outlined" >MAKE A NEW ACCOUNT</Button>
                    </Stack> : <Box sx={{ minWidth: { xs: '90vw', md: '10vw', lg: '10vw' }, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
                        {loading === true ? <CircularProgress /> : null}
                    </Box>}

                </Box>
            </Box>
        </Fade>
    )
}
