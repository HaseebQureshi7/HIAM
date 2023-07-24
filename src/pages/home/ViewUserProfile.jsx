import { Google, Instagram, Language, LinkedIn, Verified } from '@mui/icons-material'
import { Avatar, Link as MUILink, Box, Card, CardActionArea, CardMedia, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Fade } from '../../components/AnimationEngine'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

export default function ViewUserProfile() {

    const { id } = useParams()

    const navigate = useNavigate()
    const location = useLocation()

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

    const getUsernameURL = baseURL + 'getusername/'

    const userProfileURL = baseURL + 'viewuserprofile/'
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

    useEffect(() => {

        axios.get(userProfileURL + id).then(res => { setUserProfile(res.data.data) }).catch(res => { console.log(res); navigate('/community') })

        axios.get(getUsernameURL + id).then(res => { setUserName(res.data) }).catch(res => console.log(res))

        axios.get(userExperienceURL + id).then(res => { setUserExperience(res.data.data); setUserExperienceLength(res.data != null ? res.data.data.length : 0) }).catch(res => console.log(res))

        axios.get(userProjectsURL + id).then(res => { setUserProjects(res.data.data); setUserProjectsLength(res.data.data != null ? res.data.data.length : 0) }).catch(res => console.log(res))

        axios.get(userSkillsURL + id).then(res => { setUserSkills(res.data); setUserSkillsLength(res.data != null ? res.data.length : 0) }).catch(res => console.log(res))

        axios.get(userCertificatesURL + id).then(res => { setUserCertificates(res.data.data); setUserCertificatesLength(res.data.data != null ? res.data.data.length : 0) }).catch(res => console.log(res))

        axios.get(userLinksURL + id).then(res => { setUserLinks(res.data.data) }).catch(res => console.log(res))

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

                                                    <Stack direction='row' sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', lg: 'flex-start' }, alignItems: 'center' }}>

                                                        <Typography sx={{ fontSize: '2.5rem', textAlign: { xs: 'center', lg: 'start' }, fontWeight: '700' }} variant='h3'>{data.fname + " " + data.lname}</Typography>

                                                        {data.fname == 'Haseeb' && data.lname == 'Qureshi' ? <Verified sx={{ width: '35px', height: '35px', color: '#2B65EC', ml: 1 }} /> : null}

                                                    </Stack>

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
                                                                                {data.name == 'G-mail' ? <Google sx={{ color: '#DB4437', width: '35px', height: '35px' }} /> : null}
                                                                            </MUILink>

                                                                            <MUILink href={data.link}>
                                                                                {data.name == 'linkedIn' ? <LinkedIn sx={{ color: '#0077b5', width: '35px', height: '35px' }} /> : null}
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

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', lg: '2rem' } }} variant='h4'>{data.qualification.toUpperCase()}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontWeight: 700, fontSize: { xs: '0.75rem', lg: '1rem' } }} variant='subtitle1'>QUALIFICATION</Typography>

                                                </Box>

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', lg: '2rem' } }} variant='h4'>{data.experience}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontWeight: 700, fontSize: { xs: '0.75rem', lg: '1rem' } }} variant='subtitle1'>EXPERIENCE</Typography>

                                                </Box>

                                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>

                                                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', lg: '2rem' } }} variant='h4'>{data.location.toUpperCase()}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', fontWeight: 700, fontSize: { xs: '0.75rem', lg: '1rem' } }} variant='subtitle1'>LOCATION</Typography>

                                                </Box>

                                            </Box>

                                            <Divider sx={{ width: '100%', margin: '25px 0px' }} />

                                            {/* SECTION C */}
                                            <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                <Box sx={{ width: { xs: '90%', lg: '85%' }, m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>

                                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Typography sx={{ flex: 1, fontWeight: 700, m: { xs: '25px 0 ', lg: '0px' } }} variant='h5' component='kbd'>BIOGRAPHY</Typography>
                                                        <Box className='fancy-line' sx={{ flex: { xs: 1, lg: 2 }, height: '2px' }}>
                                                        </Box>

                                                    </Box>

                                                    <Typography sx={{ color: 'text.secondary', fontWeight: 700, textAlign: { xs: 'start', lg: 'start' } }} variant='subtitle2'>{data.biography}</Typography>

                                                </Box>

                                            </Box>

                                            <Divider sx={{ display: { xs: 'inherit', lg: 'none' }, width: '80%', margin: '25px 0px' }} />

                                        </Box>

                                    </Box>

                                </Box>
                            )
                        })) : <>
                            {/* LOADING SKELETON */}
                            <Box sx={{ width: { xs: '100%', lg: '50%' }, alignItems: 'center', justifyContent: 'space-evenly', height: { xs: 'auto', lg: '100vh' } }}>
                                {/* SECTION 1 */}
                                <Stack sx={{ width: { xs: '100%', lg: '90%' }, m: 'auto', height: '30%', flexDirection: { xs: 'column-reverse', lg: 'row' }, gap: 2.5 }} >

                                    <Stack sx={{ width: { xs: '80%', lg: '70%' }, m: 'auto', alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }} direction="column">
                                        <Skeleton animation='wave' sx={{ width: { xs: '100%', lg: '90%' }, height: '75px' }} />
                                        <Skeleton animation='wave' sx={{ width: '50%', m: { xs: 'auto', lg: '0px' }, height: { xs: '30px', lg: '40px' } }} />

                                        <Stack sx={{ width: '100%', height: '50%', mt: 5, justifyContent: 'space-evenly' }} direction="row">
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />
                                            <Skeleton variant='circular' animation='wave' sx={{ width: '40px', height: '40px' }} />

                                        </Stack>

                                    </Stack>

                                    <Skeleton variant='square' animation='wave' sx={{ width: { xs: '175px', lg: '175px' }, m: 'auto', height: { xs: '175px', lg: '175px' } }} />
                                </Stack>

                                <Divider sx={{ width: '100%', margin: '25px 0px' }} />

                                {/* SECTION 2 */}
                                <Stack sx={{ width: '100%', m: 'auto', mt: 0, height: 'auto', justifyContent: 'space-evenly' }} direction='row'>

                                    <Skeleton sx={{ width: '75px', m: 'auto', height: '100px', }} animation='pulse' />

                                    <Skeleton sx={{ width: '75px', m: 'auto', height: '100px', }} animation='pulse' />

                                    <Skeleton sx={{ width: '75px', m: 'auto', height: '100px', }} animation='pulse' />

                                </Stack>

                                <Divider sx={{ width: '100%', margin: '25px 0px' }} />


                                {/* SECTION 3 */}
                                <Stack sx={{ width: '80%', height: 'auto', m: 'auto' }} direction='column'>

                                    <Skeleton sx={{ width: '50%', m: { xs: 'auto', lg: '0px' }, height: '50px', borderRadius: '10px' }} animation='pulse' />

                                    <Skeleton sx={{ width: '100%', m: { xs: 'auto', lg: '0px' }, mt: 2.5, height: '15px', borderRadius: '10px' }} animation='pulse' />

                                    <Skeleton sx={{ width: '75%', m: { xs: 'auto', lg: '0px' }, height: '15px', borderRadius: '10px' }} animation='pulse' />

                                    <Skeleton sx={{ width: '50%', m: { xs: 'auto', lg: '0px' }, height: '15px', borderRadius: '10px' }} animation='pulse' />

                                </Stack>
                            </Box>
                        </>}

                        {/* SECTION 2 */}
                        <Box gap={5} sx={{ flex: 1, mt: { xs: 5, lg: 0 }, width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            {/* PROJECTS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>


                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography sx={{ flex: 1, fontWeight: 700, ml: 2.5 }} variant='h5' component='kbd'>PROJECTS ({userProjectsLength})</Typography>

                                    <Box className='fancy-line' sx={{ flex: { xs: 1, lg: 2 }, height: '2px' }}>
                                    </Box>

                                </Box>

                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                                    {userProjects ? userProjects.map((data => {
                                        return (

                                            <Box key={data.id} sx={{ maxWidth: '25%' }}>
                                                <CardMedia sx={{ height: { xs: '100px', lg: '150px' }, width: { xs: '100px', lg: '150px' }, objectFit: 'cover', borderRadius: 1 }} image={`https://haseebxqureshi.pythonanywhere.com${data.projectImage}`} />
                                            </Box>

                                        )
                                    })) : <Typography variant="h5">NO PROJECTS ADDED : {'('}</Typography>}

                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link style={{ textDecoration: 'none' }} to={location.pathname == `/anonymous/users/${id}` ? `/anonymous/users/${id}/allprojects` : `/users/${id}/allprojects`}>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'primary.dark', textAlign: { xs: 'end', lg: 'end' }, textDecoration: 'none' }} variant='subtitle2'>VIEW MORE PROJECTS {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>
                            </Box>

                            {/* <Divider sx={{ width: '90%', margin: '0px 0px' }} /> */}


                            {/* EXPERIENCE SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>


                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography component='kbd' sx={{ flex: 3, fontWeight: 700, ml: 2.5 }} variant='h5'>WORK EXPERIENCE ({userExperienceLength})</Typography>

                                    <Box className='fancy-line' sx={{ flex: { xs: 1, lg: 3 }, height: '2px' }}>
                                    </Box>

                                </Box>

                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>

                                    {userExperience ? userExperience.slice(0, 1).map((data => {
                                        return (
                                            <Card elevation={0} key={data.id} sx={{ flex: 1, boxShadow: 0, maxWidth: '100%' }}>
                                                <CardActionArea>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1, fontSize: { xs: '1.25rem', lg: '1.75rem' } }} variant="h4">{data.companyName}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', float: 'right', fontWeight: 700, p: 1 }} variant="subtitle1">{data.fullTime}</Typography>
                                                    <Typography sx={{ color: 'secondary.dark', textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle1"> {data.position} </Typography>
                                                    <Typography sx={{ color: 'text.secondary', float: 'right', fontWeight: 700, p: 1 }} variant="subtitle2"> To {data.endDate}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle2"> From {data.startDate}</Typography>
                                                </CardActionArea>
                                            </Card>
                                        )
                                    })) : <Typography variant="h5">NO EXPERIENCES ADDED : {'('}</Typography>}
                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link style={{ textDecoration: 'none' }} to={location.pathname == `/anonymous/users/${id}` ? `/anonymous/users/${id}/allexperiences` : `/users/${id}/allexperiences`}>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'primary.dark', textAlign: { xs: 'end', lg: 'end' }, textDecoration: 'none' }} variant='subtitle2'>
                                            VIEW MORE EXPERIENCES {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>

                            </Box>

                            {/* <Divider sx={{ width: '90%', margin: '5px 0px' }} /> */}

                            {/* CERTIFICATIONS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>


                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography component='kbd' sx={{ flex: 2, fontWeight: 700, ml: 2.5 }} variant='h5'>CERTIFICATIONS ({userCertificatesLength})</Typography>

                                    <Box className='fancy-line' sx={{ flex: { xs: 1, lg: 2.5 }, height: '2px' }}>
                                    </Box>

                                </Box>
                                <Box gap={5} sx={{ flex: 1, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>

                                    {userCertificates ? userCertificates.slice(0, 1).map((data => {
                                        return (
                                            <Card elevation={0} key={data.id} sx={{ flex: 1, boxShadow: 0, maxWidth: '100%' }}>
                                                <CardActionArea>
                                                    <Typography sx={{ textAlign: 'start', fontWeight: 700, p: 1, fontSize: { xs: '1.25rem', lg: '1.75rem' } }} variant="h4">{data.name}</Typography>
                                                    <Typography sx={{ color: 'text.secondary', float: 'right', fontWeight: 700, p: 1 }} variant="subtitle1"> On: {data.issueDate}</Typography>
                                                    <Typography sx={{ color: 'secondary.dark', fontWeight: 700, p: 1 }} variant="subtitle1"> ISSUED BY : {data.issuedBy} </Typography>
                                                    <Typography sx={{ color: 'text.secondary', textAlign: 'start', fontWeight: 700, p: 1 }} variant="subtitle2">Link : {data.link}</Typography>
                                                </CardActionArea>
                                            </Card>

                                        )
                                    })) : <Typography variant="h5">NO CERTIFICATES ADDED : {'('}</Typography>}

                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link style={{ textDecoration: 'none' }} to={location.pathname == `/anonymous/users/${id}` ? `/anonymous/users/${id}/allcertificates` : `/users/${id}/allcertificates`}>
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'primary.dark', textAlign: { xs: 'end', lg: 'end' }, textDecoration: 'none' }} variant='subtitle2'>
                                            VIEW MORE CERTIFICATES {'>>'}
                                        </Typography>
                                    </Link>

                                </Box>

                            </Box>

                            {/* <Divider sx={{ width: '90%', margin: '5px 0px' }} /> */}

                            {/* SKILLS SECTION */}
                            <Box sx={{ width: '100%', p: { xs: '0 0', lg: '0 2.5vw' }, maxHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', lg: 'flex-start' } }}>


                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography component='kbd' sx={{ flex: 1, fontWeight: 700, ml: 2.5 }} variant='h5'>SKILLS ({userSkillsLength})</Typography>

                                    <Box className='fancy-line' sx={{ flex: { xs: 2, lg: 3 }, height: '2px' }}>
                                    </Box>

                                </Box>

                                <Box gap={5} sx={{ flex: 1, flexWrap: { xs: 'wrap' }, width: '90%', m: 'auto', mt: 3, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: { xs: 'space-between', lg: 'space-between' }, alignItems: 'flex-start' }}>

                                    {userSkills ? userSkills.slice(0, 3).map((data => {
                                        return (
                                            <Chip key={data.id} sx={{ fontWeight: 700, fontSize: '1rem' }} avatar={<Avatar>{data.level}</Avatar>} label={data.name} />
                                        )
                                    })) : <Typography variant="h5">NO SKILLS ADDED : {'('}</Typography>}
                                </Box>

                                <Box sx={{ p: 3, textAlign: 'end', width: '100%' }}>

                                    <Link style={{ textDecoration: 'none' }} to={location.pathname == `/anonymous/users/${id}` ? `/anonymous/users/${id}/allskills` : `/users/${id}/allskills`} >
                                        <Typography sx={{ font: 'subtitle2', fontWeight: 700, color: 'primary.dark', textAlign: { xs: 'end', lg: 'end' }, textDecoration: 'none' }} variant='subtitle2'>
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
