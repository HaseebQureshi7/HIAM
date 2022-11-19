import { Add, Edit, Link as LinkIcon } from "@mui/icons-material"
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Fade } from "../../components/AnimationEngine"
import { GetUID } from "../../components/GetUID"

export default function ViewAllExperiences() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

    const userExperiencesURL = baseURL + 'viewuserexperience/'

    const navigate = useNavigate()

    const [userExperiences, setUserExperiences] = useState(null)
    const [userExperiencesLength, setUserExperiencesLength] = useState(0)

    useEffect(() => {
        axios.get(userExperiencesURL + GetUID()).then(res => { setUserExperiences(res.data.data); setUserExperiencesLength(res.data.data.length); }).catch(res => console.log(res))
    }, [])

    return (
        <>
            <Fade>
                <Box sx={{ width: { xs: '90%', lg: '75%' }, minHeight: '100vh', m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8 }}>

                    <Stack sx={{ width: '100%', mt: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: 700 }} variant='h3'>Experiences ({userExperiencesLength})</Typography>
                        <Avatar onClick={() => navigate('/addnewexperience')} sx={{ bgcolor: 'primary.main', display: { xs: 'inherit', lg: 'none' }, fontWeight: 700 }}><Add /></Avatar>
                        <Button onClick={() => navigate('/addnewexperience')} sx={{ display: { xs: 'none', lg: 'inherit' }, fontWeight: 700 }} variant='outlined'>+ ADD EXPERIENCES</Button>
                    </Stack>

                    <Divider sx={{ width: '100%' }} />

                    {userExperiences ? userExperiences.map((data => {
                        return (

                            <Box key={data.id} sx={{ width: '100%', height: 'auto', mb: 5, display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, justifyContent: { xs: 'center', lg: 'space-between' }, alignItems: 'center' }}>


                                <Stack sx={{ flex: 1, gap: 1, textAlign: 'center', alignItems: { xs: 'center', lg: 'center' } }}>
                                    <Typography sx={{ fontWeight: 700 }} variant='h4'>{data.companyName}</Typography>
                                    <Stack sx={{ flexDirection: { xs: 'column', lg: 'row' } }}>
                                        {/* <Typography variant='h6'>Role:&nbsp;</Typography> */}
                                        <Typography sx={{ fontWeight: 700 }} variant='h6'>{(data.position).toUpperCase()}&nbsp;-&nbsp;</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='h6'>({data.fullTime})</Typography>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Stack direction='row'>
                                            {/* <Typography variant='h6'>Based on:&nbsp;</Typography> */}
                                            <Typography sx={{ fontWeight: 700 }} variant='p'>{data.startDate}&nbsp;-&nbsp;</Typography>
                                        </Stack>
                                        <Stack direction='row'>
                                            {/* <Typography variant='h6'>Released on:&nbsp;</Typography> */}
                                            <Typography sx={{ fontWeight: 700 }} variant='p'>{data.endDate}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack gap={2.5} direction='row'>
                                        <Link to={`/editexperience/${data.id}`}>
                                            <Avatar sx={{ bgcolor: 'text.main' }}><Edit /></Avatar>
                                        </Link>
                                    </Stack>
                                    <Stack sx={{ textAlign: { xs: 'center', lg: 'center' } }}>
                                        <Typography sx={{ fontWeight: 700 }} variant='h5'>Contributions</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>{data.responsibilities}</Typography>
                                    </Stack>
                                </Stack>

                            </Box>

                        )
                    })) : null}



                </Box>
            </Fade>
        </>
    )
}
