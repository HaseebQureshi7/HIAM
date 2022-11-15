import axios from "axios";

export default function TokenRefresher() {

    const baseURL = 'https://haseebxqureshi.pythonanywhere.com/api/token/refresh/'

    async function UpdateAccessToken() {
        if (localStorage.getItem('Refresh')) {
            await axios.post(baseURL, { refresh: localStorage.getItem('Refresh') }).then(res => { localStorage.setItem('Access', res.data.access); console.log('Access Token was updated!') }).catch(res => console.log(res))
            // console.log("REFRESH TOKEN WAS FOUND!")
        }
        else {
            console.log("NO REFRESH TOKEN FOUND!")
        }
    }

    setTimeout(() => {
        UpdateAccessToken()
    }, 2000);
}