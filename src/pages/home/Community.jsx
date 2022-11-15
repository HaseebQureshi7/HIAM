import { Launch, People, Search, ViewAgenda } from "@mui/icons-material";
import { Avatar, Box, Chip, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "../../components/AnimationEngine";
import Navbar from "../../components/NavBar";

export default function Community() {

    const newUsersURL = 'http://haseebxqureshi.pythonanywhere.com/api/newusers'
    const searchUsersURL = 'http://haseebxqureshi.pythonanywhere.com/api/searchuser/'

    const [newUsers, setNewUsers] = useState(null)
    const [searchedUser, setSearchedUser] = useState(null)

    async function SearchUsers(e) {
        e.preventDefault()
        let user = e.target.value
        if (user.length >= 3) {
            await axios.get(searchUsersURL + user).then(res => { setSearchedUser(res.data.user) }).catch(res => console.log(res))
        }
        else {
            console.log('enter more than 3 chars to initiate search!')
        }
    }

    useState(() => {
        axios.get(newUsersURL).then(res => { setNewUsers(res.data.users) }).catch(res => console.log(res))
    }, [])

    return (
        <>
            {/* <Navbar /> */}
            <Fade>
                <Box sx={{ width: { xs: '90%', lg: '75%' }, height: 'auto', m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', pt: { xs: 5, lg: 2.5 }, alignItems: 'center', gap: 10 }}>

                    {/* SEARCH PEOPLE SECTION */}
                    <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start', gap: 2.5 }} >

                        <TextField onChange={SearchUsers} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchedUser ? <>
                                        <Link style={{ 'textDecoration': 'none' }} to={`/users/${searchedUser.belongsTo}`}>
                                            <Chip sx={{ fontSize: '1rem', fontWeight: 700, }} avatar={<Avatar src={`http://127.0.0.1:8000${searchedUser.profilePicture}`} />} label={`${searchedUser.fname} ${searchedUser.lname} ?`} variant="outlined" />
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

                        <Typography sx={{ fontSize: '2rem', fontWeight: 700 }} variant="h4">NEWEST MEMBERS OF HIAM</Typography>

                        <Stack sx={{ width: '100%', height: 'auto', gap: 2.5 }} direction="column">

                            {newUsers ? newUsers.map((data => {
                                return (
                                    <div key={data.id}>

                                        {/* PEOPLE DESKTOP */}
                                        <Stack sx={{ display: { xs: 'none', lg: 'flex' }, width: '75%', height: 'auto', p: 0.5, justifyContent: 'space-between', alignItems: 'center', border: '2px solid black', borderRadius: '50px' }} direction="row">
                                            <Avatar src={`http://127.0.0.1:8000${data.profilePicture}`} />
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.fname + ' ' + data.lname}</Typography>
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.position}</Typography>
                                            <Typography sx={{ fontWeight: 700 }} variant="h6">{data.experience} YEARS</Typography>
                                            <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', color: 'primary.main' }}><Link to={`/users/${data.belongsTo}`}><Launch sx={{ color: 'primary.main' }} /></Link></Avatar>
                                        </Stack>

                                        {/* PEOPLE MOBILE */}
                                        <Stack sx={{ display: { xs: 'flex', lg: 'none' }, width: '100%', height: 'auto', p: 1, justifyContent: 'space-between', alignItems: 'center' }} gap={0} direction="column">

                                            <Stack sx={{ width: '100%', m: '10px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 1, alignItems: 'flex-start', borderLeft: '2px solid black', pl: 1.75 }}>

                                                <Avatar src={`http://127.0.0.1:8000${data.profilePicture}`} variant="square" sx={{ width: '100px', height: '100px' }} />
                                                <Typography sx={{ fontWeight: 700 }} variant="h6">{data.fname + ' ' + data.lname}</Typography>
                                                <Typography sx={{ fontWeight: 700 }} variant="h6">{data.position}</Typography>

                                                <Stack width="100%" justifyContent={'space-between'} direction="row">
                                                    <Typography sx={{ fontWeight: 700 }} variant="h6">{data.experience} YEARS</Typography>
                                                    <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', borderTopLeftRadius: 0, border: '3px solid', color: 'primary.main' }}><Link to={`/users/${data.belongsTo}`}><Launch sx={{ color: 'primary.main' }} /></Link></Avatar>
                                                </Stack>

                                            </Stack>

                                        </Stack>

                                    </div>
                                )
                            })) : null}

                        </Stack>

                    </Box>

                </Box>
            </Fade>

        </>
    )
}
