const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")

const showRegister = document.getElementById("show-register")
const showLogin = document.getElementById("show-login")

showRegister.addEventListener("click", () => {
    loginForm.classList.add("hidden")
    registerForm.classList.remove("hidden")
    clearMessages()
})

showLogin.addEventListener("click", () => {
    registerForm.classList.add("hidden")
    loginForm.classList.remove("hidden")
    clearMessages()
})

function clearMessages() {
    document.querySelectorAll(".error").forEach((e) => (e.textContent = ""))
    document.querySelectorAll(".success").forEach((e) => (e.textContent = ""))
}

//register validation
document.getElementById("register-btn").addEventListener("click", () => {
    clearMessages()
    const username = document.getElementById("reg-username").value.trim()
    const email = document.getElementById("reg-email").value.trim()
    const password = document.getElementById("reg-password").value.trim()
    const confirm = document.getElementById("reg-confirm").value.trim()

    let valid = true;

    if(!username) {
        document.getElementById("username-error").textContent = "Username is required!"
        valid = false;
    }

    if(!email) {
        document.getElementById("email-error").textContent = "Email is required!"
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("email-error").textContent = "Invalid email format.";
    valid = false;
    }

    if(password.length < 6) {
        document.getElementById("password-error").textContent = "Password must be at least 6 characters!"
        valid = false;
    }

    if(password !== confirm) {
        document.getElementById("password-error").textContent = "Passwords do not match!"
        valid = false;
    }

    if(valid) {
        document.getElementById("register-success").textContent = 
        "Registration successfull! You can now login.";

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("userName", username);
    }
})

//Login Validation

document.getElementById("login-btn").addEventListener("click", () => {
    clearMessages()

    const email = document.getElementById("login-email").value.trim()
    const password = document.getElementById("login-password").value.trim()

    const storedEmail = localStorage.getItem("userEmail")
    const storedPass = localStorage.getItem("userPassword")
    const storedUser = localStorage.getItem("userName")

    let valid = true;

    if(!email) {
        document.getElementById("login-email-error").textContent = "Email or username is required!"
        valid = false;
    }

    if(!password) {
        document.getElementById("login-password-error").textContent = "Password is required!"
        valid = false;
    }

    if (valid && (email === storedEmail || email === stroredUser) && password === storedPass) {
        document.getElementById("login-success").textContent = "Login Successful"
    } else if (valid) {
        document.getElementById("login-password-error").textContent = "Invalid Credentials"
    }
 })

const logoutBtn = document.getElementById("logout-btn")

logoutBtn.addEventListener("click", logout)

function logout() {
    const currentUser = localStorage.getItem("currentUser")

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    )

    if(!confirmLogout) {
        return;
    }

    logoutBtn.disabled = true;
    logoutBtn.textContent = "Logging out...";

    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("lastLogin")

    clearInterval(sessionTimer)

    setTimeout(() => {
        alert("You have been logged out succesfully")

        window.location.href = "index.html"
    }, 1000)
}