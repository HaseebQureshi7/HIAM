import { CallRounded, Mail, Place } from "@mui/icons-material"
import { Box, Button, Divider, Grid, Link, Modal, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { GetUID } from "../../../components/GetUID"

export default function ResumeTemplate0() {

  const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

  const userProfileURL = baseURL + 'viewuserprofile/'
  const userExperienceURL = baseURL + 'viewuserexperience/'
  const userProjectsURL = baseURL + 'viewuserproject/'
  const userSkillsURL = baseURL + 'viewuserskill/'
  const userCertificatesURL = baseURL + 'viewusercertificate/'
  const userLinksURL = baseURL + 'viewuserlink/'

  const [openModal, setOpenModal] = useState(true)

  const [userProfile, setUserProfile] = useState()

  const [phoneNumber, setPhoneNumber] = useState()

  const [userExperience, setUserExperience] = useState(null)

  const [userProjects, setUserProjects] = useState(null)

  const [userSkills, setUserSkills] = useState(null)

  const [userCertificates, setUserCertificates] = useState(null)

  const [userLinks, setUserLinks] = useState(null)
  const [userLinksLength, setUserLinksLength] = useState(0)



  function DownloadResume(e) {
    e.preventDefault()
    setOpenModal(false)
    setTimeout(() => {
      print()
    }, 500)
  }

  useEffect(() => {

    axios.get(userProfileURL + GetUID()).then(res => { setUserProfile(res.data.data) }).catch(res => console.log(res))

    axios.get(userExperienceURL + GetUID()).then(res => { setUserExperience(res.data.data); }).catch(res => console.log(res))

    axios.get(userProjectsURL + GetUID()).then(res => { setUserProjects(res.data.data); }).catch(res => console.log(res))

    axios.get(userSkillsURL + GetUID()).then(res => { setUserSkills(res.data); }).catch(res => console.log(res))

    axios.get(userCertificatesURL + GetUID()).then(res => { setUserCertificates(res.data.data); }).catch(res => console.log(res))

    axios.get(userLinksURL + GetUID()).then(res => { setUserLinks(res.data.data); }).catch(res => console.log(res))
  }, [])


  return (
    <>
      <Box style={{ height: '297mm', width: '210mm', margin: 'auto' }}>
        <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0, pt: 5 }}>


          <Modal
            sx={{ width: '100vw' }}
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
          >
            <Box sx={{ width: { xs: '90%', md: '50%' }, height: '100vh', m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <Box sx={{ width: '100%', p: 1.5, minHeight: '40vh', borderRadius: 5, bgcolor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>

                <Stack sx={{ width: '100%', p: "0.5vh 0vh" }} direction="row">
                  <Typography sx={{ fontWeight: '700', fontSize: '2rem' }} variant='h4'>CUSTOMIZATIONS</Typography>
                  {/* <Avatar onClick={() => setOpenModal(false)} sx={{ bgcolor: 'error.light', ml: 'auto' }}><Close /></Avatar> */}
                </Stack>

                <Typography sx={{ fontWeight: '500', color: 'text.secondary', fontSize: '0.75rem' }} variant='subtitle2'>CUSTOMIZE YOUR RESUME HERE</Typography>

                <Divider sx={{ width: '100%', mb: { xs: 1, lg: 1 } }} />

                <form onSubmit={e => DownloadResume(e)} style={{ width: '90%', margin: 'auto' }} >

                  <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >

                    <TextField onChange={(e) => setPhoneNumber(e.target.value)} sx={{ width: '100%' }} label="ADD A PHONE NUMBER" placeholder="9797012345" type='number' InputLabelProps={{ shrink: true }} variant="outlined" required />

                    <Button sx={{ mt: 1.5 }} type="submit" variant="contained">DOWNLOAD RESUME</Button>
                  </Stack>
                </form>
              </Box>

            </Box>
          </Modal>


          {userProfile ? <> <Typography sx={{ fontWeight: 700 }} variant='h4'>{userProfile[0].fname + ' ' + userProfile[0].lname}</Typography>
            <Typography sx={{ fontWeight: 700, color: 'primary.main' }} variant='h6'>{userProfile[0].position.toUpperCase()}</Typography> </> : null}

          {/* LINK BOX */}
          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <CallRounded />
              <Link sx={{ color: 'inherit' }} href={`tel:${phoneNumber}`}>
                <Typography sx={{ fontWeight: 700, ml: 1 }} variant='subtitle2'>{phoneNumber}</Typography>
              </Link>
            </Stack>

            {userLinks ? userLinks.map((data => {
              return (
                (data.name == 'G-mail' ? <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Mail />
                  <Link sx={{ color: 'inherit' }} href="mailto:qureshihaxeeb2@gmail.com">
                    <Typography sx={{ fontWeight: 700, ml: 1 }} variant='subtitle2'>{data.link}</Typography>
                  </Link>
                </Stack> : null)
              )
            })) : null}

            {userProfile ? <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Place />
              <Typography sx={{ fontWeight: 700, ml: 1 }} variant='subtitle2'>{userProfile[0].location.toUpperCase()}</Typography>
            </Stack> : null}

          </Box>

          {/* STATS */}
          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', p: 1 }}>

            {userProfile ? <Grid container sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

              {/* STATS CARD */}
              <Grid sx={{ textAlign: 'center', mt: 1 }} item xs={4}>
                <Typography sx={{ fontWeight: 700 }} variant='h6'>{userProfile[0].qualification.toUpperCase()}</Typography>
                <Typography sx={{ fontWeight: 700, color: 'text.secondary' }} variant='subtitle2'>HIGHEST QUALIFICATION</Typography>
              </Grid>

              {/* STATS CARD */}
              <Grid sx={{ textAlign: 'center', mt: 1 }} item xs={4}>
                <Typography sx={{ fontWeight: 700 }} variant='h6'>{userProfile[0].experience} YEARS</Typography>
                <Typography sx={{ fontWeight: 700, color: 'text.secondary' }} variant='subtitle2'>TOTAL EXPERIENCE</Typography>
              </Grid>

              {/* STATS CARD */}
              <Grid sx={{ textAlign: 'center', mt: 1 }} item xs={4}>
                <Typography sx={{ fontWeight: 700 }} variant='h6'>{userProfile[0].location.toUpperCase()}</Typography>
                <Typography sx={{ fontWeight: 700, color: 'text.secondary' }} variant='subtitle2'>LOCATION</Typography>
              </Grid>

            </Grid> : null}

          </Box>

          {/* BIOGRAPHY */}
          {userProfile ? <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', p: 1.5 }}>

            <Stack sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography sx={{ flex: 1, fontWeight: 700 }} variant='h5'>BIOGRAPHY</Typography>
              <Box sx={{ flex: 3, bgcolor: 'primary.main', height: '2px' }} />
            </Stack>

            <Typography sx={{ fontWeight: 700, color: 'text.secondary', p: '5px' }} variant='subtitle2'>{userProfile[0].biography}</Typography>

          </Box> : null}

          {/* WORK EXPERIENCE */}
          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', p: 1.5 }}>

            <Stack sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>

              <Typography sx={{ flex: 2, fontWeight: 700 }} variant='h5'>WORK EXPERIENCE</Typography>
              <Box sx={{ flex: 3, bgcolor: 'primary.main', height: '2px' }} />

            </Stack>

            {/* XP CARD */}
            {userExperience ? userExperience.map((data => {
              return (
                <Box sx={{ width: '75%', p: '5px 15px', pt: 1.5 }}>

                  <Typography sx={{ fontWeight: 700, color: 'primary.main' }} variant='h6'>{data.position.toUpperCase()}</Typography>


                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography sx={{ fontWeight: 700, color: 'text.primary' }} variant='subtitle1'>{data.companyName}</Typography>

                    <Typography sx={{ fontWeight: 700, color: 'text.secondary', p: '2.5px' }} variant='subtitle2'>FROM : {data.startDate}</Typography>

                    <Typography sx={{ fontWeight: 700, color: 'text.secondary', p: '2.5px' }} variant='subtitle2'>TO : {data.endDate}</Typography>

                  </Box>

                  <Typography sx={{ fontWeight: 700, color: 'text.primary', p: '2.5px' }} variant='subtitle1'>RESPONSIBILITIES</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'text.secondary', p: '2.5px' }} variant='subtitle2'>{data.responsibilities}</Typography>


                </Box>
              )
            })) : null}

          </Box>

          {/* PROJECTS */}
          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', p: 1.5 }}>

            <Stack sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>

              <Typography sx={{ flex: 1, fontWeight: 700 }} variant='h5'>PROJECTS</Typography>
              <Box sx={{ flex: 3, bgcolor: 'primary.main', height: '2px' }} />

            </Stack>

            {/* PROJECT CARD */}
            {userProjects ? userProjects.map((data => {
              return (
                <Box sx={{ width: '75%', p: '5px 15px', pt: 1.5 }}>

                  <Typography sx={{ fontWeight: 700, color: 'primary.main' }} variant='h6'>{data.name}</Typography>

                  <Typography sx={{ fontWeight: 700, color: 'text.primary' }} variant='subtitle1'>{data.role}</Typography>

                  <Typography sx={{ fontWeight: 700, color: 'text.primary', p: '2.5px' }} variant='subtitle1'>CONTRIBUTIONS</Typography>
                  <Typography sx={{ fontWeight: 700, color: 'text.secondary', p: '2.5px' }} variant='subtitle2'>{data.responsibilities}</Typography>


                </Box>
              )
            })) : null}

          </Box>

          {/* CERTIFICATES */}
          <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', p: 1.5 }}>

            <Stack sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>

              <Typography sx={{ flex: 1, fontWeight: 700 }} variant='h5'>CERTIFICATES</Typography>
              <Box sx={{ flex: 2, bgcolor: 'primary.main', height: '2px' }} />

            </Stack>

            {/* CERTIFICATE CARD */}
            {userCertificates ? userCertificates.map((data => {
              return (
                <Box sx={{ width: '75%', p: '5px 15px', pt: 1.5 }}>

                  <Typography sx={{ fontWeight: 700, color: 'primary.main' }} variant='h6'>{data.name}</Typography>


                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography sx={{ fontWeight: 700, color: 'text.primary' }} variant='subtitle1'>ISSUED BY : {data.issuedBy}</Typography>

                    <Typography sx={{ fontWeight: 700, color: 'text.primary' }} variant='subtitle1'>ISSUED AT : {data.issueDate}</Typography>

                  </Box>

                </Box>
              )
            })) : null}


          </Box>

          {/* SKILLS */}
          <Grid container sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', p: 1.5 }}>

            <Stack sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>

              <Typography sx={{ flex: 1, fontWeight: 700 }} variant='h5'>SKILLS</Typography>
              <Box sx={{ flex: 4, bgcolor: 'primary.main', height: '2px' }} />

            </Stack>

            {/* SKILLS CARD */}
            {userSkills ? userSkills.map((data => {
              return (
                <Grid item xs={3} sx={{ textAlign: 'center', p: '5px 15px', pt: 1 }}>

                  <Typography sx={{ fontWeight: 700, color: 'text.primary' }} variant='section1'>{data.name}</Typography>

                </Grid>
              )
            })) : null}


          </Grid>

        </Box>
      </Box>
    </>
  )
}
