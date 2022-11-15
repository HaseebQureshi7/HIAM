import jwtDecode from "jwt-decode"

export default function TokenDecoder() {
    let rawToken = null
    if (rawToken = localStorage.getItem('Access')) {
        const token = JSON.stringify(rawToken)
        const userId = jwtDecode(token).user_id
        localStorage.setItem('UserID', userId)
    }
    else {
        console.log('NO TOKEN WAS FOUND')
    }
}