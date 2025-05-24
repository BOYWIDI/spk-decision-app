const express = require('express');
const router = express.Router();

// Dummy data (ganti dengan database nanti)
let users = [
  { id: 1, name: "User One", age: 25 },
  { id: 2, name: "User Two", age: 30 }
];

router.get('/', (req, res) => res.json(users));
router.post('/', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
});

module.exports = router;