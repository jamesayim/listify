document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-todo");
    const addListBtn = document.querySelector(".add-list-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const taskContent = document.querySelector(".task-content");
    const taskNameHeader = document.querySelector(".taskname h2");

    // Data Storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {
        today: [],
        stickyWall: [],
    };

    let lists = JSON.parse(localStorage.getItem("lists")) || [];

    // Render tasks based on category
    const renderTasks = (category) => {
        taskNameHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        taskContent.innerHTML = "";

        tasks[category].forEach((task, index) => {
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");

            // Task Info
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");

            const taskTitle = document.createElement("h3");
            taskTitle.textContent = task.completed ? `✔️ ${task.title}` : task.title;
            taskTitle.style.textDecoration = task.completed ? "line-through" : "none";
            taskInfo.appendChild(taskTitle);

            const taskDescription = document.createElement("p");
            taskDescription.textContent = task.description || "No description provided.";
            taskDescription.style.textDecoration = task.completed ? "line-through" : "none";
            taskDescription.classList.add("task-description");
            taskInfo.appendChild(taskDescription);

            const taskTimestamp = document.createElement("span");
            taskTimestamp.classList.add("timestamp");
            taskTimestamp.textContent = task.timestamp;
            taskInfo.appendChild(taskTimestamp);

            taskContainer.appendChild(taskInfo);

            // Task Actions
            const taskActions = document.createElement("div");
            taskActions.classList.add("task-actions");

            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";
            completeBtn.addEventListener("click", () => toggleComplete(category, index));
            taskActions.appendChild(completeBtn);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editTask(category, index));
            taskActions.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask(category, index));
            taskActions.appendChild(deleteBtn);

            taskContainer.appendChild(taskActions);
            taskContent.appendChild(taskContainer);
        });
    };

    // Add new task
    const addTask = (category) => {
        const taskTitle = prompt("Enter task title:");
        const taskDescription = prompt("Enter task description:");
        if (taskTitle) {
            const newTask = {
                title: taskTitle,
                description: taskDescription || "No description provided.",
                timestamp: new Date().toLocaleString(),
                completed: false,
            };
            tasks[category].push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(category);
        }
    };

    // Toggle task completion
    const toggleComplete = (category, index) => {
        tasks[category][index].completed = !tasks[category][index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(category);
    };

    // Edit task
    const editTask = (category, index) => {
        const newTitle = prompt("Edit task title:", tasks[category][index].title);
        const newDescription = prompt(
            "Edit task description:",
            tasks[category][index].description
        );

        if (newTitle) {
            tasks[category][index].title = newTitle;
            tasks[category][index].description = newDescription || "No description provided.";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(category);
        }
    };

    // Delete task
    const deleteTask = (category, index) => {
        tasks[category].splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(category);
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
        const filteredTasks = tasks.today.filter((task) =>
            task.title.toLowerCase().includes(query)
        );

        taskContent.innerHTML = "";

        if (filteredTasks.length === 0) {
            taskContent.innerHTML = "<p>No tasks match your search.</p>";
            return;
        }

        filteredTasks.forEach((task, index) => {
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");
    
            // Task Info
            const taskInfo = document.createElement("div");
            taskInfo.classList.add("task-info");
    
            const taskTitle = document.createElement("h3");
            taskTitle.textContent = task.completed ? `✔️ ${task.title}` : task.title;
            taskTitle.style.textDecoration = task.completed ? "line-through" : "none";
            taskInfo.appendChild(taskTitle);
    
            const taskDescription = document.createElement("p");
            taskDescription.textContent = task.description || "No description provided.";
            taskDescription.classList.add("task-description");
            taskInfo.appendChild(taskDescription);
    
            const taskTimestamp = document.createElement("span");
            taskTimestamp.classList.add("timestamp");
            taskTimestamp.textContent = task.timestamp;
            taskInfo.appendChild(taskTimestamp);
    
            taskContainer.appendChild(taskInfo);
    
            // Task Actions
            const taskActions = document.createElement("div");
            taskActions.classList.add("task-actions");
    
            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";
            completeBtn.addEventListener("click", () => toggleComplete("today", index));
            taskActions.appendChild(completeBtn);
    
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editTask("today", index));
            taskActions.appendChild(editBtn);
    
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask("today", index));
            taskActions.appendChild(deleteBtn);
    
            taskContainer.appendChild(taskActions);
            taskContent.appendChild(taskContainer);
        });
        const searchingNameDisplay = () => {
            if (searchInput.value) {
                taskNameHeader.textContent = "searching...";
            } else {
                taskNameHeader.textContent = "today".charAt(0).toUpperCase() + "today".slice(1);
            };
        };
        searchingNameDisplay();
    });

    // Event Listeners for task sections
    document.querySelector(".today").addEventListener("click", () => renderTasks("today"));
    document.querySelector(".stickywall").addEventListener("click", () => renderTasks("stickyWall"));

    // Initial renders
    if (document.body.dataset.page === "app") {
        renderTasks("today");
        renderLists();

        // Add Listeners for Add buttons
        addListBtn.addEventListener("click", addList);
        addTaskBtn.addEventListener("click", () => addTask("today"));
    }

});
