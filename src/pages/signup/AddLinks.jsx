import { Google, Instagram, LinkedIn, NavigateNext } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, Card, CircularProgress, Divider, Grid, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'

export default function AddLinks() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserlink'

    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()

    const linkedInRef = useRef()
    const googleRef = useRef()
    const instagramRef = useRef()
    const personalWebRef = useRef()

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()


    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };

    async function PushLinks(e) {
        e.preventDefault()

        if (linkedInRef.current.value && googleRef.current.value && instagramRef.current.value && personalWebRef.current.value) {

            let form = new FormData()
            form.append('belongsTo', userId)
            form.append('name', 'linkedIn')
            form.append('link', linkedInRef.current.value)

            let form1 = new FormData()
            form.append('belongsTo', userId)
            form.append('name', 'G-mail')
            form.append('link', googleRef.current.value)

            let form2 = new FormData()
            form.append('belongsTo', userId)
            form.append('name', 'Instagram')
            form.append('link', instagramRef.current.value)

            let form3 = new FormData()
            form.append('belongsTo', userId)
            form.append('name', 'Personal Website')
            form.append('link', personalWebRef.current.value)

            setIsLoading(true)
            setIsDisabled(true)


            axios.all([
                axios.post(baseURL, { belongsTo: userId, name: 'linkedIn', link: linkedInRef.current.value }, axiosConfig),
                axios.post(baseURL, { belongsTo: userId, name: 'G-mail', link: googleRef.current.value }, axiosConfig),
                axios.post(baseURL, { belongsTo: userId, name: 'Instagram', link: instagramRef.current.value }, axiosConfig),
                axios.post(baseURL, { belongsTo: userId, name: 'Personal Website', link: personalWebRef.current.value }, axiosConfig)

            ])
                .then(axios.spread((res) => { navigate('/singupcomplete') })).catch(err => { console.log(err); setIsLoading(false); setIsDisabled(false) })
        }
        else {
            setOpenSnack(true)
            setSnackText('Fill all the Links')
            setSeverity('error')
        }
    }

    useEffect(() => {

        if (localStorage.getItem('UserID') || localStorage.getItem('Access')) {
            setUserId(JSON.parse(localStorage.getItem('UserID')))
            setAccessToken(localStorage.getItem('Access'))
        }
        else {
            console.log('NO UID FOUND!')
        }
    }, [])

    return (
        <>

            <Fade>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '80%' }, m: 'auto', marginTop: '5vh', marginBottom: { xs: '5vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>

                    <Snackbar
                        open={openSnack}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={() => setOpenSnack(!openSnack)}>
                        <Alert severity={severity} variant='filled'>{snackText}</Alert>
                    </Snackbar>

                    <Typography sx={{ fontWeight: '500', fontSize: { xs: '2.5rem', lg: '4rem' } }} variant='h2' component="div">WELCOME TO HIAM
                        <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER YOUR DETAILS TO MAKE YOUR PROFILE</Typography>
                    </Typography>

                    <Divider sx={{ width: '100%' }} />


                    {/* SKILLS HERE */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '100%', lg: '100%' }, marginTop: '0vh', marginBottom: { xs: '1vh', lg: '0vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>

                        <Grid container sx={{ width: '100%', }}>

                            <Grid xs={12} md={10} item >
                                <Typography sx={{ fontWeight: '500', fontSize: { xs: '1.5rem', lg: '2.5rem' } }} variant='h4' component="div">ADD LINKS
                                    <Typography sx={{ fontWeight: '500', color: 'grey', fontSize: '0.75rem' }} variant='subtitle2'>YOUR LINKS WILL BE AUTOMATICALLY SORTED</Typography>

                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid container sx={{ width: '100%', height: "auto" }} gap={{ xs: 5, md: 5 }}>
                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <LinkedIn />
                                </Avatar>
                                <TextField inputRef={linkedInRef} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="http://linkedin.com/haseebqureshisihere" variant="standard" required />
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                <Avatar sx={{ bgcolor: ' #DB4437' }}>
                                    <Google />
                                </Avatar>
                                <TextField inputRef={googleRef} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="qureshihaxeeb2@gmail.com" variant="standard" required />
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                <Avatar sx={{ background: 'linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)' }}>
                                    <Instagram />
                                </Avatar>
                                <TextField inputRef={instagramRef} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="https://instagram.com/haseebxqureshi" variant="standard" required />
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                </Avatar>
                                <TextField inputRef={personalWebRef} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="https://yourpersonalwebsite.com" variant="standard" required />
                            </Card>
                        </Grid>

                    </Grid>

                    {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 0 } }}>
                        <Button onClick={(e) => PushLinks(e)} disabled={isDisabled} sx={{ float: 'right' }} size="large" variant='contained' endIcon={<NavigateNext sx={{ color: 'white' }} />}>FINISH</Button>

                        <Box sx={{ width: { xs: '10%', md: '1%' }, height: 'auto', mr: 'auto', ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <img style={{ width: '100%', height: 'auto' }} src="/images/party-emoji-png.png" alt="" />
                        </Box>

                    </Box> : <Box sx={{ width: '100%' }}>
                        <CircularProgress sx={{ float: 'right', m: 'auto', textAlign: 'center' }} />
                    </Box>
                    }

                </Box>

            </Fade>

        </>
    )
}
