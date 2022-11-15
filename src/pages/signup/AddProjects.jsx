import { Add, Edit, ExpandMore, Favorite, MoreVert, NavigateNext, Share } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, Fab, FormControlLabel, Grid, IconButton, Modal, Paper, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddProjects() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserproject/'

    const makeSkillURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserskill'
    const viewSkillURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserskill/'

    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()

    const [xpData, setXpData] = useState()
    const [xpLength, setXpLength] = useState(0)

    const [skillData, setSkillData] = useState()
    const [skillLength, setSkillLength] = useState(0)

    const [openModal, setOpenModal] = useState(false)

    const skillRef = useRef()
    const [level, setLevel] = useState(false)

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

    async function AddSkill(e) {
        e.preventDefault()
        let form = new FormData()
        form.append('belongsTo', userId)
        form.append('name', skillRef.current.value)
        form.append('level', level)

        await axios.post(makeSkillURL, form, axiosConfig).then(res => { console.log(res); setOpenModal(false) }).catch(res => console.log(res))
    }

    useEffect(() => {

        const GetXps = () => {
            if (localStorage.getItem('UserID') || localStorage.getItem('Access')) {
                setUserId(JSON.parse(localStorage.getItem('UserID')))
                setAccessToken(localStorage.getItem('Access'))
                return JSON.parse(localStorage.getItem('UserID'))
            }
            else {
                console.log('NO UID FOUND!')
            }
        }

        axios.get(baseURL + GetXps()).then(res => { setXpData(res.data.data); setXpLength(res.data.data.length) }).catch(res => console.log(res))

        axios.get(viewSkillURL + GetXps()).then(res => { setSkillData(res.data); setSkillLength(res.data.length) }).catch(res => console.log(res))

    }, [openModal])

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
                        <Grid xs={12} md={10} item >
                            <Typography sx={{ fontWeight: '500' }} variant='h4' component="div">ADD PROJECTS ({xpLength})
                                <Typography sx={{ fontWeight: '500', color: 'grey', fontSize: '0.75rem' }} variant='subtitle2'>YOUR EXPERIENCES WILL BE AUTOMATICALLY SORTED</Typography>
                            </Typography>
                        </Grid>
                        <Grid sx={{ mt: { xs: 2, md: 0 }, float: 'right' }} xs={12} md={2} item >
                            <Fab sx={{ float: 'right' }} onClick={() => navigate('/makeproject')} color='primary' variant="extended">
                                <Add sx={{ mr: 1 }} />
                                ADD PROJECT
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container sx={{ width: '100%', height: "auto" }} gap={{ xs: 5, md: 1 }}>

                    {xpData ? xpData.map((data => {
                        return (
                            <Grid key={data.id} item xs={12} md={5.95}>

                                <Card>
                                    <CardHeader
                                        title={<Typography variant='h5'>{data.role}</Typography>}
                                        subheader={<Typography sx={{ fontSize: '0.85rem', fontWeight: '700' }} variant='h5'>{data.name}</Typography>}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={`https://haseebxqureshi.pythonanywhere.com${data.projectImage}`}
                                        alt={data.name}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.responsibilities}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Grid>
                        )
                    })) : <h4>ADDED PROJECTS WILL SHOW UP HERE.</h4>}

                </Grid>


                {/* SKILLS HERE */}
                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '100%', lg: '100%' }, m: 'auto', marginTop: '10vh', marginBottom: { xs: '1vh', lg: '2vh' }, height: "auto", alignItems: "flex-start" }} gap={4}>

                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(!openModal)}
                    >
                        <Box sx={{ width: { xs: '90%', md: '50%' }, height: '100vh', m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <Box sx={{ width: '100%', p: 2.5, minHeight: '50vh', borderRadius: 5, bgcolor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Typography sx={{ fontWeight: '500', mt: 0, mb: 3 }} variant='h4'>ADD SKILL</Typography>
                                <form style={{ width: '90%', margin: 'auto' }} onSubmit={(e) => AddSkill(e)} >
                                    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >
                                        <TextField inputRef={skillRef} sx={{ width: '100%' }} label="SKILL NAME" placeholder="HTML" InputLabelProps={{ shrink: true }} variant="outlined" required />
                                        {/* <TextField inputRef={levelRef} sx={{ width: '50%', ml: 'auto', mt: 5, mb: 5 }} type='number' label="SKILL LEVEL" placeholder="3" InputLabelProps={{ shrink: true }} variant="outlined" required /> */}

                                        <RadioGroup onChange={(event) => { setLevel(event.target.value) }} sx={{ width: '100%', margin: '25px 0' }}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                                                <FormControlLabel value={1} control={<Radio required />} label="Beginner(L1)" />
                                                <FormControlLabel value={2} control={<Radio />} label="Intermediate(L2)" />
                                                <FormControlLabel value={3} control={<Radio />} label="Advanced(L3)" />
                                            </Box>
                                        </RadioGroup>

                                        <Button type="submit" variant="contained"> + ADD SKILL</Button>
                                    </Stack>
                                </form>
                            </Box>

                        </Box>
                    </Modal>

                    <Grid container sx={{ width: '100%', }}>
                        <Grid xs={12} md={10} item >
                            <Typography sx={{ fontWeight: '500' }} variant='h4' component="div">ADD SKILLS({skillLength})
                                <Typography sx={{ fontWeight: '500', color: 'grey', fontSize: '0.75rem' }} variant='subtitle2'>YOUR SKILLS WILL BE AUTOMATICALLY SORTED</Typography>
                            </Typography>
                        </Grid>
                        <Grid sx={{ mt: { xs: 2, md: 0 }, float: 'right' }} xs={12} md={2} item >
                            <Fab onClick={() => setOpenModal(!openModal)} sx={{ float: 'right' }} color='primary' variant="extended">
                                <Add sx={{ mr: 1 }} />
                                ADD SKILL
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container sx={{ width: '100%', height: "auto" }} gap={{ xs: 5, md: 1 }}>

                    {skillData ? skillData.map((data => {
                        return (
                            <Grid key={data.id} item xs={12} md={5.95}>
                                <Card elevation={3} sx={{ display: 'flex', border: '2px solid', borderColor: 'primary.main', justifyContent: 'space-between', alignItems: 'center', p: 0.5, borderRadius: 100 }}>
                                    <Typography sx={{ ml: 2, fontWeight: '700' }} variant='h6'>{data.name}</Typography>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        {data.level}
                                    </Avatar>
                                </Card>
                            </Grid>
                        )
                    })) : <h4>ADDED SKILLS WILL SHOW UP HERE.</h4>}

                </Grid>

                {isLoading == false ? <Box sx={{ width: '100%', mt: { xs: 5, lg: 0 } }}>
                    <Button onClick={() => { navigate('/addcertificates'); setIsDisabled(true); setIsLoading(true) }} disabled={isDisabled} sx={{ float: 'right' }} size="large" variant='contained' endIcon={<NavigateNext sx={{ color: 'white' }} />}>NEXT</Button>
                </Box> : <Box sx={{ width: '100%' }}>
                    <CircularProgress sx={{ float: 'right', m: 'auto', textAlign: 'center' }} />
                </Box>
                }

            </Box>

        </>
    )
}
