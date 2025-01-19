// App functionality
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-todo");
    const addListBtn = document.querySelector(".add-list-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const taskContent = document.querySelector(".task-content");
    const taskNameHeader = document.querySelector(".taskname h2");

    // Data Storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {
        upcoming: [],
        today: [],
        stickyWall: []
    };

    let lists = JSON.parse(localStorage.getItem("lists")) || [];

    // Render tasks based on category
    const renderTasks = (category) => {
        taskNameHeader.textContent = category;
        taskContent.innerHTML = "";
        tasks[category].forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-item");
            taskElement.textContent = task;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                tasks[category].splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks(category);
            });

            taskElement.appendChild(deleteBtn);
            taskContent.appendChild(taskElement);
        });
    };

    // Add task to a category
    const addTask = (category) => {
        const task = prompt("Enter the task:");
        if (task) {
            tasks[category].push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(category);
        }
    };

    // Add a new list
    const addList = () => {
        const listName = prompt("Enter the list name:");
        if (listName) {
            lists.push(listName);
            localStorage.setItem("lists", JSON.stringify(lists));
            renderLists();
        }
    };

    // Render lists
    const renderLists = () => {
        const listsSection = document.querySelector(".lists");
        listsSection.innerHTML = "<button class='add-list-btn'><img width='20' height='20' src='https://img.icons8.com/plumpy/20/plus-math.png' alt='plus-math'> Add List</button>";

        lists.forEach((list, index) => {
            const listElement = document.createElement("div");
            listElement.classList.add("list-item");
            listElement.textContent = list;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                lists.splice(index, 1);
                localStorage.setItem("lists", JSON.stringify(lists));
                renderLists();
            });

            listElement.appendChild(deleteBtn);
            listsSection.appendChild(listElement);
        });

        // Reattach add-list button listener
        document.querySelector(".add-list-btn").addEventListener("click", addList);
    };

    // Search functionality
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredTasks = tasks.today.filter(task => task.toLowerCase().includes(query));
        taskContent.innerHTML = "";

        filteredTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-item");
            taskElement.textContent = task;
            taskContent.appendChild(taskElement);
        });
    });

    // Event Listeners for task sections
    document.querySelector(".upcoming").addEventListener("click", () => renderTasks("upcoming"));
    document.querySelector(".today").addEventListener("click", () => renderTasks("today"));
    document.querySelector(".stickywall").addEventListener("click", () => renderTasks("stickyWall"));

    // Initial renders
    renderTasks("today");
    renderLists();

    // Add Listeners for Add buttons
    addListBtn.addEventListener("click", addList);
    addTaskBtn.addEventListener("click", () => addTask("today"));
});
