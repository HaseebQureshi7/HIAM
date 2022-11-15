import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import MakeUserProfile from './pages/signup/MakeUserProfile'
import AddExperience from './pages/signup/AddExperience'
import MakeXp from './pages/signup/MakeXp'
import AddProjects from './pages/signup/AddProjects'
import MakeProject from './pages/signup/MakeProject'
import AddCertificates from './pages/signup/AddCertificates'
import MakeCertificate from './pages/signup/MakeCertificate'
import AddLinks from './pages/signup/AddLinks'
import SignupComplete from './pages/signup/SignupComplete'
import TokenRefresher from './components/TokenRefresher'
import { useEffect, useState } from 'react'
import { RefreshContext } from './context/RefreshContext'
import Home from './pages/home/Home'
import EditProfile from './pages/home/EditProfile'
import Community from './pages/home/Community'
import ViewUserProfile from './pages/home/ViewUserProfile'
import Navbar from './components/NavBar'
import ViewAllProjects from './pages/home/ViewAllProjects'
import ViewAllSkills from './pages/home/ViewAllSkills'
import ViewAllCertificates from './pages/home/ViewAllCertificates'
import ViewAllExperiences from './pages/home/ViewAllExperiences'
import ViewAllUserProjects from './pages/home/ViewUserPages/ViewAllUserProjects'
import ViewAllUserExperiences from './pages/home/ViewUserPages/ViewAllUserExperiences'
import ViewAllUserCertificates from './pages/home/ViewUserPages/ViewAllUserCertificates'
import ViewAllUserSkills from './pages/home/ViewUserPages/ViewAllUserSkills'

function App() {

  const [update, setUpdate] = useState(false)

  function Refresher() {
    setTimeout(() => {
      TokenRefresher()
      setUpdate(update + 1)
    }, 5 * 60 * 1000) // 5 mins of Timeout()
  }

  useEffect(() => {
    if (localStorage.getItem('Refresh')) {
      Refresher()
    }
  }, [update])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6200EE',
        light: '#9E66EF'
      },
      mode: 'light'
    },
    typography: {
      fontFamily: 'Montserrat'
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor='background.default' color='text.primary'>
        <RefreshContext.Provider value={{ update, setUpdate }}>
          {/* {localStorage.getItem('Refresh') ? <Navbar/>: null} */}
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {localStorage.getItem('Refresh') ?
              (<>
                {localStorage.getItem('Signup-mode') ?
                  <>
                    <Route path='/makeuserprofile' element={<MakeUserProfile />} />
                    <Route path='/addexperience' element={<AddExperience />} />
                    <Route path='/makexp' element={<MakeXp />} />
                    <Route path='/addprojects' element={<AddProjects />} />
                    <Route path='/makeproject' element={<MakeProject />} />
                    <Route path='/addcertificates' element={<AddCertificates />} />
                    <Route path='/makecertificate' element={<MakeCertificate />} />
                    <Route path='/addlinks' element={<AddLinks />} />
                    <Route path='/singupcomplete' element={<SignupComplete />} />
                  </>
                  :
                  <Route path="*" element={<Navigate to="/" replace />} />
                }
                <Route path='/home' element={<> <Navbar /> <Home /> </>} />
                <Route path='/editprofile' element={<> <Navbar /> <EditProfile /> </>} />
                <Route path='/community' element={<> <Navbar /> <Community /> </>} />
                <Route path='/allprojects' element={<> <Navbar /> <ViewAllProjects /> </>} />
                <Route path='/allexperiences' element={<> <Navbar /> <ViewAllExperiences /> </>} />
                <Route path='/allcertificates' element={<> <Navbar /> <ViewAllCertificates /> </>} />
                <Route path='/allskills' element={<> <Navbar /> <ViewAllSkills /> </>} />
                
                <Route path='/users/:id' element={<> <Navbar /> <ViewUserProfile /> </>}/>
                <Route path='/users/:id/allprojects' element={<> <Navbar /> <ViewAllUserProjects /> </>}/>
                <Route path='/users/:id/allexperiences' element={<> <Navbar /> <ViewAllUserExperiences /> </>}/>
                <Route path='/users/:id/allcertificates' element={<> <Navbar /> <ViewAllUserCertificates /> </>}/>
                <Route path='/users/:id/allskills' element={<> <Navbar /> <ViewAllUserSkills /> </>}/>
              </>)
              :
              (<>
                <Route path="*" element={<Navigate to="/" replace />} />
              </>)
            }

          </Routes>
        </RefreshContext.Provider>
      </Box>
    </ThemeProvider>
  )
}

export default App
