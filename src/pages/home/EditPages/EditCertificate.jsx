import { Add, Close, DeleteForever, NavigateNext } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Grid, CircularProgress, Snackbar, Stack, TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Fade } from "../../../components/AnimationEngine";

export default function EditCertificate() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/editusercertificate/'
    const viewCertificateURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewsinglecertificate/'
    const deleteCertificateURL = 'https://haseebxqureshi.pythonanywhere.com/api/deleteusercertificate/'

    const navigate = useNavigate()
    const { cid } = useParams()

    const [certificateData, setCertificateData] = useState()

    const [sure, setSure] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    const nameRef = useRef()
    const issuedByRef = useRef()
    const issueDateRef = useRef()
    const linkRef = useRef()

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


        axios.get(viewCertificateURL + cid).then(res => { setCertificateData(res.data.data); console.log(res.data.data) }).catch(res => console.log(res))
    }, [])

    let axiosConfig = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    };

    async function DeleteCertificate() {
        await axios.delete(deleteCertificateURL + cid, axiosConfig).then(res => navigate('/allcertificates')).catch(res => console.log(res))
    }

    async function HandleSubmit(e) {
        e.preventDefault()
        let form = new FormData()
        // form.append('belongsTo', userId)
        form.append('name', nameRef.current.value)
        form.append('issuedBy', issuedByRef.current.value)
        form.append('issueDate', issueDateRef.current.value)
        form.append('link', linkRef.current.value)

        setIsDisabled(true)
        setIsLoading(true)
        await axios.put(baseURL + cid, JSON.stringify(Object.fromEntries(form)), axiosConfig).then(res => {
            console.log(JSON.stringify(Object.fromEntries(form)))
            setOpenSnack(true)
            setSeverity("success")
            setSnackText("Success!")
            navigate('/allcertificates')
        }).catch(res => {
            {
                setIsDisabled(false)
                setIsLoading(false)
                console.log(res); console.log('Not submitted!')
                setOpenSnack(true)
                setSeverity("error")
                setSnackText("COULDN'T LOG YOU IN!")
            }
        })
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

                    <Typography sx={{ fontWeight: '500', fontSize: { xs: '3rem', lg: '3rem' } }} variant='h2' component="div">EDIT CERTIFICATE
                        <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER NEW DETAILS UPDATE THIS CERTIFICATE RECORD</Typography>
                    </Typography>

                    <Divider sx={{ width: '100%' }} />

                    {certificateData ? <form onSubmit={(e) => HandleSubmit(e)}>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', md: 'column-reverse', lg: 'row' }, justifyContent: 'center', alignItems: { sm: 'center', lg: 'flex-start' } }}>

                            <Grid container sx={{ flex: 1, justifyContent: 'center' }} spacing={{ xs: 5, lg: 6 }}>
                                <Grid item xs={12} lg={10} >
                                    <TextField defaultValue={certificateData[0].name} inputRef={nameRef} sx={{ width: '100%' }} label="CERTIFICATE NAME" placeholder="FULL STACK NEXT.js" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField defaultValue={certificateData[0].issuedBy} inputRef={issuedByRef} sx={{ width: '100%' }} label="ISSUED BY" placeholder="UDEMY" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={5} >
                                    <TextField defaultValue={certificateData[0].issueDate} inputRef={issueDateRef} sx={{ width: '100%' }} label="ISSUE DATE" InputLabelProps={{ shrink: true }} placeholder="12/12/12" variant="outlined" required />
                                </Grid>
                                <Grid item xs={12} lg={10} >
                                    <TextField defaultValue={certificateData[0].link} inputRef={linkRef} sx={{ width: '100%' }} label="LINK " InputLabelProps={{ shrink: true }} placeholder="http://hiam.dev" variant="outlined" required />
                                </Grid>
                            </Grid>

                        </Box>

                        {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 5 } }}>
                            <Button disabled={isDisabled} type='submit' sx={{ float: 'right' }} size="large" variant='contained' color="primary" endIcon={<Add sx={{ color: 'white' }} />}>SAVE</Button>


                            {sure == false ? <Button onClick={() => setSure(true)} color="error" disabled={isDisabled} sx={{ float: 'right', mr: { xs: 0, lg: 5 }, mt: { xs: 3, lg: 0 } }} size="large" variant='contained' endIcon={<DeleteForever sx={{ color: 'white' }} />}>DELETE PROJECT</Button> : <Button onClick={() => DeleteCertificate()} color="error" disabled={isDisabled} sx={{ float: 'right', mr: { xs: 0, lg: 5 }, mt: { xs: 3, lg: 0 } }} size="large" variant='contained' endIcon={<DeleteForever sx={{ color: 'white' }} />}>ARE YOU SURE ?</Button>}

                            <Button onClick={() => navigate('/allcertificates')} disabled={isDisabled} sx={{ float: 'right', mr: 5 }} size="large" variant='outlined' color="error" endIcon={<Close sx={{ color: 'error.main' }} />}>CANCEL</Button>
                        </Box> : <Box sx={{ width: '100%' }}>
                            <CircularProgress sx={{ float: 'right', textAlign: 'center' }} />
                        </Box>
                        }
                    </form> : null}

                </Box>
            </Fade>
        </>
    )
}
