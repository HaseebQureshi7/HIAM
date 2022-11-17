import { Done, Error } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, Grid, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'
import TokenDecoder from '../../components/TokenDecoder'
import { RefreshContext } from '../../context/RefreshContext'

export default function Signup() {

    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isUnique, setIsUnique] = useState(false)

    const { update, setUpdate } = useContext(RefreshContext)

    const [immediateError, setImmediateError] = useState()

    const checkUserURL = 'https://haseebxqureshi.pythonanywhere.com/api/checkuseravailability'
    const signUpURL = 'https://haseebxqureshi.pythonanywhere.com/api/signup'

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()

    const navigate = useNavigate()
    const location = useLocation()

    async function HandleSubmit(e) {
        e.preventDefault()
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const pass1 = passwordRef1.current.value
        const pass2 = passwordRef2.current.value

        if (pass1 === pass2) {
            setLoading(true)
            setIsDisabled(!isDisabled)
            await axios.post(signUpURL, { username: username, email: email, password: pass2 }).then(res => {
                navigate('/makeuserprofile')
                setLoading(false)
                setIsDisabled(!isDisabled)
                localStorage.setItem("Access", res.data.access)
                localStorage.setItem("Refresh", res.data.refresh)
                localStorage.setItem("Signup-mode", true)
                TokenDecoder()
                setUpdate(update + 1) // RefreshToken State Update
            }).catch(res => {
                setLoading(false)
                setIsDisabled(false)
                setSeverity("error")
                setOpenSnack(true)
                setSnackText("COULDN'T SIGN YOU IN!")
            })
        }

        else {
            setSeverity("error")
            setOpenSnack(!openSnack)
            setSnackText("Passwords don't match")
        }
    }

    async function CheckUsername(event) {
        if ((event.target.value).length >= 5) {

            await axios.post(checkUserURL, { username: event.target.value }).then(res => {
                setIsDisabled(false)
                setIsUnique(true)
                setOpenSnack(true)
                setSeverity("success")
                setSnackText(event.target.value + ' is Available')
            }).catch(res => {
                setImmediateError(res)
                setOpenSnack(true)
                setIsUnique(false)
                setSeverity("warning")
                setIsDisabled(true)
                setSnackText("THIS USERNAME IS ALREADY TAKEN!")
            })

        }
        else {
            setOpenSnack(true)
            setIsUnique(false)
            setSeverity("warning")
            setIsDisabled(true)
            setSnackText("USERNAME SHOULD BE OVER 5 CHARACTERS!")
        }
    }

    return (
        <Fade key={location.pathname}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '100%' }, m: 'auto', marginTop: '5vh', height: "95vh", justifyContent: "center", alignItems: "center" }} gap={5}>

                <Snackbar
                    open={openSnack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnack(!openSnack)}>
                    <Alert severity={severity} variant='filled'>{snackText}</Alert>
                </Snackbar>

                <Stack sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 500 }} component='strong' variant='h2'>HIAM</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE AND INTERACTIVE</Typography>
                </Stack>

                <Box sx={{ width: { sm: '85%', lg: '30%' } }} >
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <Stack gap={{ xs: 6, lg: 4 }} direction={'column'}>
                            <TextField onChange={CheckUsername} inputRef={usernameRef} label="Username" variant="outlined" InputLabelProps={{ shrink: true }} placeholder='Select a Unique Username' required InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {isUnique == true ? <Done sx={{ color: 'green' }} /> : <Error sx={{ color: 'red' }} />}
                                    </InputAdornment>
                                ),
                            }} />
                            <TextField inputRef={emailRef} label="email" InputLabelProps={{ shrink: true }} variant="outlined" placeholder='Enter Your Email' type="email" required />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField inputRef={passwordRef1} InputLabelProps={{ shrink: true }} label="Password" placeholder='Enter Password' type="password" variant="outlined" required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField inputRef={passwordRef2} InputLabelProps={{ shrink: true }} label="Confirm Password" placeholder='Confirm Password' type="password" variant="outlined" required />
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
