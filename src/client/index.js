import "./styles.css";

class HandlePageEntry {
    constructor() {
        this.page = document.body.dataset.page;
        this.loginBtn = document.getElementById("login-btn");
        this.signupBtn = document.getElementById("signup-btn");
        this.trynowBtn = document.getElementById("try-for-free-btn");
        this.learnmoreBtn = document.getElementById("learn-more-btn");
        this.hamburgerSvgBtn = document.getElementById("hamburger-svg");
        this.hamburgerMenuElement = document.querySelector("#navlist");
    }
    sendToLoginPage() {
        window.location.href = "./login.html";
    }
    sendToSignupPage() {
        window.location.href = "./signup.html";
    }
    sendToAppPageFromTrynow() {
        window.location.href = "./app.html";
    }
    sendToAboutPage() {
        window.location.href = "./about.html";
    }
    sendToAppPage() {
        window.location.href = "./app.html";
    }
    toggleHamburgerMenu() {
        if (this.hamburgerMenuElement.style.display === "none") {
            this.hamburgerMenuElement.style.display = "flex";
            this.hamburgerSvgBtn.style.marginLeft = "0";
        } else {
            this.hamburgerMenuElement.style.display = "none";
            this.hamburgerSvgBtn.style.marginLeft = "280px";
            if (window.innerWidth <= 375) {
                this.hamburgerSvgBtn.style.marginLeft = "280px";
            }
            else if (window.innerWidth <= 425) {
                this.hamburgerSvgBtn.style.marginLeft = "200px";
            } else {
                this.hamburgerSvgBtn.style.marginLeft = "0";
            }
        }
    }
    displayNavList() {
        if (window.innerWidth >= 1024) {
            this.hamburgerMenuElement.style.display = "flex";
        } else {
            this.hamburgerMenuElement.style.display = "none";
            this.hamburgerSvgBtn.style.marginLeft = "0";
        }
    }
    initializeHamburgerSvgBtn() {
        if (window.innerWidth <= 425 && this.hamburgerSvgBtn) {
            const maxMargin = window.innerWidth - this.hamburgerSvgBtn.offsetWidth;
            const marginLeft = Math.min(200, maxMargin);
            this.hamburgerSvgBtn.style.marginLeft = `${marginLeft}px`;
            this.hamburgerSvgBtn.style.transition = "margin-left 0.3s ease";
        } else if (window.innerWidth >= 1024 || this.hamburgerMenuElement) {
                this.hamburgerMenuElement.style = "flex";
            } else if (this.hamburgerSvgBtn) {
                this.hamburgerSvgBtn.style.marginLeft = "0";
        } else if (!this.hamburgerSvgBtn || !this.hamburgerMenuElement) {
            return;
        }
    }
    addEventListeners() {
        // this.loginBtn.addEventListener("click", this.sendToLoginPage.bind(this));
        // this.signupBtn.addEventListener("click", this.sendToSignupPage.bind(this));
        this.signupBtn.addEventListener("click", this.sendToAppPage.bind(this));
        this.trynowBtn.addEventListener("click", this.sendToAppPageFromTrynow.bind(this));
        this.learnmoreBtn.addEventListener("click", this.sendToAboutPage.bind(this));
        this.hamburgerSvgBtn.addEventListener("click", this.toggleHamburgerMenu.bind(this));
        window.addEventListener("resize", this.initializeHamburgerSvgBtn.bind(this));
    }
}

const pageEntry = new HandlePageEntry();

if (pageEntry.page === "home" || pageEntry.page === "faq" || pageEntry.page === "about" || pageEntry.page === "tos" || pageEntry.page === "privacy-policy") {
    pageEntry.initializeHamburgerSvgBtn();
}

if (pageEntry.page === "home" || pageEntry.page === "faq" || pageEntry.page === "about" || pageEntry.page === "tos" || pageEntry.page === "privacy-policy") {
    pageEntry.toggleHamburgerMenu();
}

if (pageEntry.page === "home") {
    if (pageEntry.loginBtn || pageEntry.signupBtn || pageEntry.trynowBtn) {
        pageEntry.addEventListeners();
        pageEntry.displayNavList();
    } else if (pageEntry.learnmoreBtn) {
        pageEntry.trynowBtn.addEventListener("click", pageEntry.sendToAppPageFromTrynow.bind(pageEntry));
    }
} else if (pageEntry.page === "login") {
    import ("./login.css");
} else if (pageEntry.page === "signup") {
    import ("./signup.css");
} else if (pageEntry.page === "faq" || pageEntry.page === "about" || pageEntry.page === "tos" || pageEntry.page === "privacy-policy") {
    pageEntry.loginBtn.addEventListener("click", pageEntry.sendToLoginPage.bind(pageEntry));
    pageEntry.signupBtn.addEventListener("click", pageEntry.sendToSignupPage.bind(pageEntry));
    pageEntry.hamburgerSvgBtn.addEventListener("click", () => pageEntry.toggleHamburgerMenu());
    pageEntry.displayNavList();
} else if (pageEntry.page === "app") {
    import ("./app.css");
    import ("./app.js");
}

