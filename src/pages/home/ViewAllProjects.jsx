import { Add, Edit, Link as LinkIcon } from "@mui/icons-material"
import { Avatar, Box, Button, Link as MUILink, Divider, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Fade } from "../../components/AnimationEngine"
import { GetUID } from "../../components/GetUID"

export default function ViewAllProjects() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

    const userProjectsURL = baseURL + 'viewuserproject/'

    const navigate = useNavigate()

    const [userProjects, setUserProjects] = useState(null)
    const [userProjectsLength, setUserProjectsLength] = useState(0)

    useEffect(() => {
        axios.get(userProjectsURL + GetUID()).then(res => { setUserProjects(res.data.data); setUserProjectsLength(res.data.data.length); }).catch(res => console.log(res))
    }, [])

    return (
        <>
            <Fade>
                <Box sx={{ width: { xs: '90%', lg: '75%' }, minHeight: '100vh', m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5 }}>

                    <Stack sx={{ width: '100%', mt: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: 700 }} variant='h3'>PROJECTS ({userProjectsLength})</Typography>
                        <Avatar onClick={() => navigate('/addnewproject')} sx={{ bgcolor: 'primary.main', display: { xs: 'inherit', lg: 'none' }, fontWeight: 700 }}><Add /></Avatar>
                        <Button onClick={() => navigate('/addnewproject')} sx={{ display: { xs: 'none', lg: 'inherit' }, fontWeight: 700 }} variant='outlined'>+ ADD PROJECTS</Button>
                    </Stack>

                    <Divider sx={{ width: '100%' }} />

                    {userProjects ? userProjects.map((data => {
                        return (

                            <Box key={data.id} sx={{ width: '100%', height: 'auto', mb: 5, display: 'flex', textAlign: { xs: 'center', lg: 'start' }, flexDirection: { xs: 'column-reverse', lg: 'row' }, justifyContent: { xs: 'center', lg: 'space-between' }, alignItems: 'center' }}>

                                <Stack sx={{ flex: 2, gap: 1, alignItems: { xs: 'center', lg: 'flex-start' } }}>
                                    <Typography sx={{ fontWeight: 700 }} variant='h4'>{data.name}</Typography>
                                    <Stack direction='row'>
                                        <Typography variant='h6'>Role:&nbsp;</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.role}</Typography>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Typography variant='h6'>Based on:&nbsp;</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.basedOn}</Typography>
                                    </Stack>
                                    <Stack direction='row'>
                                        <Typography variant='h6'>Released on:&nbsp;</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.releaseDate}</Typography>
                                    </Stack>
                                    <Stack gap={2.5} direction='row'>
                                        <MUILink href={data.projectLink} target="_blank">
                                            <Avatar sx={{ bgcolor: 'text.main', '&:hover': { rotate: '-45deg', transition: 'all 1s ease ' }, '&:not(:hover)': { rotate: '0deg', transition: 'all 1s ease ' } }} > <LinkIcon /></Avatar>
                                        </MUILink>
                                        <Link to={`/editproject/${data.id}`} >
                                            <Avatar sx={{ bgcolor: 'text.main' }}><Edit /></Avatar>
                                        </Link>
                                    </Stack>
                                    <Stack sx={{ textAlign: { xs: 'center', lg: 'start' } }}>
                                        <Typography sx={{ fontWeight: 700 }} variant='h5'>Contributions</Typography>
                                        <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>{data.responsibilities}</Typography>
                                    </Stack>
                                </Stack>

                                <Box sx={{ flex: 1, mb: 2.5, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                    <Avatar src={`https://haseebxqureshi.pythonanywhere.com${data.projectImage}`} variant='square' sx={{ width: { xs: '80%', lg: '100%' }, height: { xs: '200px', lg: '300px' }, borderRadius: 2 }} />

                                </Box>

                            </Box>

                        )
                    })) : null}



                </Box>
            </Fade>
        </>
    )
}
