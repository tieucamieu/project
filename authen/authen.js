function changeForm(type) {
    const container = document.getElementById('container');
    if(type) {
        container.classList.add("right-panel-active");
    }else {
        container.classList.remove("right-panel-active");
    }
}

function hash(str) {
    str = `asasd**_${str}_32423asdsa`
    let hashStr = "";
    for(let i in str) {
        hashStr += str[i].charCodeAt(0)
    }
    return hashStr * 2 + "yamieu"
}

function register(e) {
    e.preventDefault();
    let newUser = {
        id: Math.ceil(Date.now() * Math.random()),
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: hash(e.target.password.value),
    }
    let users = JSON.parse(localStorage.getItem("users") || "[]")
    if(users.find(user => user.email == newUser.email ||  user.userName == newUser.userName)) {
        alert("email or username trùng")
        return
    }

    localStorage.setItem("users", JSON.stringify([...users, newUser]))

    alert("SignUp ok!")
}

