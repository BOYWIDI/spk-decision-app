const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if (!rows.length) return res.status(401).json({ message: "User tidak ditemukan" });
        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Password salah" });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, "rahasia", { expiresIn: "1d" });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/register', async (req, res) => {
    const { username, name, password, age } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, password, name, role, age) VALUES (?, ?, ?, 'user', ?)", [username, hashed, name, age]);
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        const user = rows[0];
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, "rahasia", { expiresIn: "1d" });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Gagal registrasi", error: err.message });
    }
});

module.exports = router;