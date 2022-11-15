import { NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "../../components/AnimationEngine";

export default function MakeUserProfile() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserprofile'

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const [profilePic, setProfilePic] = useState()
    const fnameRef = useRef()
    const lnameRef = useRef()
    const biographyRef = useRef()
    const positionRef = useRef()
    const experienceRef = useRef()
    const qualificationRef = useRef()
    const locationRef = useRef()

    const [dp, setDp] = useState()

    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()

    useEffect(() => {
        if (localStorage.getItem('UserID') || localStorage.getItem('Access')) {
            setUserId(JSON.parse(localStorage.getItem('UserID')))
            setAccessToken(localStorage.getItem('Access'))
        }
        else {
            console.log('NO UID FOUND!')
            setOpenSnack(true)
            setSeverity("error")
            setSnackText("FATAL ERROR! UID/ACCESS TOKEN WAS NOT FOUND!")
        }
    }, [])

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };

    async function HandleSubmit(e) {
        e.preventDefault()
        if (dp != null) {
            let form = new FormData()
            form.append('belongsTo', userId)
            form.append('fname', fnameRef.current.value)
            form.append('lname', lnameRef.current.value)
            form.append('position', positionRef.current.value)
            form.append('experience', experienceRef.current.value)
            form.append('qualification', qualificationRef.current.value)
            form.append('biography', biographyRef.current.value)
            form.append('location', locationRef.current.value)
            form.append('profilePicture', profilePic)
            console.log(profilePic)

            setIsDisabled(true)
            setIsLoading(true)
            await axios.post(baseURL, form, axiosConfig).then(res => {
                console.log('submitted!')
                setOpenSnack(true)
                setSeverity("success")
                setSnackText("Success!")
                navigate('/addexperience')
            }).catch(res => {
                {
                    console.log(res); console.log('Not submitted!')
                    setOpenSnack(true)
                    setSeverity("error")
                    setSnackText("COULDN'T LOG YOU IN!")
                }
            })

        }
        else {
            console.log('Not submitted!')
            setOpenSnack(true)
            setSeverity("error")
            setSnackText("Choose a Profile Picture!")
        }
    }

    function LiveDp(event) {
        setProfilePic(event.target.files[0])
        console.log(profilePic)
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setDp(e.target.result)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

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

                    <Typography sx={{ fontWeight: '500' }} variant='h2' component="div">WELCOME TO HIAM
                        <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER YOUR DETAILS TO MAKE YOUR PROFILE</Typography>
                    </Typography>

                    <Divider sx={{ width: '100%' }} />

                    <form onSubmit={(e) => HandleSubmit(e)}>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                            <Grid container sx={{ flex: 2, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={fnameRef} sx={{ width: '100%' }} label="FIRST NAME" placeholder="HASEEB" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={lnameRef} sx={{ width: '100%' }} label="LAST NAME" placeholder="QURESHI" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={10} >
                                    <TextField inputRef={biographyRef} multiline sx={{ width: '100%' }} label="BIOGRAPHY" InputLabelProps={{ shrink: true }} placeholder="I AM A HARDWORKING INDIVIDUAL WITH A  SET OF SKILLS THAT..." variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={6} >
                                    <TextField inputRef={positionRef} sx={{ width: '100%' }} label="POSITION" placeholder="FULL STACK DEVELOPER" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={4} >
                                    <TextField inputRef={experienceRef} sx={{ width: '100%' }} label="YEARS OF EXPERIENCE" placeholder="2" InputLabelProps={{ shrink: true }} variant="outlined" type="number" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={qualificationRef} sx={{ width: '100%' }} label="HIGHEST QUALIFICATION" placeholder="BCA" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={locationRef} sx={{ width: '100%' }} label="LOCATION" InputLabelProps={{ shrink: true }} placeholder="INDIA" variant="outlined" required />
                                </Grid>
                            </Grid>

                            <Box sx={{ flex: 1, mb: { xs: 5, lg: 0 } }}>
                                <Stack sx={{ justifyContent: 'center', alignItems: 'center' }} direction={'column'} gap={5}>
                                    <Avatar src={dp} sx={{ height: 200, width: 200 }} />
                                    <Button onChange={LiveDp} variant="outlined" component="label">
                                        + ADD PROFILE PICTURE
                                        <input type="file" accept="image/png, image/gif, image/jpeg" hidden />
                                    </Button>
                                </Stack>
                            </Box>

                        </Box>

                        {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 0 } }}>
                            <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' endIcon={<NavigateNext sx={{ color: 'white' }} />}>NEXT</Button>
                        </Box> : <Box sx={{ width: '100%' }}>
                            <CircularProgress sx={{ float: 'right', textAlign: 'center' }} />
                        </Box>
                        }
                    </form>

                </Box>
            </Fade>
        </>
    )
}
