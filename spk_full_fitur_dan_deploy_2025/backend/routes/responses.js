const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware');
const excelJS = require('exceljs');

router.get('/export', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Akses ditolak" });
    try {
        const [rows] = await db.query(`
            SELECT users.username, users.name, users.age, responses.answers, responses.createdAt
            FROM responses JOIN users ON responses.userId = users.id
        `);

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Respon');
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 20 },
            { header: 'Nama', key: 'name', width: 25 },
            { header: 'Usia', key: 'age', width: 10 },
            { header: 'Jawaban', key: 'answers', width: 50 },
            { header: 'Waktu', key: 'createdAt', width: 20 },
        ];

        rows.forEach(row => worksheet.addRow(row));
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data_respon.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.status(500).json({ message: "Gagal mengekspor", error: err.message });
    }
});

module.exports = router;