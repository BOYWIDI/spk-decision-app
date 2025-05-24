const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const auth = require('../middleware');

router.put('/change-password', auth, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
        if (!rows.length) return res.status(404).json({ message: "User tidak ditemukan" });
        const user = rows[0];
        const valid = await bcrypt.compare(oldPassword, user.password);
        if (!valid) return res.status(400).json({ message: "Password lama salah" });
        const hashed = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, req.user.id]);
        res.json({ message: "Password berhasil diubah" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/:id/reset-password', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    const { id } = req.params;
    try {
        const hashed = await bcrypt.hash("user123", 10);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, id]);
        res.json({ message: "Password user berhasil di-reset ke 'user123'" });
    } catch (err) {
        res.status(500).json({ message: "Gagal reset password" });
    }
});

module.exports = router;