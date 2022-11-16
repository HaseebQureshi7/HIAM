import { Download, Edit, Google, Instagram, Language, LinkedIn, Mail, More, Notifications, People, Search, Settings } from '@mui/icons-material'
import { AppBar, Avatar, Badge, Box, Link as MUILink, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, IconButton, Menu, Skeleton, Stack, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'
import { GetUID } from '../../components/GetUID'

export default function Home() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

    const userProfileURL = baseURL + 'viewuserprofile/'
    const getUsernameURL = baseURL + 'getusername/'
    const userExperienceURL = baseURL + 'viewuserexperience/'
    const userProjectsURL = baseURL + 'viewuserproject/'
    const userSkillsURL = baseURL + 'viewuserskill/'
    const userCertificatesURL = baseURL + 'viewusercertificate/'
    const userLinksURL = baseURL + 'viewuserlink/'

    const [userProfile, setUserProfile] = useState(null)

    const [userName, setUserName] = useState(null)

    const [userExperience, setUserExperience] = useState(null)
    const [userExperienceLength, setUserExperienceLength] = useState(0)

    const [userProjects, setUserProjects] = useState(null)
    const [userProjectsLength, setUserProjectsLength] = useState(0)

    const [userSkills, setUserSkills] = useState(null)
    const [userSkillsLength, setUserSkillsLength] = useState(0)

    const [userCertificates, setUserCertificates] = useState(null)
    const [userCertificatesLength, setUserCertificatesLength] = useState(0)

    const [userLinks, setUserLinks] = useState(null)
    const [userLinksLength, setUserLinksLength] = useState(0)

    useEffect(() => {

        axios.get(userProfileURL + GetUID()).then(res => { setUserProfile(res.data.data) }).catch(res => console.log(res))

        axios.get(getUsernameURL + GetUID()).then(res => { setUserName(res.data) }).catch(res => console.log(res))

        axios.get(userExperienceURL + GetUID()).then(res => { setUserExperience(res.data.data); setUserExperienceLength(res.data.data.length) }).catch(res => console.log(res))

        axios.get(userProjectsURL + GetUID()).then(res => { setUserProjects(res.data.data); setUserProjectsLength(res.data.data.length) }).catch(res => console.log(res))

        axios.get(userSkillsURL + GetUID()).then(res => { setUserSkills(res.data); setUserSkillsLength(res.data.length) }).catch(res => console.log(res))

        axios.get(userCertificatesURL + GetUID()).then(res => { setUserCertificates(res.data.data); setUserCertificatesLength(res.data.data.length) }).catch(res => console.log(res))

        axios.get(userLinksURL + GetUID()).then(res => { setUserLinks(res.data.data); setUserLinksLength(res.data.data.length) }).catch(res => console.log(res))

    }, [])


    return (
        <>

            {/* <Navbar /> */}

            <Fade>
                <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>


                    <Box sx={{ width: '100%', mt: { xs: 5, lg: 0 }, height: 'auto', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                        {/* SECTION 1  */}
                        {userProfile ? userProfile.map((data => {
                            return (
                                <Box key={data.id} sx={{ flex: 1, width: '100%' }}>

                                    <Box sx={{ position: { xs: 'inherit', lg: 'fixed' }, width: { xs: '100%', lg: '50%' } }}>

                                        <Box sx={{ position: { xs: 'inherit', lg: 'sticky' }, flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                            {/* SECTION A */}

                                            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>

                                                <Box sx={{ flex: 3, pl: { xs: 0, lg: 5 }, width: '100%', m: 'auto', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                                    <Typography sx={{ fontSize: '2.5rem', textAlign: { xs: 'center', lg: 'start' }, fontWeight: '700' }} variant='h3'>{data.fname + " " + data.lname}</Typography>

                                                    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                        <Box sx={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                                            <Typography sx={{ fontWeight: '700' }} variant='h6'>{data.position}</Typography>
                                                            <Typography variant='subtitle2'>@{userName}.hiam</Typography>

                                                            {/* USER LINKS */}
                                                            <Box sx={{ width: '100%', pr: { xs: 0, lg: 15 }, mt: 5, display: 'flex', justifyContent: { xs: 'space-evenly', lg: 'space-between' }, alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                                                {userLinks ? userLinks.slice(0).reverse().map((data => {
                                                                    return (
                                                                        <div key={data.id}>
                                                                            <MUILink href={`mailto:${data.link}`}>
                                                                                {data.name == 'G-mail' ? <Google sx={{ color: 'crimson', width: '35px', height: '35px' }} /> : null}
                                                                            </MUILink>

                                                                            <MUILink href={data.link}>
                                                                                {data.name == 'linkedIn' ? <LinkedIn sx={{ color: 'blue', width: '35px', height: '35px' }} /> : null}
                                                                            </MUILink>

                                                                            <MUILink href={data.link}>
                                                                                {data.name == 'Personal Website' ? <Language sx={{ color: 'orange', width: '35px', height: '35px' }} /> : null}
                                                                            </MUILink>

                                                                            <MUILink href={data.link}>
                                                                                {data.name == 'Instagram' ? <Instagram sx={{ color: 'purple', width: '35px', height: '35px' }} /> : null}
                                                                            </MUILink>

                                                                            {/* <Link href=":download">
                                                                                {data.name == 'download' ? <Download sx={{ color: 'black', width: '35px', height: '35px' }} /> : null}
                                                                            </Link> */}
                                                                        </div>

                                                                    )
                                                                })) : null}

                                                            </Box>

                                                        </Box>

                                                    </Box>

                                                </Box>

                                                <Box sx={{ mb: { xs: 5, lg: 0 }, flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Avatar src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} variant='square' sx={{ width: '175px', height: '175px', borderRadius: 2 }} />

                                                </Box>

                                            </Box>

                                            <Divider sx={{ width: '100%', margin: '25px 0px' }} />

                                            {/* SECTION B */}

                                            <Box sx={{ width: '100%', p: { xs: 1, lg: 2.5 }, height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: '2rem' }} variant='h4'>{data.qualification}</Typography>
                                                    <Typography variant='subtitle1'>QUALIFICATION</Typography>

                                                </Box>

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: '2rem' }} variant='h4'>{data.experience}</Typography>
                                                    <Typography variant='subtitle1'>YEARS OF XP</Typography>

                                                </Box>

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: '2rem' }} variant='h4'>{data.location}</Typography>
                                                    <Typography variant='subtitle1'>LOCATION</Typography>

                                                </Box>

                                            </Box>

                                            <Divider sx={{ width: '100%', margin: '25px 0px' }} />

                                            {/* SECTION C */}
                                            <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                <Box sx={{ width: { xs: '90%', lg: '85%' }, m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                                    <Typography sx={{ fontWeight: 700, m: { xs: '25px 0 ', lg: '0px' } }} variant='h5'>BIOGRAPHY</Typography>
                                                    <Typography sx={{ fontWeight: 700, textAlign: { xs: 'center', lg: 'start' } }} variant='subtitle2'>{data.biography}</Typography>

                                                </Box>

                                            </Box>

                                        </Box>

                                    </Box>

                                </Box>
                            )
                        })) : <>
                            {/* LOADING SKELETON */}
                            <Box sx={{ width: { xs: '100%', lg: '50%' }, alignItems: 'center', justifyContent: 'space-evenly', height: '100vh' }}>
                                {/* SECTION 1 */}
                                <Stack sx={{ width: { xs: '100%', lg: '80%' }, m: 'auto', height: '30%', flexDirection: { xs: 'column-reverse', lg: 'row' } }} >

                                    <Stack sx={{ width: { xs: '80%', lg: '50%' }, m: 'auto', alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }} direction="column">
                                        <Skeleton animation='wave' sx={{ width: '100%', height: '70%' }} />
                                        <Skeleton animation='wave' sx={{ width: '50%', height: '30%' }} />

                                        <Stack sx={{ width: '100%', height: '50%', justifyContent: 'space-evenly' }} direction="row">
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />

                                        </Stack>

                                    </Stack>

                                    <Skeleton variant='square' animation='wave' sx={{ width: { xs: '200px', lg: '175px' }, m: 'auto', height: { xs: '400px', lg: '175px' } }} />
                                </Stack>

                                {/* SECTION 2 */}
                                <Stack sx={{ width: '80%', m: 'auto', height: '30%', justifyContent: 'space-evenly' }} direction='row'>

                                    <Stack sx={{ flex: 1, justifyContent: 'center', height: '100%', m: 'auto' }} direction='column'>
                                        <Skeleton sx={{ width: '75%', height: { xs: '50%', lg: '100%' }, borderRadius: '10px' }} animation='pulse' />
                                    </Stack>
                                    <Stack sx={{ flex: 1, height: { xs: '50%', lg: '100%' }, m: 'auto' }} direction='column'>
                                        <Skeleton sx={{ width: '75%', height: '100%', borderRadius: '10px' }} animation='pulse' />
                                    </Stack>
                                    <Stack sx={{ flex: 1, height: { xs: '50%', lg: '100%' }, m: 'auto' }} direction='column'>
                                        <Skeleton sx={{ width: '75%', height: '100%', borderRadius: '10px' }} animation='pulse' />
                                    </Stack>

                                </Stack>

                                <Stack sx={{ width: '80%', height: '30%', m: 'auto' }} direction='row'>
                                    <Skeleton sx={{ width: '100%', height: '100%', borderRadius: '10px' }} animation='pulse' />
                                </Stack>
                            </Box>
                        </>}

                        {/* SECTION 2 */}
                        <Box gap={5} sx={{ flex: 1, mt: { xs: 5, lg: 0 }, width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            {/* PROJECTS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                <Typography sx={{ fontWeight: 700 }} variant='h5'>PROJECTS ({userProjectsLength})</Typography>

                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                                    {userProjects ? userProjects.map((data => {
                                        return (

                                            <Box key={data.id} sx={{ maxWidth: '25%' }}>
                                                <CardMedia sx={{ height: { xs: '100px', lg: '150px' }, width: { xs: '100px', lg: '150px' }, objectFit: 'cover', borderRadius: 2 }} image={`https://haseebxqureshi.pythonanywhere.com${data.projectImage}`} />
                                                {/* <img style={{ height: '150px', width: '150px', objectFit: 'cover' }} src={`https://haseebxqureshi.pythonanywhere.com${data.projectImage}`} alt="" /> */}
                                            </Box>

                                        )
                                    })) : null}

                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link to='/allprojects'>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'text.primary' }} variant='subtitle2'>
                                            VIEW MORE PROJECTS {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>
                            </Box>

                            {/* EXPERIENCE SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                <Typography sx={{ fontWeight: 700 }} variant='h5'>WORK EXPERIENCE ({userExperienceLength})</Typography>

                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>

                                    {userExperience ? userExperience.slice(0, 1).map((data => {
                                        return (
                                            <Card key={data.id} sx={{ flex: 1, boxShadow: 0, maxWidth: '100%' }}>
                                                <CardActionArea>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1, fontSize: { xs: '1.5rem', lg: '1.75rem' } }} variant="h4">{data.companyName}</Typography>
                                                    <Typography sx={{ float: 'right', fontWeight: 700, p: 1 }} variant="subtitle1">{data.fullTime}</Typography>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle1"> {data.position} </Typography>
                                                    <Typography sx={{ float: 'right', fontWeight: 700, p: 1 }} variant="subtitle2"> To {data.endDate}</Typography>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle2"> From {data.startDate}</Typography>
                                                </CardActionArea>
                                            </Card>
                                        )
                                    })) : null}
                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link to='/allexperiences'>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'text.primary' }} variant='subtitle2'>
                                            VIEW MORE EXPERIENCES {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>

                            </Box>


                            {/* CERTIFICATIONS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                <Typography sx={{ fontWeight: 700 }} variant='h5'>CERTIFICATIONS ({userCertificatesLength})</Typography>

                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>

                                    {userCertificates ? userCertificates.slice(0, 1).map((data => {
                                        return (
                                            <Card key={data.id} sx={{ flex: 1, boxShadow: 0, maxWidth: '100%' }}>
                                                <CardActionArea>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1, fontSize: { xs: '1.5rem', lg: '1.75rem' } }} variant="h4">{data.name}</Typography>
                                                    <Typography sx={{ float: 'right', fontWeight: 700, p: 1 }} variant="subtitle1"> On: {data.issueDate}</Typography>
                                                    <Typography sx={{ fontWeight: 700, p: 1 }} variant="subtitle1"> Issued by : {data.issuedBy} </Typography>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle2">Link : {data.link}</Typography>
                                                </CardActionArea>
                                            </Card>

                                        )
                                    })) : null}

                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link to='/allcertificates'>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'text.primary' }} variant='subtitle2'>
                                            VIEW MORE CERTIFICATES {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>

                            </Box>

                            {/* SKILLS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                <Typography sx={{ fontWeight: 700 }} variant='h5'>SKILLS ({userSkillsLength})</Typography>

                                <Box gap={5} sx={{ flex: 1, flexWrap: { xs: 'wrap' }, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: { xs: 'space-between', lg: 'space-between' }, alignItems: 'flex-start' }}>

                                    {userSkills ? userSkills.slice(0, 3).map((data => {
                                        return (
                                            <Chip key={data.id} sx={{ fontWeight: 700, fontSize: '1rem' }} avatar={<Avatar>{data.level}</Avatar>} label={data.name} />
                                        )
                                    })) : null}
                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link to='/allskills'>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'text.primary' }} variant='subtitle2'>
                                            VIEW MORE SKILLS {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>

                            </Box>

                        </Box>

                    </Box>


                </Box>
            </Fade>
        </>
    )
}
