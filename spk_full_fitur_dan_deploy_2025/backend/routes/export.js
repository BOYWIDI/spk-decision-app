const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');

// Dummy responses
const responses = [
    { id: 1, userId: 1, answers: ['Ya', 'Tidak'] },
    { id: 2, userId: 2, answers: ['Tidak', 'Ya'] }
];

router.get('/hasil', async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hasil Kuesioner');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'Jawaban', key: 'answers', width: 30 }
    ];

    responses.forEach(r => {
        worksheet.addRow({
            id: r.id,
            userId: r.userId,
            answers: r.answers.join(', ')
        });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=hasil_kuesioner.xlsx');

    await workbook.xlsx.write(res);
    res.end();
});

module.exports = router;