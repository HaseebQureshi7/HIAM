import { Launch, Search } from '@mui/icons-material'
import { Avatar, Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Fade } from '../../components/AnimationEngine'

export default function SearchPeople() {

    const searchUsersURL = 'https://haseebxqureshi.pythonanywhere.com/api/searchuser/'

    const [searchedUser, setSearchedUser] = useState(null)

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

    return (
        <>
            <Fade>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', pt: '5vh', height: "100vh", justifyContent: "flex-start", alignItems: "center" }} gap={10}>

                    {/* SEARCH PEOPLE SECTION */}
                    <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }} >

                        <TextField onChange={SearchUsers} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'inherit' }} />
                                </InputAdornment>
                            ),
                        }} label="Search People" sx={{ width: { xs: '90%', lg: '50%' }, m: 'auto' }}></TextField>

                    </Box>

                    <Stack sx={{ width: { xs: '90%', lg: '75%' }, justifyContent: 'flex-start', alignItems: 'center', height: 'auto', gap: 2.5 }} direction="column">

                        {searchedUser ? <>

                            {/* PEOPLE DESKTOP */}
                            <Stack sx={{ display: { xs: 'none', lg: 'flex' }, width: '75%', height: 'auto', p: 0.5, justifyContent: 'space-between', alignItems: 'center', border: '2px solid black', borderRadius: '50px' }} direction="row">
                                <Avatar src={`https://haseebxqureshi.pythonanywhere.com${searchedUser.profilePicture}`} />
                                <Typography sx={{ fontWeight: 700 }} variant="h6">{searchedUser.fname + ' ' + searchedUser.lname}</Typography>
                                <Typography sx={{ fontWeight: 700 }} variant="h6">{searchedUser.position}</Typography>
                                <Typography sx={{ fontWeight: 700 }} variant="h6">{searchedUser.experience} YEARS</Typography>
                                <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', color: 'primary.main' }}><Link to={`/anonymous/users/${searchedUser.belongsTo}`}><Launch sx={{ color: 'primary.main' }} /></Link></Avatar>
                            </Stack>

                            {/* PEOPLE MOBILE */}
                            <Stack sx={{ display: { xs: 'flex', lg: 'none' }, width: '100%', height: 'auto', flexWrap: 'wrap', p: 1, justifyContent: 'space-between', alignItems: 'center' }} gap={0} direction="row">

                                <Link style={{
                                    display: 'flex', width: '100%', alignItems: 'center', textDecoration: 'none', color: 'inherit', justifyContent: 'flex-end'
                                }} to={`/anonymous/users/${searchedUser.belongsTo}`}>
                                    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 0, alignItems: 'center', }}>

                                        <Avatar src={`https://haseebxqureshi.pythonanywhere.com${searchedUser.profilePicture}`} sx={{ width: '75px', height: '75px' }} />

                                        <Stack sx={{ mr: 2, textAlign: 'end' }}>

                                            <Typography sx={{ fontWeight: 700, fontSize: '1rem' }} variant="h6">{searchedUser.fname + ' ' + searchedUser.lname}</Typography>
                                            <Typography sx={{ fontWeight: 500 }} variant="subtitle2">{searchedUser.position}</Typography>
                                            <Typography sx={{ fontWeight: 500 }} variant="subtitle2">{searchedUser.experience} Years</Typography>

                                        </Stack>

                                    </Stack>
                                </Link>

                                {/* <Divider sx={{width:'75%', m:'auto'}} /> */}

                            </Stack>

                        </>
                            : <Typography sx={{ textAlign: 'center' }} variant="h4">SEARCH RESULTS WILL APPEAR HERE ; {')'}</Typography>}

                    </Stack>

                </Box>
            </Fade>
        </>
    )
}
