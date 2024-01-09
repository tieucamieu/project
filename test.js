import {uploadFileToFireBaseStorage} from './firebase.js'

document.getElementById("test").addEventListener("submit", async (e) =>{
    e.preventDefault()

    let data = {
        userName: e.target.userName.value,
        password: e.target.password.value,
        avatar: await uploadFileToFireBaseStorage(e.target.avatar.files[0])
    }

    console.log("đã vào submit", data)
    
})