import { Add, Edit, Link as LinkIcon } from "@mui/icons-material"
import { Avatar, Box, Button, Divider, Link, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Fade } from "../../components/AnimationEngine"
import { GetUID } from "../../components/GetUID"

export default function ViewAllCertificates() {

  const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

  const userCertificatesURL = baseURL + 'viewusercertificate/'

  const [userCertificates, setUserCertificates] = useState(null)
  const [userCertificatesLength, setUserCertificatesLength] = useState(0)

  useEffect(() => {
    axios.get(userCertificatesURL + GetUID()).then(res => { setUserCertificates(res.data.data); setUserCertificatesLength(res.data.data.length);}).catch(res => console.log(res))
  }, [])

  return (
    <>
      <Fade>
        <Box sx={{ width: { xs: '90%', lg: '75%' }, m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8 }}>

          <Stack sx={{ width: '100%', mt: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: 700 }} variant='h3'>CERTIFICATES ({userCertificatesLength})</Typography>
            <Avatar sx={{ bgcolor: 'primary.main', display: { xs: 'inherit', lg: 'none' }, fontWeight: 700 }}><Add /></Avatar>
            <Button sx={{ display: { xs: 'none', lg: 'inherit' }, fontWeight: 700 }} variant='outlined'>+ ADD CERTIFICATES</Button>
          </Stack>

          <Divider sx={{ width: '100%' }} />

          {userCertificates ? userCertificates.map((data => {
            return (

              <Box key={data.id} sx={{ width: '100%', height: 'auto', mb: 5, display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, justifyContent: { xs: 'center', lg: 'space-between' }, alignItems: 'center' }}>


                <Stack sx={{ flex: 1, gap: 1, textAlign: 'center', alignItems: { xs: 'center', lg: 'center' } }}>
                  <Typography sx={{ fontWeight: 700 }} variant='h4'>{data.name}</Typography>

                  <Stack sx={{ alignItems: 'center', flexDirection: { xs: 'column', lg: 'row' } }} direction='row'>
                    <Stack sx={{ flexDirection: { xs: 'row', lg: 'row' } }}>
                      {/* <Typography variant='h6'>Role:&nbsp;</Typography> */}
                      <Typography variant='h6'>ISSUED BY&nbsp;-&nbsp;</Typography>
                      <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.issuedBy.toUpperCase()}</Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: { xs: 'row', lg: 'row' } }}>
                      <Typography variant='h6'>&nbsp;AT&nbsp;-&nbsp;</Typography>
                      <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.issueDate}</Typography>
                    </Stack>
                  </Stack>
                  <Stack gap={2.5} direction='row'>
                    <Link href={data.link}>
                      <Avatar sx={{ bgcolor: 'black', '&:hover': { rotate: '-45deg', transition: 'all 0.75s ease ' }, '&:not(:hover)': { rotate: '0deg', transition: 'all 0.5s ease ' } }} > <LinkIcon /></Avatar>
                    </Link>
                    <Link href={'/'}>
                      <Avatar sx={{ bgcolor: 'black' }}><Edit /></Avatar>
                    </Link>
                  </Stack>
                </Stack>

              </Box>

            )
          })) : null}



        </Box>
      </Fade>
    </>
  )
}
