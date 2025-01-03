import "./styles.css";

class HandlePageEntry {
    constructor() {
        this.page = document.body.dataset.page;
        this.loginBtn = document.getElementById("login-btn");
        this.signupBtn = document.getElementById("signup-btn");
    }
    sendToLoginPage() {
        window.location.href = "./login.html";
    }
    sendToSignupPage() {
        window.location.href = "./signup.html";
    }
    addEventListeners() {
        this.loginBtn.addEventListener("click", this.sendToLoginPage.bind(this));
        this.signupBtn.addEventListener("click", this.sendToSignupPage.bind(this));
    }
}

const pageEntry = new HandlePageEntry();

if (pageEntry.page === "home") {
    if (pageEntry.loginBtn || pageEntry.signupBtn) {
        pageEntry.addEventListeners();
    }
} else if (pageEntry.page === "login") {
    import ("./login.css");
} else if (pageEntry.page === "signup") {
    import ("./signup.css");
} else if (pageEntry.page === "faq" || pageEntry.page === "about") {
    pageEntry.addEventListeners();
}