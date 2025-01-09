import "./styles.css";

class HandlePageEntry {
    constructor() {
        this.page = document.body.dataset.page;
        this.loginBtn = document.getElementById("login-btn");
        this.signupBtn = document.getElementById("signup-btn");
        this.trynowBtn = document.getElementById("try-for-free-btn");
        this.learnmoreBtn = document.getElementById("learn-more-btn");
    }
    sendToLoginPage() {
        window.location.href = "./login.html";
    }
    sendToSignupPage() {
        window.location.href = "./signup.html";
    }
    sendToSignupPageFromTrynow() {
        window.location.href = "./signup.html";
    }
    sendToAboutPage() {
        window.location.href = "./about.html";
    }
    addEventListeners() {
        this.loginBtn.addEventListener("click", this.sendToLoginPage.bind(this));
        this.signupBtn.addEventListener("click", this.sendToSignupPage.bind(this));
        this.trynowBtn.addEventListener("click", this.sendToSignupPageFromTrynow.bind(this));
        this.learnmoreBtn.addEventListener("click", this.sendToAboutPage.bind(this));
    }
}

const pageEntry = new HandlePageEntry();

if (pageEntry.page === "home") {
    if (pageEntry.loginBtn || pageEntry.signupBtn || pageEntry.trynowBtn) {
        pageEntry.addEventListeners();
    } else if (pageEntry.learnmoreBtn) {
        pageEntry.trynowBtn.addEventListener("click", pageEntry.sendToSignupPageFromTrynow.bind(pageEntry));
    }
} else if (pageEntry.page === "login") {
    import ("./login.css");
} else if (pageEntry.page === "signup") {
    import ("./signup.css");
} else if (pageEntry.page === "faq" || pageEntry.page === "about") {
    pageEntry.loginBtn.addEventListener("click", pageEntry.sendToLoginPage.bind(pageEntry));
    pageEntry.signupBtn.addEventListener("click", pageEntry.sendToSignupPage.bind(pageEntry));
} else if (pageEntry.page === "app") {
    import ("./app.css");
    import ("./app.js");
}

