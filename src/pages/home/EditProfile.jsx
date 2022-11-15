import { Done, NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "../../components/AnimationEngine";
import { GetUID } from "../../components/GetUID";

export default function EditProfile() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserprofile'
    const viewProfileURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserprofile/'
    const editProfileURL = 'https://haseebxqureshi.pythonanywhere.com/api/edituserprofile/'
    const updateProfilePictureURL = 'https://haseebxqureshi.pythonanywhere.com/api/editprofilepicture/'

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()


    const [dpChanged, setDpChanged] = useState(false)

    const [userData, setUserData] = useState()

    const [isDiscoverable, setIsDiscoverable] = useState(true)

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

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            // 'Content-Type': 'multipart/form-data',
            // 'charset': "utf-8"
        }
    };

    async function UpdateDp() {
        // e.preventDefault()
        let form = new FormData()
        form.append('profilePicture', profilePic)

        // EDIT DP
        await axios.post(updateProfilePictureURL + GetUID(), form, axiosConfig).then(res => {
            console.log(res)
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
        }).catch(res => {
            {
                console.log(profilePic);
                console.log(res);
                setOpenSnack(true)
                setSeverity("error")
                setSnackText("UPDATE FAILED!")
                setIsDisabled(false)
                setIsLoading(false)
            }
        })
    }

    async function HandleSubmit(e) {
        e.preventDefault()
        let form = new FormData()
        form.append('isDiscoverable', isDiscoverable)
        form.append('fname', fnameRef.current.value)
        form.append('lname', lnameRef.current.value)
        form.append('position', positionRef.current.value)
        form.append('experience', experienceRef.current.value)
        form.append('qualification', qualificationRef.current.value)
        form.append('biography', biographyRef.current.value)
        form.append('location', locationRef.current.value)

        setIsDisabled(true)
        setIsLoading(true)

        // EDIT PROFILE
        await axios.put(editProfileURL + GetUID(), JSON.stringify(Object.fromEntries(form)), axiosConfig).then(res => {
            console.log(res)
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            // navigate('/')
            console.log(JSON.stringify(form))
        }).catch(res => {
            {
                console.log(res);
                // for (var pair of form.entries()) {
                //     console.log(pair[0] + ', ' + pair[1]);
                // }
                setOpenSnack(true)
                setSeverity("error")
                setSnackText("UPDATE FAILED!")
                setIsDisabled(false)
                setIsLoading(false)
            }
        })

        if (dpChanged == true) {
            UpdateDp()
            console.log('dp was changed!')
        }

        else {
            navigate('/')
        }

    }

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

        axios.get(viewProfileURL + GetUID()).then(res => { setUserData(res.data.data); setDp('http://127.0.0.1:8000' + res.data.data[0].profilePicture); setIsDiscoverable(res.data.data[0].isDiscoverable) }).catch(res => console.log(res))

    }, [])

    function LiveDp(event) {
        setProfilePic(event.target.files[0])
        setDpChanged(true)
        // setDp(event.target.files[0])
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

            {/* <Navbar /> */}

            <Fade>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '80%' }, m: 'auto', marginTop: '5vh', marginBottom: { xs: '5vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>

                    <Snackbar
                        open={openSnack}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={() => setOpenSnack(!openSnack)}>
                        <Alert severity={severity} variant='filled'>{snackText}</Alert>
                    </Snackbar>

                    <Box sx={{ maxHeight: '10vh' }}>

                        <Typography sx={{ fontWeight: '700' }} variant='h4' component="div">EDIT PROFILE</Typography>
                        <Typography sx={{ fontWeight: '500' }} variant='subtitle2' component="div">CHANGES WILL BE INSTANTLY INFLICTED UPON YOUR PROFILE</Typography>

                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    {userData ? userData.map((data => {
                        return (

                            <form key={data.id} onSubmit={(e) => HandleSubmit(e)}>

                                <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                                    <Grid container sx={{ flex: 2, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                        <Grid item xs={12} lg={5} >
                                            <TextField defaultValue={data.fname} inputRef={fnameRef} sx={{ width: '100%' }} label="FIRST NAME" placeholder="HASEEB" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                        </Grid>
                                        <Grid item xs={12} lg={5} >
                                            <TextField defaultValue={data.lname} inputRef={lnameRef} sx={{ width: '100%' }} label="LAST NAME" placeholder="QURESHI" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                        </Grid>
                                        <Grid item xs={12} lg={10} >
                                            <TextField defaultValue={data.biography} inputRef={biographyRef} multiline sx={{ width: '100%' }} label="BIOGRAPHY" InputLabelProps={{ shrink: true }} placeholder="I AM A HARDWORKING INDIVIDUAL WITH A  SET OF SKILLS THAT..." variant="outlined" required />
                                        </Grid>
                                        <Grid item xs={12} lg={6} >
                                            <TextField defaultValue={data.position} inputRef={positionRef} sx={{ width: '100%' }} label="POSITION" placeholder="FULL STACK DEVELOPER" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                        </Grid>
                                        <Grid item xs={12} lg={4} >
                                            <TextField defaultValue={data.experience} inputRef={experienceRef} sx={{ width: '100%' }} label="YEARS OF EXPERIENCE" placeholder="2" InputLabelProps={{ shrink: true }} variant="outlined" type="number" required />
                                        </Grid>
                                        <Grid item xs={12} lg={5} >
                                            <TextField defaultValue={data.qualification} inputRef={qualificationRef} sx={{ width: '100%' }} label="HIGHEST QUALIFICATION" placeholder="BCA" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                        </Grid>
                                        <Grid item xs={12} lg={5} >
                                            <TextField defaultValue={data.location} inputRef={locationRef} sx={{ width: '100%' }} label="LOCATION" InputLabelProps={{ shrink: true }} placeholder="INDIA" variant="outlined" required />
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ flex: 1, mb: { xs: 5, lg: 0 } }}>
                                        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }} direction={'column'} gap={5}>

                                            <Stack sx={{ alignItems: 'center' }} direction='row'>
                                                <Switch
                                                    size="large"
                                                    checked={isDiscoverable}
                                                    onChange={() => setIsDiscoverable(!isDiscoverable)}
                                                />
                                                <Typography>DISCOVERABLE PROFILE ?</Typography>
                                            </Stack>

                                            <Avatar src={dp} sx={{ height: 200, width: 200 }} />
                                            <Button onChange={LiveDp} variant="outlined" accept="image/*" component="label">
                                                CHANGE PROFILE PICTURE
                                                <input type="file" hidden />
                                            </Button>
                                        </Stack>
                                    </Box>

                                </Box>

                                {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 5 } }}>
                                    <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' endIcon={<Done sx={{ color: 'white' }} />}>SAVE CHANGES</Button>
                                </Box> : <Box sx={{ width: '100%' }}>
                                    <CircularProgress sx={{ float: 'right', textAlign: 'center' }} />
                                </Box>
                                }
                            </form>

                        )
                    })) : null}

                </Box>
            </Fade>
        </>
    )
}
