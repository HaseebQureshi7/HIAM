import { Close, Done, Google, Instagram, LinkedIn, Link as LinkIcon } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider, Switch, Modal, Card } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "../../components/AnimationEngine";
import { GetUID } from "../../components/GetUID";
import { ThemeModeContext } from "../../context/ThemeModeContext";

export default function EditProfile() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserprofile'
    const viewProfileURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserprofile/'
    const editProfileURL = 'https://haseebxqureshi.pythonanywhere.com/api/edituserprofile/'
    const updateProfilePictureURL = 'https://haseebxqureshi.pythonanywhere.com/api/editprofilepicture/'

    const userLinksURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserlink/'
    const editUserLinksURL = 'https://haseebxqureshi.pythonanywhere.com/api/edituserlink/'

    const navigate = useNavigate()

    const { themeMode } = useContext(ThemeModeContext)

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const [openModal, setOpenModal] = useState(false)

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

    const googleRef = useRef()
    const linkedInRef = useRef()
    const personalRef = useRef()
    const instagramRef = useRef()

    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()

    const [userLinks, setUserLinks] = useState()

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            // 'Content-Type': 'multipart/form-data',
            // 'charset': "utf-8"
        }
    };

    async function UpdateLinks(link, name, id) {
        axios.put(editUserLinksURL + id, JSON.stringify({ name: name, link: link.current.value }), axiosConfig).then(res => { setOpenModal(false); setOpenSnack(true); setSeverity("success"); setSnackText(name + ' was updated!') }).catch(res => console.log(res))
    }

    async function UpdateDp() {
        // e.preventDefault()
        let form = new FormData()
        form.append('profilePicture', profilePic)

        // EDIT DP
        await axios.post(updateProfilePictureURL + GetUID(), form, axiosConfig).then(res => {
            // console.log(res)
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            navigate('/home')
        }).catch(res => {
            {
                // console.log(profilePic);
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
            // console.log(res)
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            // console.log(JSON.stringify(form))
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
            // console.log('dp was changed!')
        }

        else {
            navigate('/home')
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

        axios.get(viewProfileURL + GetUID()).then(res => { setUserData(res.data.data); setDp('https://haseebxqureshi.pythonanywhere.com' + res.data.data[0].profilePicture); setIsDiscoverable(res.data.data[0].isDiscoverable) }).catch(res => console.log(res))

        axios.get(userLinksURL + GetUID()).then(res => { setUserLinks(res.data.data); }).catch(res => console.log(res))

    }, [openModal])

    function LiveDp(event) {
        setProfilePic(event.target.files[0])
        setDpChanged(true)
        // setDp(event.target.files[0])
        // console.log(profilePic)
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

                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '80%' }, m: 'auto', pt: '5vh', pb: 2, minHeight: "100vh", alignItems: "flex-start" }} gap={4}>

                    <Snackbar
                        open={openSnack}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={() => setOpenSnack(!openSnack)}>
                        <Alert severity={severity} variant='filled'>{snackText}</Alert>
                    </Snackbar>



                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <Box sx={{ width: { xs: '100%', md: '50%' }, height: '100vh', m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Box sx={{ width: '100%', p: 2.5, minHeight: '50vh', borderRadius: 5, bgcolor: (themeMode == 'dark' ? 'black' : 'white'), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Stack sx={{ width: '100%' }} direction="row">
                                    <Typography sx={{ color: 'text.primary', fontWeight: '700', mt: 0, }} variant='h4'>EDIT LINKS</Typography>
                                    <Avatar onClick={() => setOpenModal(false)} sx={{ bgcolor: 'error.light', ml: 'auto' }}><Close /></Avatar>
                                </Stack>
                                <Typography sx={{ fontWeight: '700', color: 'text.secondary' }} variant='subtitle2'>ADD YOUR LINKS WITH FULL URL TO MAKE THEM INTRACTABLE</Typography>

                                <Divider sx={{ width: '100%', mb: 5 }} />


                                <form style={{ width: { xs: '100%', lg: '90%' }, margin: 'auto' }} >
                                    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >

                                        <Grid container sx={{ width: '100%', height: "auto" }} gap={{ xs: 5, md: 5 }}>


                                            {userLinks ? userLinks.map((data => {
                                                return (

                                                    <div style={{ width: '100%' }} key={data.id}>
                                                        {data.name == 'linkedIn' ? <Grid item xs={12} md={12}>
                                                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                                    <LinkedIn />
                                                                </Avatar>
                                                                <TextField inputRef={linkedInRef} defaultValue={data.link} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="http://linkedin.com/haseebqureshisihere" variant="standard" required />
                                                                <Avatar onClick={() => UpdateLinks(linkedInRef, data.name, data.id)} sx={{ bgcolor: 'success.main' }}>
                                                                    <Done />
                                                                </Avatar>
                                                            </Card>
                                                        </Grid> : null}

                                                        {data.name == 'G-mail' ? <Grid item xs={12} md={12}>
                                                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                                                <Avatar sx={{ bgcolor: ' #DB4437' }}>
                                                                    <Google />
                                                                </Avatar>
                                                                <TextField inputRef={googleRef} defaultValue={data.link} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="qureshihaxeeb2@gmail.com" variant="standard" required />
                                                                <Avatar onClick={() => UpdateLinks(googleRef, data.name, data.id)} sx={{ bgcolor: 'success.main' }}>
                                                                    <Done />
                                                                </Avatar>
                                                            </Card>
                                                        </Grid> : null}

                                                        {data.name == 'Instagram' ? <Grid item xs={12} md={12}>
                                                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                                                <Avatar sx={{ background: 'linear-gradient(90deg,rgba(255, 0, 0, 1) 0%,rgba(255, 154, 0, 1) 10%,rgba(208, 222, 33, 1) 20%,rgba(79, 220, 74, 1) 30%,rgba(63, 218, 216, 1) 40%,rgba(47, 201, 226, 1) 50%,rgba(28, 127, 238, 1) 60%,rgba(95, 21, 242, 1) 70%,rgba(186, 12, 248, 1) 80%,rgba(251, 7, 217, 1) 90%,rgba(255, 0, 0, 1) 100%)' }}>
                                                                    <Instagram />
                                                                </Avatar>
                                                                <TextField inputRef={instagramRef} defaultValue={data.link} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="https://instagram.com/haseebxqureshi" variant="standard" required />
                                                                <Avatar onClick={() => UpdateLinks(instagramRef, data.name, data.id)} sx={{ bgcolor: 'success.main' }}>
                                                                    <Done />
                                                                </Avatar>
                                                            </Card>
                                                        </Grid> : null}

                                                        {data.name == 'Personal Website' ? <Grid item xs={12} md={12}>
                                                            <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                                </Avatar>
                                                                <TextField inputRef={personalRef} defaultValue={data.link} sx={{ width: '75%', m: 'auto', ml: 2, height: '20%' }} InputLabelProps={{ shrink: true }} placeholder="https://yourpersonalwebsite.com" variant="standard" required />
                                                                <Avatar onClick={() => UpdateLinks(personalRef, data.name, data.id)} sx={{ bgcolor: 'success.main' }}>
                                                                    <Done />
                                                                </Avatar>
                                                            </Card>
                                                        </Grid> : null}
                                                    </div>

                                                )
                                            })) : null}

                                            <Grid sx={{ color: 'text.primary', textAlign: 'center' }} item xs={12} md={12}>
                                                <Typography variant='subtitle2'>CLICK THE ICON NEXT TO THE LINK TO UPDATE{'***'}</Typography>
                                            </Grid>

                                        </Grid>

                                    </Stack>
                                </form>
                            </Box>

                        </Box>
                    </Modal>


                    <Stack sx={{ width: '100%', mt: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box >
                            <Typography sx={{ fontWeight: '700' }} variant='h4' component="div">EDIT PROFILE</Typography>
                            <Typography sx={{ display: { xs: 'inherit', lg: 'inherit' }, fontSize: '0.5rem', fontWeight: '500' }} variant='subtitle2' component="div">CHANGES WILL BE INSTANTLY INFLICTED UPON YOUR PROFILE</Typography>
                        </Box>

                        <Button onClick={() => setOpenModal(true)} startIcon={<LinkIcon />} sx={{ display: { xs: 'none', lg: 'inherit' }, fontWeight: 700 }} variant='outlined'>EDIT LINKS</Button>
                        <Avatar sx={{ bgcolor: 'primary.main', display: { xs: 'inherit', lg: 'none' } }} onClick={() => setOpenModal(true)}><LinkIcon /></Avatar>
                    </Stack>

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
                                                <input type="file" accept="image/png, image/gif, image/jpeg" hidden />
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
