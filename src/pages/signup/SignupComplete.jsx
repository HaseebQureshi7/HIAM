import { NavigateNext } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade, PopOut } from "../../components/AnimationEngine";
import { GetUID } from "../../components/GetUID";

export default function SignupComplete() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState()

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/viewuserprofile/'

    useEffect(() => {
        axios.get(baseURL + GetUID()).then(res => setUserData(res.data.data[0])).catch(res => console.log(res))
    }, [])

    return (
        <>
            <Fade>
                <Box sx={{ width: '100%', height: '100vh' }}>
                    <Stack sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Stack sx={{ textAlign: 'center' }}>
                            <Typography variant='h5'>WELCOME TO HIAM</Typography>
                            <Typography sx={{ fontSize: { xs: '2.25rem', lg: '2rem' } }} fontWeight={700} variant='h3'>{userData ? userData.fname.toUpperCase() + ' ' + userData.lname.toUpperCase() : null}</Typography>
                        </Stack>

                        <PopOut>
                            <Box sx={{ width: { xs: '25%', md: '15%' }, height: 'auto', m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <img style={{ width: '100%', height: 'auto' }} src="/images/party-emoji-png.png" alt="" />
                            </Box>
                        </PopOut>

                        <Button onClick={() => { navigate('/home'); localStorage.removeItem("Signup-mode") }} endIcon={<NavigateNext sx={{ color: 'primary.main' }} />} sx={{ padding: '5 25px', borderRadius: '2px', fontWeight: '700' }} size='large' variant="outlined">VIEW PROFILE</Button>
                    </Stack>
                </Box>
            </Fade>
        </>
    )
}
