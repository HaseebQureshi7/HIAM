import { Login, Logout, People, PersonAdd, Settings } from '@mui/icons-material'
import { AppBar, Avatar, Box, Stack, Button, Divider, ListItem, Menu, MenuItem, SwipeableDrawer, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GetUID } from './GetUID'

export default function Navbar() {

    const userProfileURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserprofile/'

    const [userProfile, setUserProfile] = useState(null)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState()

    const [openDrawer, setOpenDrawer] = useState(false)

    function LogoutUser() {
        localStorage.clear()
        setOpenDrawer(false)
        window.location.reload(false);
    }

    useEffect(() => {
        axios.get(userProfileURL + GetUID()).then(res => { setUserProfile(res.data.data) }).catch(res => console.log(res))
    }, [])

    return (
        <>

            <AppBar sx={{ boxShadow: 'none', position: { xs: 'static', lg: "sticky" } }} color='transparent'>

                {/* MOBILE */}
                <Box sx={{ width: '100%', p: '10px 25px', display: { xs: 'flex', lg: 'none' }, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                    <Link style={{ flex: 2, textDecoration: 'none', color: 'inherit' }} to={"/home"} >
                        <Typography sx={{ fontWeight: 900 }} variant="h4" noWrap component="strong"> HIAM </Typography>
                    </Link>

                    <Box sx={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        {userProfile ? userProfile.map((data => {
                            return (
                                <Avatar size='large' onClick={(e) => { setOpenDrawer(!open) }} key={data.id} src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} sx={{ float: 'right', width: '35px', height: '35px' }} />
                            )
                        })) : null}
                    </Box>
                    <SwipeableDrawer
                        anchor={'bottom'}
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        onOpen={() => setOpenDrawer(true)}
                    >
                        <Stack sx={{ width: '100%', height: '25vh', mb: 2 }} >

                            <Box sx={{ width: '75%', m: 'auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                <Stack onClick={() => setOpenDrawer(false)} direction="column">
                                    <Link style={{ 'flex': 1, 'textAlign': 'center' }} to={"/editprofile"} >
                                        <Tooltip title="Edit Profile">
                                            <Settings sx={{ width: '50px', color: 'black', height: '50px', '&:hover': { rotate: '180deg', position: 'relative', transform: "scale(1.5)", transition: 'all 1s ease ' }, '&:not(:hover)': { rotate: '0deg', position: 'inline', transform: "scale(1)", transition: 'all 1s ease ' } }} />
                                        </Tooltip>
                                    </Link>
                                    <Typography sx={{ flex: 2, fontWeight: 700 }} variant="subtitle2">SETTINGS</Typography>
                                </Stack>

                                <Stack onClick={() => setOpenDrawer(false)} direction="column">
                                    <Link style={{ 'flex': 1, 'textAlign': 'center' }} to={"/community"}>
                                        <Tooltip title="Community">
                                            <People sx={{ width: '50px', height: '50px', color: 'black', '&:hover': { transform: 'scale(1.4)', position: 'relative', transition: 'all 1s ease ' }, '&:not(:hover)': { transform: 'scale(1)', position: 'inline', transition: 'all 1s ease ' } }} />
                                        </Tooltip>
                                    </Link>
                                    <Typography sx={{ flex: 2, fontWeight: 700 }} variant="subtitle2">COMMUNITY</Typography>
                                </Stack>

                            </Box>
                            <Stack sx={{ width: '80%', m: 'auto', alignItems: 'center' }} direction="row" >

                                <Link style={{ flex: 2, color: 'inherit', textDecoration: 'none' }} to={'/home'}>
                                    <Typography sx={{ fontWeight: 700 }} variant="subtitle2">{userProfile ? '@' + " " + userProfile[0].fname + " " + userProfile[0].lname : null}</Typography>
                                </Link>

                                <Button onClick={() => LogoutUser()} sx={{ flex: 1, fontWeight: 700, width: '50%' }} color='error' endIcon={<Logout sx={{ color: 'error.main' }} />} variant="outlined" size='large'>LOGOUT</Button>

                            </Stack>

                        </Stack>

                    </SwipeableDrawer>

                </Box>

                {/* DESKTOP  */}
                <Box sx={{ width: '100%', p: '10px 25px', display: { xs: 'none', lg: 'flex' }, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Link style={{ flex: 2, textDecoration: 'none', color: 'inherit' }} to={"/home"} >
                        <Typography sx={{ fontWeight: 900 }} variant="h4" noWrap component="strong"> HIAM </Typography>
                    </Link>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Link to={"/editprofile"} >
                            <Tooltip title="Edit Profile">
                                <Settings sx={{ width: '30px', color: 'black', height: '30px', '&:hover': { rotate: '180deg', position: 'relative', transform: "scale(1.5)", transition: 'all 1s ease ' }, '&:not(:hover)': { rotate: '0deg', position: 'inline', transform: "scale(1)", transition: 'all 1s ease ' } }} />
                            </Tooltip>
                        </Link>
                        <Link to={"/community"}>
                            <Tooltip title="Community">
                                <People sx={{ width: '30px', height: '30px', color: 'black', '&:hover': { transform: 'scale(1.4)', position: 'relative', transition: 'all 1s ease ' }, '&:not(:hover)': { transform: 'scale(1)', position: 'inline', transition: 'all 1s ease ' } }} />
                            </Tooltip>
                        </Link>
                        {/* <Link to={"/home"}> */}

                        {userProfile ? userProfile.map((data => {
                            return (
                                <Avatar onClick={(e) => { setOpen(!open); setAnchorEl(e.currentTarget) }} key={data.id} src={`https://haseebxqureshi.pythonanywhere.com${data.profilePicture}`} sx={{ width: '30px', height: '30px' }} />
                            )
                        })) : null}

                        {/* </Link> */}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={() => setOpen(false)}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem sx={{ fontWeight: 900 }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/home'>
                                    <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Avatar />
                                        <Typography sx={{ fontWeight: 700 }}>PROFILE</Typography>
                                    </Stack>
                                </Link>
                            </MenuItem>

                            <Divider sx={{ width: '100%' }} />

                            <MenuItem>
                                <Button onClick={() => LogoutUser()} sx={{ fontWeight: 900 }} color='error' endIcon={<Logout sx={{ color: 'error.main' }} />} variant="outlined" size='large'>LOGOUT</Button>
                            </MenuItem>
                        </Menu>

                    </Box>

                </Box>


            </AppBar>

        </>
    )
}
