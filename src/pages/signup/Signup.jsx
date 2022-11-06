import { Done, Error } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, Grid, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'

export default function Signup() {

    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isUnique, setIsUnique] = useState(false)

    const staticUserRef = '123'

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef1 = useRef()
    const passwordRef2 = useRef()

    const navigate = useNavigate()
    const location = useLocation()

    async function HandleSubmit(e) {
        e.preventDefault()
        const pass1 = passwordRef1.current.value
        const pass2 = passwordRef2.current.value
        if (pass1 === pass2) {
            setIsDisabled(!isDisabled)
            setLoading(true)
            console.log(pass1, pass2)
            console.log('submitted!')
        }

        else {
            setOpenSnack(!openSnack)
            setSnackText("Passwords don't match")
        }
    }

    function CheckUsername(event) {
        if (event.target.value === staticUserRef) {
            setIsDisabled(false)
            setIsUnique(true)
        }
        else {
            setOpenSnack(!openSnack)
            setIsUnique(false)
            setIsDisabled(true)
            setSnackText("Please choose a different username")
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
                    <Alert severity="error" variant='filled'>{snackText}</Alert>
                </Snackbar>

                <Stack sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 500 }} component='span' variant='h2'>HIAM</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }} variant='h6'>LIVE AND INTERACTIVE</Typography>
                </Stack>

                <Box sx={{ width: { sm: '85%', lg: '30%' } }} >
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <Stack gap={5} direction={'column'}>
                            <TextField onChange={CheckUsername} inputRef={usernameRef} label="Username" variant="standard" placeholder='Select a unique username' required InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {isUnique == true ? <Done sx={{ color: 'green' }} /> : <Error sx={{ color: 'red' }} />}
                                    </InputAdornment>
                                ),
                            }} />
                            <TextField inputRef={emailRef} label="email" variant="standard" type="email" required />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField inputRef={passwordRef1} label="Password" type="password" variant="standard" required />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField inputRef={passwordRef2} label="Confirm Password" type="password" variant="standard" required />
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
