import { Add, Edit, Launch, Link as LinkIcon } from "@mui/icons-material"
import { Avatar, Box, Button, Chip, Divider, Link, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Fade } from "../../../components/AnimationEngine"

export default function ViewAllUserSkills() {

  const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'

  const {id} = useParams()

  const userSkillsURL = baseURL + 'viewuserskill/'

  const [userSkills, setUserSkills] = useState(null)
  const [userSkillsLength, setUserSkillsLength] = useState(0)

  useEffect(() => {
    axios.get(userSkillsURL + id).then(res => { setUserSkills(res.data); setUserSkillsLength(res.data.length); }).catch(res => console.log(res))
  }, [])

  return (
    <>
      <Fade>
        <Box sx={{ width: { xs: '90%', lg: '75%' }, m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 5 }}>

          <Stack sx={{ width: '100%', mt: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: 700 }} variant='h3'>SKILLS ({userSkillsLength})</Typography>
          </Stack>

          <Divider sx={{ width: '100%' }} />

          {userSkills ? userSkills.map((data => {
            return (

              <Stack key={data.id} sx={{ display: 'flex', width: '100%', height: 'auto', p: 0.5, justifyContent: 'space-between', alignItems: 'center', border: '2px solid black', borderRadius: '50px' }} direction="row">

                <Avatar>{data.level}</Avatar>

                <Typography sx={{ flex: 8, mx: 2.5, fontWeight: 700 }} variant="h6">{data.name.toUpperCase()}</Typography>

                <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', color: 'primary.main' }}><Link href={''}>
                </Link></Avatar>

              </Stack>


              // <Box key={data.id} sx={{ width: '100%', height: 'auto', mb: 5, display: 'flex', flexDirection: {xs:'column-reverse',lg:'row'}, justifyContent: {xs:'center',lg:'space-between'}, alignItems: 'center' }}>


              //     <Stack sx={{ flex: 1, gap: 1, alignItems:{xs:'center',lg:'flex-start'} }}>
              //         <Typography sx={{ fontWeight: 700 }} variant='h4'>{data.name}</Typography>
              //         <Stack direction='row'>
              //             <Typography variant='h6'>Role:&nbsp;</Typography>
              //             <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.role}</Typography>
              //         </Stack>
              //         <Stack direction='row'>
              //             <Typography variant='h6'>Based on:&nbsp;</Typography>
              //             <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.basedOn}</Typography>
              //         </Stack>
              //         <Stack direction='row'>
              //             <Typography variant='h6'>Released on:&nbsp;</Typography>
              //             <Typography sx={{ fontWeight: 700 }} variant='h6'>{data.releaseDate}</Typography>
              //         </Stack>
              //         <Stack gap={2.5} direction='row'>
              //             <Link href={data.projectLink}>
              //                 <Avatar sx={{ bgcolor: 'black', '&:hover': { rotate: '-45deg', transition: 'all 1s ease ' }, '&:not(:hover)': { rotate: '0deg', transition: 'all 1s ease ' } }} > <LinkIcon /></Avatar>
              //             </Link>
              //             <Link href={data.projectLink}>
              //                 <Avatar sx={{ bgcolor: 'black' }}><Edit /></Avatar>
              //             </Link>
              //         </Stack>
              //         <Stack sx={{textAlign:{xs:'center',lg:'start'}}}>
              //             <Typography sx={{ fontWeight: 700 }} variant='h5'>Contributions</Typography>
              //             <Typography sx={{ fontWeight: 700 }} variant='subtitle2'>{data.responsibilities}</Typography>
              //         </Stack>
              //     </Stack>

              // </Box>

            )
          })) : null}



        </Box>
      </Fade>
    </>
  )
}
