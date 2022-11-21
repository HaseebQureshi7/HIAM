import { Add, Close, DeleteForever } from "@mui/icons-material"
import { Alert, Avatar, Box, Button, Divider, FormControlLabel, Modal, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Fade } from "../../components/AnimationEngine"
import { GetUID } from "../../components/GetUID"

export default function ViewAllSkills() {

  const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/'
  const makeSkillURL = 'https://haseebxqureshi.pythonanywhere.com/api/makeuserskill'
  const deleteSkillURL = 'https://haseebxqureshi.pythonanywhere.com/api/deleteuserskill/'

  const userSkillsURL = baseURL + 'viewuserskill/'

  const navigate = useNavigate()

  const [openSnack, setOpenSnack] = useState(false)
  const [snackText, setSnackText] = useState(false)
  const [severity, setSeverity] = useState()

  const [updateList, setUpdateList] = useState(false)

  const [accessToken, setAccessToken] = useState()

  const [openModal, setOpenModal] = useState(false)

  const skillRef = useRef()
  const [level, setLevel] = useState(false)

  const [userSkills, setUserSkills] = useState(null)
  const [userSkillsLength, setUserSkillsLength] = useState(0)

  let axiosConfig = {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  };


  async function DeleteSkill(sid, name) {
    await axios.delete(deleteSkillURL + sid, axiosConfig).then(res => {
      navigate('/allskills');
      setOpenSnack(true);
      setSeverity("success");
      setSnackText(name + ' WAS DELETED SUCCESSFULLY!');
      setUpdateList(!updateList)
    }).catch(res => console.log(res))
  }


  async function AddSkill(e) {
    e.preventDefault()
    let form = new FormData()
    form.append('belongsTo', GetUID())
    form.append('name', skillRef.current.value)
    form.append('level', level)

    await axios.post(makeSkillURL, form, axiosConfig).then(res => {
      // console.log(res);
      setOpenModal(false);
      setOpenSnack(true);
      setSeverity("success");
      setSnackText(skillRef.current.value + ' WAS ADDED SUCCESSFULLY!');
    }).catch(res => console.log(res))
  }

  useEffect(() => {
    axios.get(userSkillsURL + GetUID()).then(res => { setUserSkills(res.data); setUserSkillsLength(res.data.length); }).catch(res => console.log(res))

    if (localStorage.getItem('UserID') || localStorage.getItem('Access')) {
      setAccessToken(localStorage.getItem('Access'))
    }
    else {
      console.log('NO UID FOUND!')
      setOpenSnack(true)
      setSeverity("error")
      setSnackText("FATAL ERROR! UID/ACCESS TOKEN WAS NOT FOUND!")
    }
  }, [openModal, updateList])

  return (
    <>
      <Fade>
        <Box sx={{ width: { xs: '90%', lg: '75%' }, minHeight: '100vh', m: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', pb: 5, alignItems: 'flex-start', gap: 5 }}>

          <Snackbar
            open={openSnack}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={() => setOpenSnack(!openSnack)}>
            <Alert severity={severity} variant='filled'>{snackText}</Alert>
          </Snackbar>

          <Stack sx={{ width: '100%', mt: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: { xs: '2rem', lg: '3rem' }, fontWeight: 700 }} variant='h3'>SKILLS ({userSkillsLength})</Typography>
            <Avatar onClick={() => setOpenModal(true)} sx={{ bgcolor: 'primary.main', display: { xs: 'inherit', lg: 'none' }, fontWeight: 700 }}><Add /></Avatar>
            <Button onClick={() => setOpenModal(true)} sx={{ display: { xs: 'none', lg: 'inherit' }, fontWeight: 700 }} variant='outlined'>+ ADD SKILLS</Button>
          </Stack>

          <Modal
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
          >
            <Box sx={{ width: { xs: '90%', md: '50%' }, height: '100vh', m: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <Box sx={{ width: '100%', p: 2.5, minHeight: '50vh', borderRadius: 5, bgcolor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>

                <Stack sx={{ width: '100%', p: "0.5vh 0vh" }} direction="row">
                  <Typography sx={{ fontWeight: '700', fontSize: '2rem' }} variant='h4'>ADD SKILLS</Typography>
                  <Avatar onClick={() => setOpenModal(false)} sx={{ bgcolor: 'error.light', ml: 'auto' }}><Close /></Avatar>
                </Stack>

                <Typography sx={{ fontWeight: '500', color: 'text.secondary', fontSize: '0.75rem' }} variant='subtitle2'>ADDED SKILLS WILL BE EDITABLE LATER</Typography>

                <Divider sx={{ width: '100%', mb: { xs: 5, lg: 5 } }} />

                <form style={{ width: '90%', margin: 'auto' }} onSubmit={(e) => AddSkill(e)} >
                  <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }} >
                    <TextField inputRef={skillRef} sx={{ width: '100%' }} label="SKILL NAME" placeholder="HTML" InputLabelProps={{ shrink: true }} variant="outlined" required />
                    {/* <TextField inputRef={levelRef} sx={{ width: '50%', ml: 'auto', mt: 5, mb: 5 }} type='number' label="SKILL LEVEL" placeholder="3" InputLabelProps={{ shrink: true }} variant="outlined" required /> */}

                    <RadioGroup onChange={(event) => { setLevel(event.target.value) }} sx={{ width: '100%', margin: '25px 0' }}>
                      <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-evenly' }}>
                        <FormControlLabel value={1} control={<Radio required />} label="Beginner(L1)" />
                        <FormControlLabel value={2} control={<Radio />} label="Intermediate(L2)" />
                        <FormControlLabel value={3} control={<Radio />} label="Advanced(L3)" />
                      </Box>
                    </RadioGroup>

                    <Button type="submit" variant="contained"> + ADD SKILL</Button>
                  </Stack>
                </form>
              </Box>

            </Box>
          </Modal>

          <Divider sx={{ width: '100%' }} />

          {userSkills ? userSkills.map((data => {
            return (

              <Stack key={data.id} sx={{ display: 'flex', width: '100%', height: 'auto', p: 0.5, justifyContent: 'space-between', alignItems: 'center', border: '2px solid', borderColor: 'text.primary', borderRadius: '50px' }} direction="row">

                <Avatar sx={{ fontWeight: 700, bgcolor: (data.level == 3 ? 'primary.main' : 'secondary.dark') }}>{data.level}</Avatar>

                <Typography sx={{ flex: 8, mx: 2.5, fontWeight: 700 }} variant="h6">{data.name.toUpperCase()}</Typography>

                <Avatar sx={{ fontWeight: 900, bgcolor: 'transparent', color: 'primary.main' }}>
                  <Avatar onClick={() => DeleteSkill(data.id, data.name)} sx={{ bgcolor: 'error.main' }}><DeleteForever /></Avatar>
                </Avatar>

              </Stack>
            )
          })) : <Typography variant="h4">NO SKILLS ADDED : {'('}</Typography>}



        </Box>
      </Fade>
    </>
  )
}
