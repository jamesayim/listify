# Listify

**Listify** is a sleek and functional web application designed for task and list management. With Listify, users can create, edit, and delete tasks, manage two categories, and add custom lists effortlessly.

---

## Features

- **Task Management**  
  - Add, edit, delete, and complete tasks.  
  - Organize tasks into categories like "Today" and "Sticky Wall."  
  - Filter tasks using a search bar for quick access.

- **List Management**  
  - Create and delete custom lists to organize your tasks better.  
  - Dynamic updates to the UI on list changes.  

- **Real-Time Data**  
  - All tasks and lists are synced with a [MockAPI](https://mockapi.io/), ensuring seamless CRUD operations.  

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** MockAPI for API-based task and list storage (no user authentication yet)
- **Deployment:** Works locally with no additional setup

---

## Installation

1. Clone the repository:  

   ```bash
   git clone https://github.com/jamesayim/listify.git

2. Navigate to the project directory:

    ```bash
    cd listify

3. Open template.html in your browser to start using Listify

```bash
cd listify
```

Open the `index.html` file in your preferred browser:

For example, in most file explorers, you can right-click on the file and select Open With > Browser Name.

Start using Listify to manage your tasks and lists!

---

## How to Use

### Tasks

1. **Add a Task:**
     - Click on the "Add Task" button.
     - Enter the title and description in the prompt.
     - Task is saved under the "Today" category by default.

2. **Edit/Delete/Complete Tasks:**
     - Use the respective buttons in the task card to modify or delete tasks.

3. **Search Tasks:**
     - Use the search bar to filter tasks by their title.

### Lists

1. **Add a List:**
     - Click on "Add List" and provide a name for the list.

2. **Delete a List:**
     - Use the "Delete" button next to a list name to remove it.

---

## API Integration

Listify uses MockAPI for persistent data storage.

- **API Endpoints:**
  - Tasks: <https://678e0d58a64c82aeb11eca8f.mockapi.io/tasks>
  - Lists: <https://678e0d58a64c82aeb11eca8f.mockapi.io/lists>

---

## Limitations

- **No Authentication:** Data is shared across all users using the same API endpoint.
- **MockAPI Limits:** Only suitable for demonstration purposes; not for production.

---

## Future Enhancements

- User-specific tasks and lists with login/signup functionality.
- UI/UX improvements.
- Support for due dates and notification/reminders.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Credits

Created by James Ayim as part of a Frontend portfolio project.
