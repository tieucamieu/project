import {signInWithGoogle} from '../firebase.js'
if(checkLogin()) window.location.href = "/"
export function changeForm(type) {
    const container = document.getElementById('container');
    if(type) {
        container.classList.add("right-panel-active");
    }else {
        container.classList.remove("right-panel-active");
    }
}

export function register(e) {
    e.preventDefault();
    let newUser = {
        id: Math.ceil(Date.now() * Math.random()),
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: hash(e.target.password.value),
        avatar: "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
    }

    if(newUser.userName == "" || newUser.email == "") return

    let users = JSON.parse(localStorage.getItem("users") || "[]")
    if(users.find(user => user.email == newUser.email ||  user.userName == newUser.userName)) {
        alert("email or username trùng")
        return
    }

    localStorage.setItem("users", JSON.stringify([...users, newUser]))

    alert("Đăng ký thành công!")
    changeForm(false)
}

export function login(e) {
    e.preventDefault();
    let data = {
        loginId: e.target.loginId.value,
        password: e.target.password.value
    }
    let users = JSON.parse(localStorage.getItem("users") || "[]")
    let user = users.find(item => item.email == data.loginId || item.userName == data.loginId)
    if(!user) {
        alert("Tài khoản không tồn tại!")
        return
    }

    if(hash(data.password) != user.password) {
        alert("Mật khẩu không chính xác")
        return
    }
    let token = createToken(user)
    localStorage.setItem("token", token)
    window.location.href = '/'
}

document.getElementById("signIn").addEventListener("click", () => {
    changeForm(false)
})

document.getElementById("signUp").addEventListener("click", () => {
    changeForm(true)
})


document.getElementById("formSignIn").addEventListener("submit", (e) => {
    login(e)
})

document.getElementById("formRegister").addEventListener("submit", (e) => {
    register(e)
})

document.getElementById("signInWithGoogle").addEventListener("click", async () => {
        try {
            let result = await signInWithGoogle()
            let users = JSON.parse(localStorage.getItem("users") || "[]");
            let checkUser = users.find(user => user.email == result.user.email)
            if(checkUser) {
                // login
                let user = users.find(item => item.email == result.user.email)
                let token = createToken(user)
                localStorage.setItem("token", token)
                window.location.href = '/'
            }else {
                // register + login
                let newUser = {
                    id: Math.ceil(Date.now() * Math.random()),
                    userName: Math.ceil(Date.now() * Math.random()),
                    email: result.user.email,
                    password: hash(Math.ceil(Date.now() * Math.random())),
                    avatar: result.user.photoURL
                }
                localStorage.setItem("users", JSON.stringify([...users, newUser]))
                let token = createToken(newUser)
                localStorage.setItem("token", token)
                window.location.href = '/'
            }
        }catch(err) {
            console.log("err",err)
        }
})