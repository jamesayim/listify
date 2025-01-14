const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = (todos) => {
    return JSON.parse(localStorage.getItem("todos")) || [];
};

