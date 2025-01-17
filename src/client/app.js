const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = (todos) => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

class HandleTaskDisplayName {
    constructor() {
        this.upcomingTab = document.querySelector(".upcoming");
        this.todayTab = document.querySelector(".today");
        this.stickywallTab = document.querySelector(".stickywall");
        this.taskname = document.querySelector(".taskname h2");
    }
    clickTab() {
        this.upcomingTab.addEventListener("click", () => {
            this.upcomingTab.classList.add("active");
            this.todayTab.classList.remove("active");
            this.stickywallTab.classList.remove("active");
            this.updateTaskDisplayName();
        });
        this.todayTab.addEventListener("click", () => {
            this.todayTab.classList.add("active");
            this.upcomingTab.classList.remove("active");
            this.stickywallTab.classList.remove("active");
            this.updateTaskDisplayName();
        });
        this.stickywallTab.addEventListener("click", () => {
            this.stickywallTab.classList.add("active");
            this.upcomingTab.classList.remove("active");
            this.todayTab.classList.remove("active");
            this.updateTaskDisplayName();
        });
    }
    updateTaskDisplayName() {
        this.taskname.innerText = this.upcomingTab.classList.contains("active") ? "Upcoming" : this.todayTab.classList.contains("active") ? "Today" : "Stickywall";
    }
};

const letsHandleTaskDisplayName = new HandleTaskDisplayName();

letsHandleTaskDisplayName.clickTab();
letsHandleTaskDisplayName.updateTaskDisplayName();

