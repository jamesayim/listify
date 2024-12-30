import "./styles.css";

const getPage = () => document.body.dataset.page;

if (getPage() === "home") {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    if (loginBtn || signupBtn) {
        function sendToLoginPage() {
            window.location.href = "login.html";
        }

        function sendToSignupPage() {
            window.location.href = "signup.html";
        }

        loginBtn.addEventListener("click", sendToLoginPage);
        signupBtn.addEventListener("click", sendToSignupPage);
    }
} else if (getPage() === "login") {
    import ("./login.css");
}

