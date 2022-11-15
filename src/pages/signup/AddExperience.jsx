import { Add, Edit, NavigateNext } from '@mui/icons-material'
import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Fab, Grid, IconButton, Paper, Snackbar, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddExperience() {

    const baseURL = 'http://haseebxqureshi.pythonanywhere.com/api/viewuserexperience/'

    const [userId, setUserId] = useState()
    const [xpData, setXpData] = useState()
    const [xpLength, setXpLength] = useState(0)

    const navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [snackText, setSnackText] = useState(false)
    const [severity, setSeverity] = useState()

    useEffect(() => {

        const GetXps = () => {
            if (localStorage.getItem('UserID') || localStorage.getItem('Access')) {
                setUserId(JSON.parse(localStorage.getItem('UserID')))
                return JSON.parse(localStorage.getItem('UserID'))
            }
            else {
                console.log('NO UID FOUND!')
            }
        }

        axios.get(baseURL + GetXps()).then(res => { setXpData(res.data.data); setXpLength(res.data.data.length) }).catch(res => console.log(res))

    }, [])

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

                <Typography sx={{ fontWeight: '500' }} variant='h2' component="div">WELCOME TO HIAM
                    <Typography sx={{ fontWeight: '200', color: 'grey', fontSize: 'small' }} variant='subtitle2'>ENTER YOUR DETAILS TO MAKE YOUR PROFILE</Typography>
                </Typography>

                <Divider sx={{ width: '100%' }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '100%', lg: '100%' }, m: 'auto', marginTop: '0vh', marginBottom: { xs: '1vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>

                    <Grid container sx={{ width: '100%', }}>
                        <Grid xs={12} md={9} item >
                            <Typography sx={{ fontWeight: '500' }} variant='h4' component="div">ADD EXPERIENCE ({xpLength})
                                <Typography sx={{ fontWeight: '500', color: 'grey', fontSize: '0.75rem' }} variant='subtitle2'>YOUR EXPERIENCES WILL BE AUTOMATICALLY SORTED</Typography>
                            </Typography>
                        </Grid>
                        <Grid sx={{ mt: { xs: 2, md: 0 }, float: 'right' }} xs={12} md={3} item >
                            <Fab sx={{ float: 'right' }} onClick={() => navigate('/makexp')} color='primary' variant="extended">
                                <Add sx={{ mr: 1 }} />
                                ADD EXPERIENCE
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container sx={{ width: '100%', height: "auto" }} gap={{ xs: 5, md: 1 }}>

                    {xpData ? xpData.map((data => {
                        return (
                            <Grid key={data.id} item xs={12} md={5.95}>
                                <Card>
                                    <CardContent>
                                        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            EXPERIENCE ID : {data.id}
                                        </Typography> */}
                                        <Typography sx={{ fontWeight: '700' }} variant="h5" component="div">
                                            {data.position}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mb: 1.5, fontWeight: '700' }} >
                                            {data.companyName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5, fontSize: '0.75rem', fontWeight: '900' }} color="text.secondary">
                                            FROM {data.startDate} TO {data.endDate.toUpperCase()}
                                        </Typography>
                                        <Typography variant="body2">
                                            {data.responsibilities}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ float: 'right' }} >
                                        <Button onClick={() => {
                                            setOpenSnack(true)
                                            setSeverity("info")
                                            setSnackText("FINISH THE SINGUP PROCESS TO EDIT")
                                        }} startIcon={<Edit sx={{ color: 'primary.main' }} />} variant="text" sx={{ fontWeight: '700', fontSize: '1rem' }} size="small">EDIT</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })) : <h1>NO DATA</h1>}

                </Grid>

                {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 0 } }}>
                    <Button onClick={()=> navigate('/addprojects')} disabled={isDisabled} sx={{ float: 'right' }} size="large" variant='contained' endIcon={<NavigateNext sx={{ color: 'white' }} />}>NEXT</Button>
                </Box> : <Box sx={{ width: '100%' }}>
                    <CircularProgress sx={{ float: 'right', m: 'auto', textAlign: 'center' }} />
                </Box>
                }

            </Box>

        </>
    )
}
