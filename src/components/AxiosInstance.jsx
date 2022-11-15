import axios from "axios";

var Access = null

if (localStorage.getItem('Access')) {
    Access = JSON.parse(localStorage.getItem('UserID'))
    console.log(Access)
}
else {
    console.log('NO UID FOUND!')
}

export const AxiosInstance = axios.create({
    baseURL : 'https://haseebxqureshi.pythonanywhere.com/api/makeuserprofile',
    timeout : 2000,
    headers : {
        "Authorization" : `Bearer ${Access}`
    }
})