import { NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "../../../components/AnimationEngine";

export default function EditProject() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserproject'

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const [profilePic, setProfilePic] = useState()
    const nameRef = useRef()
    const roleRef = useRef()
    const responsibilitiesRef = useRef()
    const basedOnRef = useRef()
    const releaseDateRef = useRef()
    const projectLinkRef = useRef()

    const [dp, setDp] = useState('/src/assets/images/project_default.jpg')

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
        if (profilePic != null) {
            let form = new FormData()
            form.append('belongsTo', userId)
            form.append('name', nameRef.current.value)
            form.append('role', roleRef.current.value)
            form.append('basedOn', basedOnRef.current.value)
            form.append('releaseDate', releaseDateRef.current.value)
            form.append('responsibilities', responsibilitiesRef.current.value)
            form.append('projectLink', projectLinkRef.current.value)
            form.append('projectImage', profilePic)
            console.log(profilePic)

            setIsDisabled(true)
            setIsLoading(true)
            await axios.post(baseURL, form, axiosConfig).then(res => {
                console.log('submitted!')
                setOpenSnack(true)
                setSeverity("success")
                setSnackText("Success!")
                navigate('/allprojects')
            }).catch(res => {
                {
                    setIsDisabled(false)
                    setIsLoading(false)
                    console.log(res); console.log('Not submitted!')
                    setOpenSnack(true)
                    setSeverity("error")
                    setSnackText("COULDN'T ADD PROJECT!")
                }
            })

        }
        else {
            console.log('Not submitted!')
            setOpenSnack(true)
            setSeverity("error")
            setSnackText("Choose a Project Picture!")
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

                    <Typography sx={{ fontWeight: '500', fontSize: { xs: '3rem', lg: '3rem' } }} variant='h2' component="div">ADD NEW PROJECT
                        <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER PROJECT DETAILS TO ADD IT TO YOUR PROFILE</Typography>
                    </Typography>

                    <Divider sx={{ width: '100%' }} />

                    <form onSubmit={(e) => HandleSubmit(e)}>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                            <Grid container sx={{ flex: 2, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                <Grid item xs={12} lg={10} >
                                    <TextField inputRef={nameRef} sx={{ width: '100%' }} label="PROJECT NAME" placeholder="HIAM" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={roleRef} sx={{ width: '100%' }} label="ROLE" placeholder="CREATOR" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={releaseDateRef} sx={{ width: '100%' }} label="RELEASE DATE" InputLabelProps={{ shrink: true }} placeholder="12/12/12" variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={10} >
                                    <TextField inputRef={responsibilitiesRef} multiline sx={{ width: '100%' }} label="CONTRIBUTIONS" InputLabelProps={{ shrink: true }} placeholder="I AM A HARDWORKING INDIVIDUAL WITH A  SET OF SKILLS THAT..." variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={basedOnRef} sx={{ width: '100%' }} label="BASED ON " placeholder="REACT" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={projectLinkRef} sx={{ width: '100%' }} label="PROJECT LINK " InputLabelProps={{ shrink: true }} placeholder="http://hiam.dev" variant="outlined" required />
                                </Grid>
                            </Grid>

                            <Box sx={{ flex: 1, mb: { xs: 5, lg: 0 } }}>
                                <Stack sx={{ justifyContent: 'center', alignItems: 'center' }} direction={'column'} gap={5}>
                                    <Avatar variant="square" src={dp} sx={{ height: 200, width: 220 }} />
                                    <Button onChange={LiveDp} variant="outlined" component="label">
                                        + ADD A PROJECT SCREEN
                                        <input type="file" accept="image/png, image/gif, image/jpeg" hidden />
                                    </Button>
                                </Stack>
                            </Box>

                        </Box>

                        {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 5 } }}>
                            <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' endIcon={<NavigateNext sx={{ color: 'white' }} />}>ADD PROJECT</Button>
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
