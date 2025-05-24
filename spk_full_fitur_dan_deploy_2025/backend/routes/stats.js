const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        totalUsers: 10,
        totalQuestions: 5,
        totalResponses: 8
    });
});

module.exports = router;