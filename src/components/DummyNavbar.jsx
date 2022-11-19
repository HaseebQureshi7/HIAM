import { Search } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function DummyNavbar() {

    const navigate = useNavigate()

    return (
        <>

            <AppBar sx={{ boxShadow: 'none', position: { xs: 'static', lg: "sticky" } }} color='transparent'>

                {/* MOBILE */}
                <Box sx={{ width: '100%', p: '10px 25px', display: { xs: 'flex', lg: 'none' }, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

                    <Link style={{ flex: 2, textDecoration: 'none', color: 'inherit' }} to={"/home"} >
                        <Typography sx={{ fontWeight: 900 }} variant="h4" noWrap component="strong"> HIAM </Typography>
                    </Link>

                </Box>

                {/* DESKTOP  */}
                <Box sx={{ width: '100%', p: '10px 25px', display: { xs: 'none', lg: 'flex' }, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Link style={{ flex: 2, textDecoration: 'none', color: 'inherit' }} to={"/"} >
                        <Typography sx={{ fontWeight: 900 }} variant="h4" noWrap component="strong"> HIAM </Typography>
                    </Link>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                        <Box sx={{ cursor: 'pointer' }} onClick={() => navigate('/search')}>
                            <Search />
                        </Box>

                        <Button onClick={() => navigate('/signup')} sx={{ padding: { xs: '5px 25px', lg: '5px 25px' } }} color="secondary" variant="contained" >GET YOUR LIVE RESUME</Button>

                    </Box>

                </Box>


            </AppBar>

        </>
    )
}
