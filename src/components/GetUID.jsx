export const GetUID = () => {
    if (localStorage.getItem('UserID')) {
        return JSON.parse(localStorage.getItem('UserID'))
    }
    else {
        console.log('NO UID FOUND!')
    }
}