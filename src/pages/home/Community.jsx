import { Launch, Search } from "@mui/icons-material";
import { Avatar, Box, Chip, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "../../components/AnimationEngine";
import { StatisticsChart } from "../../components/StatisticsChart";

export default function Community() {

    const newUsersURL = 'https://haseebxqureshi.pythonanywhere.com/api/newusers'
    const searchUsersURL = 'https://haseebxqureshi.pythonanywhere.com/api/searchuser/'
    const statisticsURL = 'https://haseebxqureshi.pythonanywhere.com/api/statistics'

    let barData = [
        {
            name: "USERS",
            number: 59
        },
        {
            name: "PROJECTS",
            number: 107
        },
        {
            name: "CERTIFICATES",
            number: 75
        },
    ];

    const [newUsers, setNewUsers] = useState(null)
    const [searchedUser, setSearchedUser] = useState(null)

    const [statisticsData, setStatisticsData] = useState(null)


    async function DataFormatter(data) {
        const newBarData = [
            {
                name: "USERS",
                number: await data.users
            },
            {
                name: "PROJECTS",
                number: await data.projects
            },
            {
                name: "CERTIFICATES",
                number: await data.certificates
            },
        ]
        setStatisticsData(newBarData)
        return newBarData
    }

    async function SearchUsers(e) {
        e.preventDefault()
        let user = e.target.value
        if (user.length >= 3) {
            await axios.get(searchUsersURL + user).then(res => { setSearchedUser(res.data.user) }).catch(res => console.log(res))
        }
        // else {
        //     console.log('enter more than 3 chars to initiate search!')
        // }
    }

    useState(() => {

        axios.get(newUsersURL).then(res => { setNewUsers(res.data.users) }).catch(res => console.log(res))

        axios.get(statisticsURL).then(res => { DataFormatter(res.data) }).catch(res => console.log(res))

    }, [])

    console.log(statisticsData)

    return (
        <>
            {/* <Navbar /> */}
            <Fade>
                <Box sx={{ width: { xs: '90%', lg: '75%' }, minHeight: '100vh', m: 'auto', display: 'flex', flexDirection: 'column', pt: { xs: 5, lg: 2.5 }, alignItems: 'center', gap: 10 }}>

                    {/* SEARCH PEOPLE SECTION */}
                    <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }} >

                        <TextField onChange={SearchUsers} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchedUser ? <>
                                        <Link style={{ 'textDecoration': 'none' }} to={`/users/${searchedUser.belongsTo}`}>
                                            <Chip sx={{ fontSize: '1rem', fontWeight: 700, }} avatar={<Avatar src={`https://haseebxqureshi.pythonanywhere.com${searchedUser.profilePicture}`} />} label={`${searchedUser.fname} ${searchedUser.lname} ?`} variant="outlined" />
                                        </Link>
                                    </> : null}
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'inherit' }} />
                                </InputAdornment>
                            ),
                        }} label="Search People" sx={{ width: { xs: '90%', lg: '50%' }, m: 'auto' }}></TextField>

                    </Box>

                    {/* NEW PEOPLE SECTION */}
                    <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }} >

                        <Typography sx={{ fontSize: { xs: '1.5rem', lg: '2rem' }, fontWeight: 700 }} variant="h4">NEWEST MEMBERS OF HIAM</Typography>

                        <Stack sx={{ width: '100%', height: 'auto', gap: 2.5 }} direction="column">

                            {newUsers ? newUsers.map((data => {
                                return (
                                    <div key={data.id}>

                                        {/* PEOPLE DESKTOP */}
                                        <Stack sx={{ display: { xs: 'none', lg: 'flex' }, width: '75%', height: 'auto', p: 0.5, justifyContent: 'space-between', alignItems: 'center', border: '2px solid black', borderRadius: '50px' }} direction="row">
                                            <Avatar src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} />
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.fname + ' ' + data.lname}</Typography>
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.position}</Typography>
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.experience} YEARS</Typography>
                                            <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', color: 'primary.main' }}><Link to={`/users/${data.belongsTo}`}><Launch sx={{ color: 'primary.main' }} /></Link></Avatar>
                                        </Stack>

                                        {/* PEOPLE MOBILE */}
                                        <Stack sx={{ display: { xs: 'flex', lg: 'none' }, width: '100%', height: 'auto', flexWrap: 'wrap', p: 1, justifyContent: 'space-between', alignItems: 'center' }} gap={0} direction="row">
                                            {/* 
                                            <Stack sx={{ width: '100%', m: '5px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 1, alignItems: 'flex-start', borderLeft: '2px solid black', pl: 1.75 }}>

                                                <Avatar src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} variant="square" sx={{ width: '75px', height: '75px' }} />
                                                <Typography sx={{ fontWeight: 700, fontSize:'1.5rem' }} variant="h6">{data.fname + ' ' + data.lname}</Typography>
                                                <Typography sx={{ fontWeight: 700 }} variant="h6">{data.position}</Typography>

                                                <Stack width="100%" justifyContent={'space-between'} direction="row">
                                                    <Typography sx={{ fontWeight: 700, fontSize:'1rem' }} variant="h6">{data.experience} YEARS</Typography>
                                                    <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', borderTopLeftRadius: 0, border: '3px solid', color: 'primary.main' }}><Link to={`/users/${data.belongsTo}`}><Launch sx={{ color: 'primary.main' }} /></Link></Avatar>
                                                </Stack>

                                            </Stack> */}

                                            <Link style={{
                                                display: 'flex', width: '100%', alignItems: 'center', textDecoration: 'none', color: 'inherit', justifyContent: 'flex-end'
                                            }} to={`/users/${data.belongsTo}`}>
                                                <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 0, alignItems: 'center', }}>

                                                    <Avatar src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} sx={{ width: '75px', height: '75px' }} />

                                                    <Stack sx={{ mr: 2, textAlign: 'end' }}>

                                                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }} variant="h6">{data.fname + ' ' + data.lname}</Typography>
                                                        <Typography sx={{ fontWeight: 500 }} variant="subtitle2">{data.position}</Typography>
                                                        <Typography sx={{ fontWeight: 500 }} variant="subtitle2">{data.experience} Years</Typography>

                                                    </Stack>

                                                </Stack>
                                            </Link>

                                            {/* <Divider sx={{width:'75%', m:'auto'}} /> */}

                                        </Stack>

                                    </div>
                                )
                            })) : null}

                        </Stack>

                    </Box>


                    <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }} >

                        <Typography sx={{ fontSize: { xs: '1.5rem', lg: '2rem' }, fontWeight: 700 }} variant="h4">APP STATISTICS</Typography>

                        <Stack sx={{ width: '100%', height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }}>

                            {statisticsData ? <StatisticsChart props={statisticsData} /> : null}

                        </Stack>

                    </Box>

                </Box>
            </Fade>

        </>
    )
}
