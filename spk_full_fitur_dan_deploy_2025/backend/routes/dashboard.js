const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware');

router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    try {
        const [[userCount]] = await db.query("SELECT COUNT(*) AS total_users FROM users");
        const [[responseCount]] = await db.query("SELECT COUNT(*) AS total_responses FROM responses");
        const [ages] = await db.query("SELECT age FROM users");

        const usiaStat = {};
        ages.forEach(u => {
            const bucket = u.age < 20 ? "<20" : u.age < 30 ? "20-29" : u.age < 40 ? "30-39" : "40+";
            usiaStat[bucket] = (usiaStat[bucket] || 0) + 1;
        });

        res.json({
            total_users: userCount.total_users,
            total_responses: responseCount.total_responses,
            usia_distribusi: usiaStat
        });
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data dashboard" });
    }
});

module.exports = router;