import { Add, Close, DeleteForever, NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider, Autocomplete } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "../../../components/AnimationEngine";

export default function EditExperience() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/edituserexperience/'
    const viewExperienceURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewsingleexperience/'
    const deleteExperienceURL = 'https://haseebxqureshi.pythonanywhere.com/api/deleteuserexperience/'

    const navigate = useNavigate()
    const { eid } = useParams()

    const [experienceData, setExperienceData] = useState()

    const [sure, setSure] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const companyNameRef = useRef()
    const jobTypeRef = useRef()
    const responsibilitiesRef = useRef()
    const positionRef = useRef()
    const fromRef = useRef()
    const toRef = useRef()

    const [dp, setDp] = useState()

    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()

    const JobTypes = ['FULL TIME', 'PART TIME', 'CONTRACT']

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

        axios.get(viewExperienceURL + eid).then(res => { setExperienceData(res.data.data); console.log(res.data.data) }).catch(res => console.log(res))
    }, [])

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };


    async function DeleteExperience() {
        await axios.delete(deleteExperienceURL + eid, axiosConfig).then(res => navigate('/allexperiences')).catch(res => console.log(res))
    }


    async function HandleSubmit(e) {
        e.preventDefault()
        let form = new FormData()
        form.append('belongsTo', userId)
        form.append('companyName', companyNameRef.current.value)
        form.append('position', positionRef.current.value)
        form.append('startDate', fromRef.current.value)
        form.append('responsibilities', responsibilitiesRef.current.value)
        form.append('endDate', toRef.current.value)
        form.append('fullTime', jobTypeRef.current.value)

        setIsDisabled(true)
        setIsLoading(true)
        await axios.put(baseURL + eid, JSON.stringify(Object.fromEntries(form)), axiosConfig).then(res => {
            console.log('submitted!')
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            navigate('/allexperiences')
        }).catch(res => {
            {
                setIsDisabled(false)
                setIsLoading(false)
                console.log(res); console.log('Not submitted!')
                setOpenSnack(true)
                setSeverity("error")
                setSnackText("XP NOT ADDED!")
            }
        })
    }

    return (
        <>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '80%' }, m: 'auto', minHeight:'100vh', pt: '5vh', pb: { xs: '5vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>


                <Snackbar
                    open={openSnack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnack(!openSnack)}>
                    <Alert severity={severity} variant='filled'>{snackText}</Alert>
                </Snackbar>

                <Typography sx={{ fontWeight: '500', fontSize: { xs: '2.5rem', lg: '3rem' } }} variant='h2' component="div">EDIT EXPERIENCE
                    <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER NEW DETAILS UPDATE THIS EXPERIENCE RECORD.</Typography>
                </Typography>

                <Divider sx={{ width: '100%' }} />

                <Fade>
                    {experienceData ? <form onSubmit={(e) => HandleSubmit(e)}>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                            <Grid container sx={{ flex: 1, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                <Grid item xs={12} lg={10} >
                                    <TextField defaultValue={experienceData[0].companyName} inputRef={companyNameRef} sx={{ width: '100%' }} label="COMPANY NAME" placeholder="RATIONAL TABS TECHNOLOGIES" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={6} >
                                    <TextField defaultValue={experienceData[0].position} inputRef={positionRef} sx={{ width: '100%' }} label="POSITION" placeholder="FULL STACK DEVELOPER" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={4} >
                                    <Autocomplete
                                        disablePortal
                                        defaultValue={experienceData[0].fullTime}
                                        id="combo-box-demo"
                                        options={JobTypes}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField autoComplete="on" inputRef={jobTypeRef} required {...params} label="JOB TYPE" />}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField defaultValue={experienceData[0].startDate} inputRef={fromRef} sx={{ width: '100%' }} label="FROM" placeholder="12/12/12" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField defaultValue={experienceData[0].endDate} inputRef={toRef} sx={{ width: '100%' }} label="TO" InputLabelProps={{ shrink: true }} placeholder="12/12/12" variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={10} >
                                    <TextField defaultValue={experienceData[0].responsibilities} inputRef={responsibilitiesRef} multiline sx={{ width: '100%' }} label="RESPONSIBILITIES" InputLabelProps={{ shrink: true }} placeholder="RESPONSIBLE FOR A LOT OF STUFF I WAS! ..." variant="outlined" required />
                                </Grid>
                            </Grid>

                        </Box>

                        {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 5 } }}>
                            <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' color="primary" endIcon={<Add sx={{ color: 'white' }} />}>SAVE</Button>


                            {sure == false ? <Button onClick={() => setSure(true)} color="error" disabled={isDisabled} sx={{ float: {xs:'none',lg:'right'}, mr: { xs: 0, lg: 5 }, mt: { xs: 0, lg: 0 } }} size="large" variant='contained' endIcon={<DeleteForever sx={{ color: 'white' }} />}>DELETE PROJECT</Button> : <Button onClick={() => DeleteExperience()} color="error" disabled={isDisabled} sx={{ float: {xs:'none',lg:'right'}, mr: { xs: 0, lg: 5 }, mt: { xs: 0, lg: 0 } }} size="large" variant='contained' endIcon={<DeleteForever sx={{ color: 'white' }} />}>ARE YOU SURE ?</Button>}


                            {/* <Button onClick={() => navigate('/allexperiences')} disabled={isDisabled} sx={{ float: 'right', mr: 5 }} size="large" variant='outlined' color="error" endIcon={<Close sx={{ color: 'error.main' }} />}>CANCEL</Button> */}
                        </Box> : <Box sx={{ width: '100%' }}>
                            <CircularProgress sx={{ float: 'right', textAlign: 'center', mt: { xs: 2.5, lg: 0 } }} />
                        </Box>
                        }
                    </form> : null}
                </Fade>

            </Box>
        </>
    )
}
