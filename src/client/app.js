document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-todo");
    const addListBtn = document.querySelector(".add-list-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const taskContent = document.querySelector(".task-content");
    const taskNameHeader = document.querySelector(".taskname h2");

    const apiUrl = "https://678e0d58a64c82aeb11eca8f.mockapi.io/";

    const tasks = { today: [], stickyWall: [] };
    const lists = [];

    // Fetch all tasks
    const fetchTasks = async (category = "today") => {
        
        try {
            const response = await fetch(`${apiUrl}tasks`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            tasks[category] = data.filter(task => task.category === category);
            renderTasks(category);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };    
    

    // Render tasks based on category
    const renderTasks = (category = "today") => {

        if (!category || typeof category !== "string") {
            console.error("Invalid category passed to renderTasks:", category);
        }

        if (!tasks[category]) {
            console.warn(`No tasks for category: ${category}. Defaulting to 'today'.`);
            category = "today";
        }

        taskNameHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        taskContent.innerHTML = "";

        tasks[category].forEach((task) => {
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
            completeBtn.addEventListener("click", () => toggleComplete(task.id, category));
            taskActions.appendChild(completeBtn);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editTask(task.id, category));
            taskActions.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask(task.id, category));
            taskActions.appendChild(deleteBtn);

            taskContainer.appendChild(taskActions);
            taskContent.appendChild(taskContainer);
        });
    };

    const addTask = async (category) => {
        const taskTitle = prompt("Enter task title:");
        const taskDescription = prompt("Enter task description:");
        if (taskTitle) {
            const newTask = {
                title: taskTitle,
                description: taskDescription,
                category: category,
                timestamp: new Date().toLocaleString(),
                completed: false
            };
    
            await fetch(`${apiUrl}tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
    
            fetchTasks(category);
        }
    };
    

    // Toggle task completion
    const toggleComplete = async (taskId, category) => {
        try {
        const task = tasks[category].find(t => t.id === taskId);
        if (!task) return;
    
        await fetch(`${apiUrl}tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ completed: !task.completed })
        });
        fetchTasks(category);
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };    

    // Edit task
    const editTask = async (taskId, category) => {
        const newTitle = prompt("Edit task title:");
        const newDescription = prompt("Edit task description:");
        if (newTitle || newDescription) {
            try {
            await fetch(`${apiUrl}tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle, description: newDescription })
            });
                fetchTasks(category);
            } catch (error) {
                console.error("Error editing task:", error);
            }
        };
    };
    
    // Delete task
    const deleteTask = async (taskId, category) => {
        try {
            await fetch(`${apiUrl}tasks/${taskId}`, { method: "DELETE" });
                fetchTasks(category);
            } catch (error) {
                console.error("Error deleting task:", error);
            }
    };
    

    // Add a new list
    const addList = async () => {
        const listName = prompt("Enter the list name:");
        if (listName) {
            const newList = { name: listName };
            
            try {
                const response = await fetch(`${apiUrl}lists`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newList)
                });
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    fetchLists();
                } catch (error) {
                    console.error("Error adding new list:", error);
                }
        }
    };

    // Fetch and render lists
const fetchLists = async () => {
    try {
        const response = await fetch(`${apiUrl}lists`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        renderLists(data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    // Render lists
    const renderLists = (data = []) => {
    const listsSection = document.querySelector(".lists");
    listsSection.innerHTML = "<button class='add-list-btn'><img width='20' height='20' src='https://img.icons8.com/plumpy/20/plus-math.png' alt='plus-math'> Add List</button>";

    data.forEach(list => {
        const listElement = document.createElement("div");
        listElement.classList.add("list-item");
        listElement.textContent = list.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteList(list.id));

        listElement.appendChild(deleteBtn);
        listsSection.appendChild(listElement);
    });

        // Reattach add-list button listener
        document.querySelector(".add-list-btn").addEventListener("click", addList);
    };

    // Delete list
    const deleteList = async (listId) => {
        try {
            await fetch(`${apiUrl}lists/${listId}`, { method: "DELETE" });
            fetchLists();
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    };

    // Search functionality
    if (searchInput) searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();

        const filteredTasks = tasks.today.filter((task) =>
            task.title.toLowerCase().includes(query)
        );

        taskContent.innerHTML = "";

        if (!tasks.today) {
            taskContent.innerHTML = "<p>Tasks are loading. Please wait...</p>";
            return;
        }

        if (filteredTasks.length === 0) {
            taskContent.innerHTML = "<p>No tasks match your search.</p>";
            taskNameHeader.textContent = "Search Results";
            return;
        }

        filteredTasks.forEach((task) => {
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
            completeBtn.addEventListener("click", () => toggleComplete(task.id, "today"));
            taskActions.appendChild(completeBtn);
    
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editTask(task.id, "today"));
            taskActions.appendChild(editBtn);
    
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask(task.id, "today"));
            taskActions.appendChild(deleteBtn);
    
            taskContainer.appendChild(taskActions);
            taskContent.appendChild(taskContainer);
        });
        const searchingNameDisplay = () => {
            taskNameHeader.textContent = query ? "Search Results" : "Today";
        };
        searchingNameDisplay();
    });

    // Initial renders
    if (document.body.dataset.page === "app") {
        // Event Listeners for task sections
        document.querySelector(".today").addEventListener("click", () => fetchTasks("today"));
        document.querySelector(".stickywall").addEventListener("click", () => fetchTasks("stickyWall"));

        fetchTasks("today");
        fetchLists();

        // Add Listeners for Add buttons
        addListBtn.addEventListener("click", addList);
        addTaskBtn.addEventListener("click", () => addTask("today"));
    }

});
