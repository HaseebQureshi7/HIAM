import { Add, Close, NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider, Autocomplete } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "../../../components/AnimationEngine";

export default function AddNewExperience() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserexperience'

    const navigate = useNavigate()

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
    }, [])

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };

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
        await axios.post(baseURL, form, axiosConfig).then(res => {
            console.log('submitted!')
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            navigate('/viewexperiences')
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

            <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '90%', md: '90%', lg: '80%' }, m: 'auto', marginTop: '5vh', marginBottom: { xs: '5vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>


                <Snackbar
                    open={openSnack}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnack(!openSnack)}>
                    <Alert severity={severity} variant='filled'>{snackText}</Alert>
                </Snackbar>

                <Typography sx={{ fontWeight: '500', fontSize: { xs: '3rem', lg: '3rem' } }} variant='h2' component="div">ADD NEW EXPERIENCE
                    <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER DETAILS TO MAKE A NEW EXPERIENCE RECORD.</Typography>
                </Typography>

                <Divider sx={{ width: '100%' }} />

                <Fade>
                    <form onSubmit={(e) => HandleSubmit(e)}>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                            <Grid container sx={{ flex: 1, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                <Grid item xs={12} lg={10} >
                                    <TextField inputRef={companyNameRef} sx={{ width: '100%' }} label="COMPANY NAME" placeholder="RATIONAL TABS TECHNOLOGIES" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={6} >
                                    <TextField inputRef={positionRef} sx={{ width: '100%' }} label="POSITION" placeholder="FULL STACK DEVELOPER" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={4} >
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={JobTypes}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField autoComplete="on" inputRef={jobTypeRef} required {...params} label="JOB TYPE" />}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={fromRef} sx={{ width: '100%' }} label="FROM" placeholder="12/12/12" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField inputRef={toRef} sx={{ width: '100%' }} label="TO" InputLabelProps={{ shrink: true }} placeholder="12/12/12" variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={10} >
                                    <TextField inputRef={responsibilitiesRef} multiline sx={{ width: '100%' }} label="RESPONSIBILITIES" InputLabelProps={{ shrink: true }} placeholder="RESPONSIBLE FOR A LOT OF STUFF I WAS! ..." variant="outlined" required />
                                </Grid>
                            </Grid>

                        </Box>

                        {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 5 } }}>
                            <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' color="primary" endIcon={<Add sx={{ color: 'white' }} />}>ADD</Button>
                            <Button onClick={() => navigate('/viewexperiences')} disabled={isDisabled} sx={{ float: 'right', mr: 5 }} size="large" variant='outlined' color="error" endIcon={<Close sx={{ color: 'error.main' }} />}>CANCEL</Button>
                        </Box> : <Box sx={{ width: '100%' }}>
                            <CircularProgress sx={{ float: 'right', textAlign: 'center' }} />
                        </Box>
                        }
                    </form>
                </Fade>

            </Box>
        </>
    )
}
