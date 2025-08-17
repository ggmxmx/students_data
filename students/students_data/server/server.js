const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors())

// Initial students array
let students = [
    { id: 1, name: 'Alice', age: 20 },
];

// Track next unique ID (since Alice has ID 1)
let nextId = 2;


// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST a new student
app.post('/students', (req, res) => {
    const { name, age } = req.body;

    // Basic validation
    if (!name || typeof age !== 'number') {
        return res.status(400).json({ error: 'Name and age are required. Age must be a number.' });
    }

    const newStudent = {
        id: nextId++,
        name,
        age,
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// DELETE a student by ID
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = students.length;

    students = students.filter(student => student.id !== id);

    if (students.length === initialLength) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.status(204).send(); // Successfully deleted
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
