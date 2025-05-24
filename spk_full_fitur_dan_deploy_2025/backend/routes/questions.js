const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware');

router.get('/', auth, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM questions");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
});

router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    const { text } = req.body;
    try {
        await db.query("INSERT INTO questions (text) VALUES (?)", [text]);
        res.json({ message: "Pertanyaan ditambahkan" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menambah pertanyaan" });
    }
});

router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    const { id } = req.params;
    const { text } = req.body;
    try {
        await db.query("UPDATE questions SET text = ? WHERE id = ?", [text, id]);
        res.json({ message: "Pertanyaan diperbarui" });
    } catch (err) {
        res.status(500).json({ message: "Gagal mengubah pertanyaan" });
    }
});

router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    const { id } = req.params;
    try {
        await db.query("DELETE FROM questions WHERE id = ?", [id]);
        res.json({ message: "Pertanyaan dihapus" });
    } catch (err) {
        res.status(500).json({ message: "Gagal menghapus pertanyaan" });
    }
});

module.exports = router;