const db = require("../../db/connection");

exports.getTodos = (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT * FROM todos WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch todos!' });
        res.json(results);
    });
};

exports.createTodo = (req, res) => {
    const userId = req.user.id;
    const { title } = req.body;

    const query = 'INSERT INTO todos (user_id, title) VALUES (?, ?)';
    db.query(query, [userId, title], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create todo!' });
        res.status(201).json({ message: 'Todo created successfully!' });
    });
};

exports.updateTodo = (req, res) => {
    const todoId = req.params.id;
    const { title, is_completed } = req.body;

    const query = 'UPDATE todos SET title = ?, is_completed = ? WHERE id = ?';
    db.query(query, [title, is_completed, todoId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update todo!' });
        res.json({ message: 'Todo updated successfully!' });
    });
};

exports.deleteTodo = (req, res) => {
    const todoId = req.params.id;

    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [todoId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete todo!' });
        res.json({ message: 'Todo deleted successfully!' });
    });
};
