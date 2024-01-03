if(checkLogin()) window.location.href = "/"

function changeForm(type) {
    const container = document.getElementById('container');
    if(type) {
        container.classList.add("right-panel-active");
    }else {
        container.classList.remove("right-panel-active");
    }
}

function register(e) {
    e.preventDefault();
    let newUser = {
        id: Math.ceil(Date.now() * Math.random()),
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: hash(e.target.password.value),
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

function login(e) {
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

