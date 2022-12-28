import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
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
import Navbar from '../src/components/Navbar'
import ViewAllProjects from './pages/home/ViewAllProjects'
import ViewAllSkills from './pages/home/ViewAllSkills'
import ViewAllCertificates from './pages/home/ViewAllCertificates'
import ViewAllExperiences from './pages/home/ViewAllExperiences'
import ViewAllUserProjects from './pages/home/ViewUserPages/ViewAllUserProjects'
import ViewAllUserExperiences from './pages/home/ViewUserPages/ViewAllUserExperiences'
import ViewAllUserCertificates from './pages/home/ViewUserPages/ViewAllUserCertificates'
import ViewAllUserSkills from './pages/home/ViewUserPages/ViewAllUserSkills'
import AddNewProject from './pages/home/AddNewPages/AddNewProject'
import AddNewExperience from './pages/home/AddNewPages/AddNewExperience'
import AddNewCertificate from './pages/home/AddNewPages/AddNewCertificate'
import EditProject from './pages/home/EditPages/EditProject'
import EditExperience from './pages/home/EditPages/EditExperience'
import EditCertificate from './pages/home/EditPages/EditCertificate'
import axios from 'axios'
import DummyNavbar from './components/DummyNavbar'
import { ThemeModeContext } from './context/ThemeModeContext'
import SearchPeople from './pages/landing/SearchPeople'
import ResumeTemplate0 from './pages/resumes/Template0/ResumeTemplate0'

function App() {

  const navigate = useNavigate()

  const location = useLocation()

  const [update, setUpdate] = useState(false)

  const [themeMode, setThemeMode] = useState('light')

  var now = new Date().getHours()
  // console.log(now)

  const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/token/refresh/'

  async function AutoLogin() {
    await axios.post(baseURL, { refresh: localStorage.getItem('Refresh') })
      .then(res => {
        localStorage.setItem('Access', res.data.access);
        // console.log('AutoLogin was Successful');
        return navigate('/home')
      })
      .catch(res => {
        // console.log(res);
        return navigate('/login')
      })

  }


  // ACCESS TOKEN WILL REFRESH EVERY 5 MINUTES
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



  useEffect(() => {
    // AutoLogin
    if (localStorage.getItem('Refresh')) {
      if (location.pathname == '/') {
        AutoLogin()
      }
    }
    else {
      console.log('Anonymous Mode [:]-|-<')
    }

    // Theme Mode Persistence
    if (localStorage.getItem('themeMode')) {
      setThemeMode(localStorage.getItem('themeMode'))

      // LIGHT MODE - (0)12 AM -> (19)7 PM)
      // DARK MODE - (19)7 PM -> (8)8 AM)
      if (now >= 19 || now <= 8) {
        setThemeMode('dark')
      }
    }
    else {
      localStorage.setItem('themeMode', themeMode)
    }


  }, [])


  // Auto Scroll-Up
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname])


  const theme = createTheme({
    palette: {
      primary: {
        main: '#6200EE',
        light: '#9E66EF'
      },
      secondary: {
        main: 'rgb(0, 247, 255)',
        light: ' rgb(84, 249, 255)'
      },
      mode: themeMode
    },
    typography: {
      fontFamily: 'Questrial'
    }
  })


  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <Box bgcolor='background.default' color='text.primary'>
          <RefreshContext.Provider value={{ update, setUpdate }}>
            {/* {localStorage.getItem('Refresh') ? <Navbar/>: null} */}
            <Routes>
              {/* FOR IMAGE PRELOAD */}
              <Route path='/' element={<> <img style={{ width: '0.1px', height: '0.1px' }} src="/images/hiam-mockup.png" alt="" /> <Landing /></>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/search' element={<> <DummyNavbar /> <SearchPeople /> </>} />

              {/* EXTERNAL USER LINKS */}
              <Route path='anonymous/users/:id' element={<> <DummyNavbar /> <ViewUserProfile /> </>} />
              <Route path='anonymous/users/:id/allprojects' element={<> <DummyNavbar /> <ViewAllUserProjects /> </>} />
              <Route path='anonymous/users/:id/allexperiences' element={<> <DummyNavbar /> <ViewAllUserExperiences /> </>} />
              <Route path='anonymous/users/:id/allcertificates' element={<> <DummyNavbar /> <ViewAllUserCertificates /> </>} />
              <Route path='anonymous/users/:id/allskills' element={<> <DummyNavbar /> <ViewAllUserSkills /> </>} />

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
                  <Route path='/downloadresume' element={<> <ResumeTemplate0 /> </>} />
                  <Route path='/editprofile' element={<> <Navbar /> <EditProfile /> </>} />
                  <Route path='/community' element={<> <Navbar /> <Community /> </>} />
                  <Route path='/allprojects' element={<> <Navbar /> <ViewAllProjects /> </>} />
                  <Route path='/allexperiences' element={<> <Navbar /> <ViewAllExperiences /> </>} />
                  <Route path='/allcertificates' element={<> <Navbar /> <ViewAllCertificates /> </>} />
                  <Route path='/allskills' element={<> <Navbar /> <ViewAllSkills /> </>} />

                  <Route path='/addnewproject' element={<> <Navbar /> <AddNewProject /> </>} />
                  <Route path='/addnewexperience' element={<> <Navbar /> <AddNewExperience /> </>} />
                  <Route path='/addnewcertificate' element={<> <Navbar /> <AddNewCertificate /> </>} />

                  <Route path='/editproject/:pid' element={<> <Navbar /> <EditProject /> </>} />
                  <Route path='/editexperience/:eid' element={<> <Navbar /> <EditExperience /> </>} />
                  <Route path='/editcertificate/:cid' element={<> <Navbar /> <EditCertificate /> </>} />

                  {/* EXTERNAL USER LINKS */}
                  <Route path='/users/:id' element={<> <Navbar /> <ViewUserProfile /> </>} />
                  <Route path='/users/:id/allprojects' element={<> <Navbar /> <ViewAllUserProjects /> </>} />
                  <Route path='/users/:id/allexperiences' element={<> <Navbar /> <ViewAllUserExperiences /> </>} />
                  <Route path='/users/:id/allcertificates' element={<> <Navbar /> <ViewAllUserCertificates /> </>} />
                  <Route path='/users/:id/allskills' element={<> <Navbar /> <ViewAllUserSkills /> </>} />
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
    </ThemeModeContext.Provider>
  )
}

export default App
